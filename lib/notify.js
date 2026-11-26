/**
 * Optional email alert when an enquiry arrives. Server only.
 *
 * Uses Resend's HTTP API directly (no SDK dependency). Does nothing unless
 * RESEND_API_KEY and NOTIFY_EMAIL are both set, and never throws: a failed
 * alert must not lose the enquiry, which is already safely in the database.
 */

import "server-only";

export async function notifyNewMessage(message) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = process.env.NOTIFY_FROM || "Website <onboarding@resend.dev>";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: message.email,
        subject: `New ${message.topic.toLowerCase()} enquiry from ${message.name}`,
        text: [
          `${message.name} <${message.email}>`,
          `Topic: ${message.topic}`,
          "",
          message.body,
          "",
          siteUrl ? `Open in dashboard: ${siteUrl}/admin/messages/${message.id}` : "",
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[notify] Resend responded", res.status, await res.text());
  } catch (error) {
    console.error("[notify] could not send alert", error);
  }
}
