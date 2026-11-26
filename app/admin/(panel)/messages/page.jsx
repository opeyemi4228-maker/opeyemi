// Inbox. Filter tabs and search live in the URL, so any view can be
// bookmarked and the back button behaves.

import Link from "next/link";
import { CheckCheck, Inbox, SearchX } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { MESSAGE_FILTERS, listMessages } from "@/lib/admin/queries";
import { formatDateTime, timeAgo } from "@/lib/admin/format";
import { markAllRead } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/controls";
import { Card, EmptyState, PageTitle, Pagination, SearchBox, StatusBadge, Tabs } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Messages" };

function hrefWith(params) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v && v !== "inbox" && v !== 1 && sp.set(k, v));
  const qs = sp.toString();
  return `/admin/messages${qs ? `?${qs}` : ""}`;
}

export default async function MessagesPage({ searchParams }) {
  await requireAdmin();
  const sp = await searchParams;
  const filter = sp.filter in MESSAGE_FILTERS ? sp.filter : "inbox";
  const q = typeof sp.q === "string" ? sp.q.trim().slice(0, 100) : "";
  const page = Math.max(1, Number.parseInt(sp.page, 10) || 1);

  const { items, total, pages, tabCounts } = await listMessages({ filter, q, page });

  return (
    <div className="space-y-6">
      <PageTitle
        title="Messages"
        description="Enquiries from the contact form. Open one to read it in full and reply."
        actions={
          tabCounts.new > 0 && (
            <form action={markAllRead}>
              <SubmitButton pendingLabel="Marking">
                <CheckCheck aria-hidden="true" className="h-4 w-4" />
                Mark all as read
              </SubmitButton>
            </form>
          )
        }
      />

      {sp.deleted && (
        <p role="status" className="rounded-xl border border-hairline bg-paper px-4 py-3 text-sm text-graphite">
          The message was deleted.
        </p>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Tabs tabs={MESSAGE_FILTERS} current={filter} counts={tabCounts} hrefFor={(key) => hrefWith({ filter: key, q })} />
        <SearchBox action="/admin/messages" q={q} placeholder="Search name, email or text" hidden={filter !== "inbox" ? { filter } : {}} />
      </div>

      <Card padded={false}>
        {items.length === 0 ? (
          q ? (
            <EmptyState icon={SearchX} title={`Nothing matches “${q}”`}>
              Try a different word, or <Link href={hrefWith({ filter })} className="underline underline-offset-4">clear the search</Link>.
            </EmptyState>
          ) : (
            <EmptyState icon={Inbox} title={filter === "new" ? "No unread messages" : "Nothing here yet"}>
              {filter === "inbox" || filter === "new"
                ? "New enquiries from the contact form will appear here."
                : "Messages you move here will be listed."}
            </EmptyState>
          )
        ) : (
          <ul className="divide-y divide-hairline">
            {items.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/admin/messages/${m.id}`}
                  className="grid gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-alabaster sm:grid-cols-[minmax(0,14rem)_1fr_auto] sm:items-center sm:px-6"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    {m.status === "NEW" && <span aria-label="Unread" className="h-2 w-2 shrink-0 rounded-full bg-gold-ink" />}
                    <div className="min-w-0">
                      <p className={cn("truncate text-sm", m.status === "NEW" ? "font-semibold text-ink" : "font-medium text-graphite")}>
                        {m.name}
                      </p>
                      <p className="truncate text-xs text-slate">{m.email}</p>
                    </div>
                  </div>
                  <p className="min-w-0 truncate text-sm text-slate">
                    <span className="font-medium text-graphite">{m.topic}</span> — {m.body}
                  </p>
                  <div className="flex items-center gap-3 sm:justify-end">
                    <StatusBadge status={m.status} />
                    <time dateTime={m.createdAt.toISOString()} title={formatDateTime(m.createdAt)} className="whitespace-nowrap text-xs text-slate">
                      {timeAgo(m.createdAt)}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Pagination page={page} pages={pages} total={total} noun={total === 1 ? "message" : "messages"} hrefFor={(p) => hrefWith({ filter, q, page: p })} />
    </div>
  );
}
