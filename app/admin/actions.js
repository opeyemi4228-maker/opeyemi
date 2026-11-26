"use server";

// Every dashboard mutation. Each action re-checks the session itself:
// server actions are public HTTP endpoints, and a check in a layout does not
// run when one is called directly.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db, isDatabaseConfigured } from "@/lib/db";
import { createSession, destroySession, requireAdmin } from "@/lib/auth/session";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/auth/password.mjs";
import { rateLimit, resetRateLimit } from "@/lib/ratelimit";
import { isEmail, normaliseEmail, text } from "@/lib/validate";

// A well-formed hash that matches no password. Checking against it means a
// sign-in for an unknown email costs the same scrypt work as one for a known
// email, so response time does not reveal which addresses have accounts.
const DUMMY_HASH =
  "scrypt$16384$8$1$eW91LWZvdW5kLWEtc2VjcmV0$U5tJ0V1H9lT0XqZb7m0e6m8z1K0kGx7m3Y1qQ5e9Z2m1rS2x0b9l3v2c1d0a8f7e6d5c4b3a2918273645546372";

// After a change: drop cached renders of the dashboard.
function changed(path = "/admin") {
  revalidatePath(path, "layout");
}

// Post/redirect/get. A plain form action that only revalidates leaves the
// page it was posted from showing stale data (in Next 16 the in-place
// re-render stalls), so every non-stateful action ends by navigating back
// to the dashboard page it came from, which renders it fresh. The Referer
// is only trusted for a same-site /admin path.
async function backToReferrer(fallback = "/admin") {
  changed();
  let path = fallback;
  try {
    const url = new URL((await headers()).get("referer") ?? "");
    if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {
      path = url.pathname + url.search;
    }
  } catch {
    /* no or malformed referer: use the fallback */
  }
  redirect(path);
}

function safeNext(value) {
  const v = String(value ?? "");
  return v.startsWith("/admin") && !v.startsWith("/admin/login") && !v.includes("//") ? v : "/admin";
}

// ───────────────────────────────────────────────────────────── sign in/out

export async function signIn(_prev, formData) {
  if (!isDatabaseConfigured()) {
    return { error: "The database is not configured yet. See the setup steps below." };
  }

  const email = normaliseEmail(text(formData, "email", 254));
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password.", email };

  const limit = await rateLimit("login", { limit: 5, windowSeconds: 15 * 60 });
  if (!limit.ok) {
    const minutes = Math.ceil(limit.retryAfter / 60);
    return { error: `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`, email };
  }

  const user = await db().adminUser.findUnique({ where: { email } });
  const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid) return { error: "That email and password do not match.", email };

  await resetRateLimit("login");
  await createSession(user.id);
  await db().adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  // Housekeeping: drop expired sessions while we are here.
  await db().adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });

  redirect(safeNext(formData.get("next")));
}

export async function signOut() {
  await destroySession();
  redirect("/admin/login");
}

// ───────────────────────────────────────────────────────────── messages

// The timestamp each status change records. A function, so "now" is the
// moment of the change rather than the moment this module loaded.
const STATUS_STAMPS = {
  NEW: () => ({ readAt: null }),
  READ: () => ({ readAt: new Date() }),
  REPLIED: () => ({ repliedAt: new Date() }),
  ARCHIVED: () => ({}),
};

export async function setMessageStatus(formData) {
  await requireAdmin();
  const id = text(formData, "id", 40);
  const status = text(formData, "status", 20);
  if (!id || !(status in STATUS_STAMPS)) return;

  await db().message.update({
    where: { id },
    data: { status, ...STATUS_STAMPS[status]() },
  });
  // The message page marks whatever it shows as read, so leave it.
  if (status === "NEW") {
    changed();
    redirect("/admin/messages");
  }
  await backToReferrer(`/admin/messages/${id}`);
}

export async function markAllRead() {
  await requireAdmin();
  await db().message.updateMany({ where: { status: "NEW" }, data: { status: "READ", readAt: new Date() } });
  await backToReferrer("/admin/messages");
}

export async function deleteMessage(formData) {
  await requireAdmin();
  const id = text(formData, "id", 40);
  if (id) await db().message.deleteMany({ where: { id } });
  changed();
  redirect("/admin/messages?deleted=1");
}

// ───────────────────────────────────────────────────────────── subscribers

export async function addSubscriber(_prev, formData) {
  await requireAdmin();
  const email = normaliseEmail(text(formData, "email", 254));
  if (!isEmail(email)) return { status: "error", message: "That email address does not look right." };

  const existing = await db().subscriber.findUnique({ where: { email } });
  if (existing?.status === "ACTIVE") return { status: "error", message: `${email} is already subscribed.` };

  await db().subscriber.upsert({
    where: { email },
    create: { email, source: "admin" },
    update: { status: "ACTIVE", unsubscribedAt: null },
  });
  changed();
  return { status: "success", message: `${email} added.` };
}

export async function setSubscriberStatus(formData) {
  await requireAdmin();
  const id = text(formData, "id", 40);
  const status = text(formData, "status", 20);
  if (!id || !["ACTIVE", "UNSUBSCRIBED"].includes(status)) return;

  await db().subscriber.update({
    where: { id },
    data: { status, unsubscribedAt: status === "UNSUBSCRIBED" ? new Date() : null },
  });
  await backToReferrer("/admin/subscribers");
}

export async function deleteSubscriber(formData) {
  await requireAdmin();
  const id = text(formData, "id", 40);
  if (id) await db().subscriber.deleteMany({ where: { id } });
  await backToReferrer("/admin/subscribers");
}

// ───────────────────────────────────────────────────────────── account

export async function updateProfile(_prev, formData) {
  const admin = await requireAdmin();
  const name = text(formData, "name", 120);
  if (name.length < 2) return { status: "error", message: "Enter your name." };
  await db().adminUser.update({ where: { id: admin.id }, data: { name } });
  changed();
  return { status: "success", message: "Saved." };
}

export async function changePassword(_prev, formData) {
  const admin = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  const limit = await rateLimit("password", { limit: 5, windowSeconds: 15 * 60 });
  if (!limit.ok) return { status: "error", message: "Too many attempts. Try again in a few minutes." };

  const user = await db().adminUser.findUnique({ where: { id: admin.id } });
  if (!(await verifyPassword(current, user.passwordHash))) {
    return { status: "error", message: "Your current password is not right." };
  }
  const problem = passwordProblem(next);
  if (problem) return { status: "error", message: problem };
  if (next !== confirm) return { status: "error", message: "The two new passwords do not match." };
  if (next === current) return { status: "error", message: "Choose a password different from the current one." };

  await db().adminUser.update({ where: { id: admin.id }, data: { passwordHash: await hashPassword(next) } });
  // A new password should lock out anyone holding an old session.
  await db().adminSession.deleteMany({ where: { userId: admin.id, id: { not: admin.sessionId } } });
  changed("/admin/account");
  return { status: "success", message: "Password changed. Every other device has been signed out." };
}

export async function revokeSession(formData) {
  const admin = await requireAdmin();
  const id = text(formData, "id", 40);
  if (!id || id === admin.sessionId) return;
  await db().adminSession.deleteMany({ where: { id, userId: admin.id } });
  await backToReferrer("/admin/account");
}

export async function revokeOtherSessions() {
  const admin = await requireAdmin();
  await db().adminSession.deleteMany({ where: { userId: admin.id, id: { not: admin.sessionId } } });
  await backToReferrer("/admin/account");
}
