/**
 * Fixed-window rate limiting, stored in Postgres so it holds across
 * serverless instances. Server only.
 *
 * Client addresses are never stored as-is: the key is an HMAC of the address,
 * so the ledger cannot be read back into a list of visitor IPs.
 */

import "server-only";
import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export async function clientFingerprint() {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  const secret = process.env.IP_HASH_SECRET || process.env.DATABASE_URL || "oto";
  return createHmac("sha256", secret).update(ip).digest("hex").slice(0, 32);
}

/**
 * Counts one hit against `name` for this client. Returns { ok, retryAfter }.
 * `limit` hits are allowed per `windowSeconds`.
 */
export async function rateLimit(name, { limit, windowSeconds }) {
  const key = `${name}:${await clientFingerprint()}`;
  const now = new Date();
  const windowStartCutoff = new Date(now.getTime() - windowSeconds * 1000);

  // One round trip: start a fresh window if the old one has lapsed,
  // otherwise increment. Atomic, so concurrent requests cannot both slip in.
  const [row] = await db().$queryRaw`
    INSERT INTO "RateLimit" ("key", "count", "windowStart")
    VALUES (${key}, 1, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "RateLimit"."windowStart" < ${windowStartCutoff} THEN 1 ELSE "RateLimit"."count" + 1 END,
      "windowStart" = CASE WHEN "RateLimit"."windowStart" < ${windowStartCutoff} THEN ${now} ELSE "RateLimit"."windowStart" END
    RETURNING "count", "windowStart"
  `;

  if (row.count <= limit) return { ok: true, retryAfter: 0 };
  const resetsAt = new Date(row.windowStart).getTime() + windowSeconds * 1000;
  return { ok: false, retryAfter: Math.max(1, Math.ceil((resetsAt - now.getTime()) / 1000)) };
}

/** Clears a client's counter, e.g. after a successful sign-in. */
export async function resetRateLimit(name) {
  const key = `${name}:${await clientFingerprint()}`;
  await db().rateLimit.deleteMany({ where: { key } });
}
