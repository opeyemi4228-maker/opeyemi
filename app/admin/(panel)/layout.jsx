// The signed-in dashboard frame. requireAdmin() here keeps the frame itself
// from rendering for strangers; each page and action still checks again.
//
// Deliberately no loading.jsx in this segment. A route-level Suspense
// boundary here traps the re-render that follows a form action (Next 16):
// the action completes, but the submit button stays "pending" and the page
// never updates. Dashboard pages render in well under 100ms, so a skeleton
// buys nothing anyway.

import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth/session";
import { db, isDatabaseConfigured } from "@/lib/db";

export default async function PanelLayout({ children }) {
  if (!isDatabaseConfigured()) redirect("/admin/login");
  const admin = await requireAdmin();
  const unread = await db().message.count({ where: { status: "NEW" } });

  return (
    <AdminShell admin={{ name: admin.name, email: admin.email }} unread={unread}>
      {children}
    </AdminShell>
  );
}
