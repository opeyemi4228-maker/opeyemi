// Account & security: name, password, and every browser currently signed in.

import { LogOut, Monitor } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { listSessions } from "@/lib/admin/queries";
import { describeDevice, formatDateTime, timeAgo } from "@/lib/admin/format";
import { revokeOtherSessions, revokeSession, signOut } from "@/app/admin/actions";
import { PasswordForm, ProfileForm, SubmitButton } from "@/components/admin/controls";
import { Card, PageTitle } from "@/components/admin/ui";

export const metadata = { title: "Account & security" };

export default async function AccountPage() {
  const admin = await requireAdmin();
  const sessions = await listSessions(admin.id);
  const others = sessions.filter((s) => s.id !== admin.sessionId);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Account & security"
        description={`Signed in as ${admin.email}${admin.lastLoginAt ? ` · last sign-in ${formatDateTime(admin.lastLoginAt)}` : ""}`}
        actions={
          <form action={signOut}>
            <SubmitButton>
              <LogOut aria-hidden="true" className="h-4 w-4" />
              Sign out
            </SubmitButton>
          </form>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Profile" description="The name shown in the dashboard.">
          <ProfileForm name={admin.name} />
        </Card>

        <Card title="Password" description="Changing it signs out every other device.">
          <PasswordForm />
        </Card>
      </div>

      <Card
        title="Where you are signed in"
        description="Sessions last 14 days. Sign out anything you do not recognise."
        padded={false}
        action={
          others.length > 0 && (
            <form action={revokeOtherSessions}>
              <SubmitButton variant="quiet" confirm="Sign out every other device?">
                Sign out all others
              </SubmitButton>
            </form>
          )
        }
      >
        <ul className="divide-y divide-hairline">
          {sessions.map((s) => {
            const current = s.id === admin.sessionId;
            return (
              <li key={s.id} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-alabaster">
                  <Monitor aria-hidden="true" className="h-4 w-4 text-slate" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
                    {describeDevice(s.userAgent)}
                    {current && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">This device</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-slate">
                    Signed in {formatDateTime(s.createdAt)} · active {timeAgo(s.lastSeenAt)}
                  </p>
                </div>
                {!current && (
                  <form action={revokeSession}>
                    <input type="hidden" name="id" value={s.id} />
                    <SubmitButton variant="quiet">Sign out</SubmitButton>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
