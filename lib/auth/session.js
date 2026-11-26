/**
 * Admin sessions. Server only.
 *
 * The cookie carries 32 random bytes; the database stores their SHA-256. The
 * cookie is httpOnly, SameSite=Lax, Secure in production, and scoped to
 * /admin so it is never sent with a request for a public page.
 *
 * Every admin page AND every admin server action calls requireAdmin() itself.
 * A check in a layout alone is not enough: server actions and route handlers
 * can be invoked directly, without the layout ever rendering.
 */

import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, randomBytes } from "node:crypto";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "oto_admin";
const SESSION_DAYS = 14;
const TOUCH_EVERY_MS = 60 * 60 * 1000; // refresh lastSeenAt at most hourly

export function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  const userAgent = ((await headers()).get("user-agent") ?? "").slice(0, 300) || null;

  await db().adminSession.create({
    data: { tokenHash: hashToken(token), userId, userAgent, expiresAt },
  });

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    expires: expiresAt,
  });
}

/** The signed-in admin and their session, or null. Memoised per request. */
export const getAdmin = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await db().adminSession.findUnique({
    where: { tokenHash },
    include: { user: { select: { id: true, email: true, name: true, lastLoginAt: true } } },
  });
  if (!session) return null;

  if (session.expiresAt <= new Date()) {
    await db().adminSession.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  if (Date.now() - session.lastSeenAt.getTime() > TOUCH_EVERY_MS) {
    await db()
      .adminSession.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } })
      .catch(() => {});
  }

  return { ...session.user, sessionId: session.id };
});

/** For pages and actions: the admin, or a redirect to the sign-in page. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    await db().adminSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  jar.set(SESSION_COOKIE, "", { path: "/admin", expires: new Date(0) });
}
