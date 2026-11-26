// Newsletter subscribers. Export goes to CSV for whichever mailing tool is
// used to send the monthly note (Mailchimp, Buttondown, Resend all import it).

import Link from "next/link";
import { Download, Mail, SearchX, Trash2, UserCheck, UserMinus } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { SUBSCRIBER_FILTERS, listSubscribers } from "@/lib/admin/queries";
import { formatDay, formatDateTime } from "@/lib/admin/format";
import { deleteSubscriber, setSubscriberStatus } from "@/app/admin/actions";
import { AddSubscriberForm, SubmitButton } from "@/components/admin/controls";
import { Card, EmptyState, PageTitle, Pagination, SearchBox, StatusBadge, Tabs, buttonStyles } from "@/components/admin/ui";

export const metadata = { title: "Subscribers" };

function hrefWith(params) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v && v !== "active" && v !== 1 && sp.set(k, v));
  const qs = sp.toString();
  return `/admin/subscribers${qs ? `?${qs}` : ""}`;
}

function sourceLabel(source) {
  if (!source) return "—";
  if (source === "admin") return "Added by you";
  return source === "/" ? "Home page" : source;
}

export default async function SubscribersPage({ searchParams }) {
  await requireAdmin();
  const sp = await searchParams;
  const filter = sp.filter in SUBSCRIBER_FILTERS ? sp.filter : "active";
  const q = typeof sp.q === "string" ? sp.q.trim().slice(0, 100) : "";
  const page = Math.max(1, Number.parseInt(sp.page, 10) || 1);

  const { items, total, pages, tabCounts } = await listSubscribers({ filter, q, page });

  return (
    <div className="space-y-6">
      <PageTitle
        title="Subscribers"
        description="Everyone who joined the monthly newsletter. Export the list into your mailing tool to send an issue."
        actions={
          <a href={`/admin/subscribers/export?filter=${filter}`} className={buttonStyles.primary}>
            <Download aria-hidden="true" className="h-4 w-4" />
            Export CSV
          </a>
        }
      />

      <Card title="Add someone by hand" description="For people who asked to join in person or by email.">
        <AddSubscriberForm />
      </Card>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Tabs tabs={SUBSCRIBER_FILTERS} current={filter} counts={tabCounts} hrefFor={(key) => hrefWith({ filter: key, q })} />
        <SearchBox action="/admin/subscribers" q={q} placeholder="Search email" hidden={filter !== "active" ? { filter } : {}} />
      </div>

      <Card padded={false}>
        {items.length === 0 ? (
          q ? (
            <EmptyState icon={SearchX} title={`No email matches “${q}”`}>
              <Link href={hrefWith({ filter })} className="underline underline-offset-4">
                Clear the search
              </Link>
            </EmptyState>
          ) : (
            <EmptyState icon={Mail} title="No subscribers here yet">
              Sign-ups from the newsletter form on the Insights page will appear here.
            </EmptyState>
          )
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="border-b border-hairline text-xs text-slate">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium sm:px-6">Email</th>
                  <th scope="col" className="px-3 py-3 font-medium">Status</th>
                  <th scope="col" className="px-3 py-3 font-medium">Joined</th>
                  <th scope="col" className="px-3 py-3 font-medium">Signed up on</th>
                  <th scope="col" className="px-5 py-3 text-right font-medium sm:px-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {items.map((s) => (
                  <tr key={s.id} className="hover:bg-alabaster">
                    <td className="max-w-[18rem] truncate px-5 py-3 font-medium text-ink sm:px-6">{s.email}</td>
                    <td className="px-3 py-3"><StatusBadge status={s.status} /></td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate" title={formatDateTime(s.createdAt)}>
                      {formatDay(s.createdAt)}
                    </td>
                    <td className="max-w-[10rem] truncate px-3 py-3 text-slate">{sourceLabel(s.source)}</td>
                    <td className="px-5 py-2 sm:px-6">
                      <div className="flex justify-end gap-1">
                        <form action={setSubscriberStatus}>
                          <input type="hidden" name="id" value={s.id} />
                          <input type="hidden" name="status" value={s.status === "ACTIVE" ? "UNSUBSCRIBED" : "ACTIVE"} />
                          <SubmitButton variant="quiet" title={s.status === "ACTIVE" ? "Unsubscribe" : "Resubscribe"}>
                            {s.status === "ACTIVE" ? <UserMinus aria-hidden="true" className="h-4 w-4" /> : <UserCheck aria-hidden="true" className="h-4 w-4" />}
                            <span className="hidden md:inline">{s.status === "ACTIVE" ? "Unsubscribe" : "Resubscribe"}</span>
                            <span className="sr-only md:hidden">{s.status === "ACTIVE" ? `Unsubscribe ${s.email}` : `Resubscribe ${s.email}`}</span>
                          </SubmitButton>
                        </form>
                        <form action={deleteSubscriber}>
                          <input type="hidden" name="id" value={s.id} />
                          <SubmitButton
                            variant="quiet"
                            title="Delete permanently"
                            className="hover:bg-red-50 hover:text-red-700"
                            confirm={`Delete ${s.email} permanently? Use this when someone asks for their data to be erased.`}
                          >
                            <Trash2 aria-hidden="true" className="h-4 w-4" />
                            <span className="sr-only">Delete {s.email}</span>
                          </SubmitButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Pagination page={page} pages={pages} total={total} noun={total === 1 ? "subscriber" : "subscribers"} hrefFor={(p) => hrefWith({ filter, q, page: p })} />
    </div>
  );
}
