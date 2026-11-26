// Overview: what needs attention first (unread enquiries), then how the
// site is doing (30-day activity), then where enquiries come from.

import Link from "next/link";
import { ArrowRight, Download, Inbox } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { getOverview } from "@/lib/admin/queries";
import { change, timeAgo } from "@/lib/admin/format";
import BarChart from "@/components/admin/BarChart";
import { Card, EmptyState, PageTitle, StatTile, StatusBadge, buttonStyles } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Overview" };

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Africa/Lagos" }).format(new Date())
  );
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

export default async function OverviewPage() {
  const admin = await requireAdmin();
  const o = await getOverview();
  const firstName = admin.name.split(" ")[0];
  const topicMax = Math.max(1, ...o.topics.map((t) => t.count));

  return (
    <div className="space-y-8">
      <PageTitle
        title={`${greeting()}, ${firstName}`}
        description={
          o.newMessages > 0
            ? `You have ${o.newMessages} unread ${o.newMessages === 1 ? "enquiry" : "enquiries"} waiting.`
            : "You are all caught up. Nothing unread."
        }
        actions={
          <>
            <a href="/admin/subscribers/export" className={buttonStyles.secondary}>
              <Download aria-hidden="true" className="h-4 w-4" />
              Export subscribers
            </a>
            <Link href="/admin/messages?filter=new" className={buttonStyles.primary}>
              <Inbox aria-hidden="true" className="h-4 w-4" />
              Open inbox
            </Link>
          </>
        }
      />

      {/* Headline numbers */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Unread enquiries" value={o.newMessages} hint={`${o.openMessages} open in total`} href="/admin/messages?filter=new" accent={o.newMessages > 0} />
        <StatTile
          label="Enquiries, last 30 days"
          value={o.messages30}
          delta={change(o.messages30, o.messagesPrev30)}
          hint="vs previous 30 days"
          href="/admin/messages?filter=all"
        />
        <StatTile label="Newsletter subscribers" value={o.activeSubscribers} hint="currently active" href="/admin/subscribers" />
        <StatTile
          label="New subscribers, 30 days"
          value={o.subscribers30}
          delta={change(o.subscribers30, o.subscribersPrev30)}
          hint="vs previous 30 days"
          href="/admin/subscribers"
        />
      </div>

      {/* Activity — two charts, one measure each, on the same 30 days */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Enquiries per day" description="Last 30 days">
          <BarChart data={o.messageSeries} label="Enquiries per day" unit="enquiry" color="var(--color-ink)" />
        </Card>
        <Card title="New subscribers per day" description="Last 30 days">
          <BarChart data={o.subscriberSeries} label="New subscribers per day" unit="subscriber" color="var(--color-gold-ink)" />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Recent enquiries */}
        <Card
          title="Latest enquiries"
          padded={false}
          action={
            <Link href="/admin/messages" className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-gold-ink">
              View all <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          }
        >
          {o.recent.length === 0 ? (
            <EmptyState icon={Inbox} title="No enquiries yet">
              When someone uses the contact form, their message appears here.
            </EmptyState>
          ) : (
            <ul className="divide-y divide-hairline">
              {o.recent.map((m) => (
                <li key={m.id}>
                  <Link href={`/admin/messages/${m.id}`} className="flex gap-4 px-5 py-4 transition-colors hover:bg-alabaster sm:px-6">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={cn("truncate text-sm", m.status === "NEW" ? "font-semibold text-ink" : "font-medium text-graphite")}>
                          {m.name}
                        </p>
                        <span className="shrink-0 text-xs text-slate">· {m.topic}</span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-sm text-slate">{m.body}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <time dateTime={m.createdAt.toISOString()} className="text-xs text-slate">
                        {timeAgo(m.createdAt)}
                      </time>
                      <StatusBadge status={m.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Topics */}
        <Card title="What people write about" description={`${o.totalMessages} enquiries, all time`}>
          {o.topics.length === 0 ? (
            <p className="text-sm text-slate">Topics appear once enquiries arrive.</p>
          ) : (
            <ul className="space-y-4">
              {o.topics.map((t) => (
                <li key={t.topic}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-graphite">{t.topic}</span>
                    <span className="numeric font-medium text-ink">{t.count}</span>
                  </div>
                  <div aria-hidden="true" className="mt-1.5 h-2 rounded-full bg-mist">
                    <div className="h-2 rounded-full bg-ink" style={{ width: `${(t.count / topicMax) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
