// CSV export of subscribers. A route handler, so it checks the session
// itself — layouts do not run for route handlers.

import { getAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { SUBSCRIBER_FILTERS } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

// Quote every field, double any quote inside it, and neutralise values a
// spreadsheet would execute as a formula (CSV injection).
function cell(value) {
  let v = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return `"${v.replace(/"/g, '""')}"`;
}

export async function GET(request) {
  const admin = await getAdmin();
  if (!admin) return new Response("Not signed in", { status: 401 });

  const filter = new URL(request.url).searchParams.get("filter");
  const where = (SUBSCRIBER_FILTERS[filter] ?? SUBSCRIBER_FILTERS.active).where;

  const rows = await db().subscriber.findMany({ where, orderBy: { createdAt: "asc" } });
  const lines = [
    ["email", "status", "joined", "source"].map(cell).join(","),
    ...rows.map((s) =>
      [s.email, s.status.toLowerCase(), s.createdAt.toISOString(), s.source ?? ""].map(cell).join(",")
    ),
  ];

  const date = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${filter && filter in SUBSCRIBER_FILTERS ? filter : "active"}-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
