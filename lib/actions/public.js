"use server";

// Server actions behind the two public forms: the contact enquiry and the
// newsletter sign-up. Both are protected by a honeypot field (bots fill it,
// people never see it) and a per-client rate limit.
//
// They return a plain { status, message } object for useActionState. When no
// database is configured they say so with status "unavailable", and the form
// falls back to the visitor's own email app, so the site still works.

import { after } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db";
import { rateLimit } from "@/lib/ratelimit";
import { notifyNewMessage } from "@/lib/notify";
import { TOPICS, isEmail, normaliseEmail, safePath, text } from "@/lib/validate";

const UNAVAILABLE = {
  status: "unavailable",
  message: "The form is offline right now. Your email app will open instead.",
};

function isBot(formData) {
  return text(formData, "company", 200).length > 0;
}

export async function submitEnquiry(_prev, formData) {
  const values = {
    name: text(formData, "name", 120),
    email: normaliseEmail(text(formData, "email", 254)),
    topic: text(formData, "topic", 40),
    body: text(formData, "message", 5000),
  };

  const errors = {};
  if (values.name.length < 2) errors.name = "Please tell me your name.";
  if (!isEmail(values.email)) errors.email = "That email address does not look right.";
  if (!TOPICS.includes(values.topic)) values.topic = "Other";
  if (values.body.length < 10) errors.message = "A sentence or two is enough, but say a little more.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  // Pretend success to bots, so they do not learn to adapt.
  if (isBot(formData)) return { status: "success", message: "Thank you. Your message is in." };

  if (!isDatabaseConfigured()) return { ...UNAVAILABLE, values };

  try {
    const limit = await rateLimit("enquiry", { limit: 5, windowSeconds: 3600 });
    if (!limit.ok) {
      return {
        status: "error",
        message: "You have sent several messages already. Please try again in an hour, or email directly.",
        values,
      };
    }

    const message = await db().message.create({
      data: { ...values, source: safePath(formData.get("source")) },
    });
    after(() => notifyNewMessage(message));

    return {
      status: "success",
      message: `Thank you, ${values.name.split(" ")[0]}. Your message is in, and you will hear back at ${values.email}.`,
    };
  } catch (error) {
    console.error("[enquiry] could not save", error);
    return { ...UNAVAILABLE, values };
  }
}

export async function subscribe(_prev, formData) {
  const email = normaliseEmail(text(formData, "email", 254));
  if (!isEmail(email)) {
    return { status: "error", message: "That email address does not look right.", values: { email } };
  }
  if (isBot(formData)) return { status: "success", message: "You are on the list." };
  if (!isDatabaseConfigured()) return { ...UNAVAILABLE, values: { email } };

  try {
    const limit = await rateLimit("subscribe", { limit: 10, windowSeconds: 3600 });
    if (!limit.ok) {
      return { status: "error", message: "Too many attempts. Please try again later.", values: { email } };
    }

    // Re-subscribing someone who left is allowed and reactivates them.
    await db().subscriber.upsert({
      where: { email },
      create: { email, source: safePath(formData.get("source")) },
      update: { status: "ACTIVE", unsubscribedAt: null },
    });

    return { status: "success", message: "You are on the list. The next Words on Marble arrives within the week." };
  } catch (error) {
    console.error("[subscribe] could not save", error);
    return { ...UNAVAILABLE, values: { email } };
  }
}
