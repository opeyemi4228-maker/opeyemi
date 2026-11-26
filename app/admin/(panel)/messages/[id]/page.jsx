// One enquiry, in full. Opening it marks it read. Replying happens in the
// owner's own email app (so the thread lives with the rest of his mail);
// "Mark as replied" then records that it has been answered. "Mark as
// unread" returns to the inbox, since staying here would re-read it.

import Link from "next/link";
import { notFound } from "next/navigation";
import { Archive, ArchiveRestore, ArrowLeft, CheckCircle2, Mail, Reply, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { getMessage } from "@/lib/admin/queries";
import { formatDateTime } from "@/lib/admin/format";
import { deleteMessage, setMessageStatus } from "@/app/admin/actions";
import { CopyText, SubmitButton } from "@/components/admin/controls";
import { Card, StatusBadge, buttonStyles } from "@/components/admin/ui";

export const metadata = { title: "Message" };

function StatusForm({ id, status, children, variant = "secondary" }) {
  return (
    <form action={setMessageStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <SubmitButton variant={variant}>{children}</SubmitButton>
    </form>
  );
}

export default async function MessagePage({ params }) {
  await requireAdmin();
  const { id } = await params;
  let message = await getMessage(id);
  if (!message) notFound();

  // Opening an unread message marks it read.
  if (message.status === "NEW") {
    message = await db().message.update({ where: { id }, data: { status: "READ", readAt: new Date() } });
  }

  const subject = encodeURIComponent(`Re: your ${message.topic.toLowerCase()} enquiry`);
  const quoted = message.body.split("\n").map((l) => `> ${l}`).join("\n");
  const body = encodeURIComponent(`Hello ${message.name.split(" ")[0]},\n\n\n\n—\nOpeyemi\n\nOn ${formatDateTime(message.createdAt)}, you wrote:\n${quoted}`);
  const mailto = `mailto:${message.email}?subject=${subject}&body=${body}`;

  return (
    <div className="space-y-6">
      <Link href="/admin/messages" className="inline-flex items-center gap-2 text-sm text-slate hover:text-ink">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        All messages
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <Card padded={false}>
          <header className="border-b border-hairline px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-alabaster px-2.5 py-0.5 text-xs font-medium text-graphite">{message.topic}</span>
              <StatusBadge status={message.status} />
            </div>
            <h1 className="mt-4 font-display text-2xl font-semibold text-ink">{message.name}</h1>
            <p className="mt-1 text-sm text-slate">
              <a href={`mailto:${message.email}`} className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink">
                {message.email}
              </a>
              <span className="mx-2">·</span>
              <time dateTime={message.createdAt.toISOString()}>{formatDateTime(message.createdAt)}</time>
            </p>
          </header>
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-graphite">{message.body}</p>
          </div>
        </Card>

        <aside className="space-y-4">
          <Card title="Respond">
            <div className="flex flex-col gap-2 [&_button]:w-full">
              <a href={mailto} className={`${buttonStyles.primary} w-full`}>
                <Reply aria-hidden="true" className="h-4 w-4" />
                Reply by email
              </a>
              {message.status !== "REPLIED" && (
                <StatusForm id={message.id} status="REPLIED">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                  Mark as replied
                </StatusForm>
              )}
              <CopyText text={message.email} label="Copy email address" />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate">
              Reply opens your email app with the message quoted. Afterwards, mark it as replied to keep the inbox tidy.
            </p>
          </Card>

          <Card title="Organise">
            <div className="flex flex-col gap-2 [&_button]:w-full">
              {message.status !== "NEW" && message.status !== "ARCHIVED" && (
                <StatusForm id={message.id} status="NEW">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Mark as unread
                </StatusForm>
              )}
              {message.status === "ARCHIVED" ? (
                <StatusForm id={message.id} status="READ">
                  <ArchiveRestore aria-hidden="true" className="h-4 w-4" />
                  Move back to inbox
                </StatusForm>
              ) : (
                <StatusForm id={message.id} status="ARCHIVED">
                  <Archive aria-hidden="true" className="h-4 w-4" />
                  Archive
                </StatusForm>
              )}
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={message.id} />
                <SubmitButton variant="danger" confirm="Delete this message permanently? This cannot be undone.">
                  <Trash2 aria-hidden="true" className="h-4 w-4" />
                  Delete
                </SubmitButton>
              </form>
            </div>
          </Card>

          <Card title="Details">
            <dl className="space-y-3 text-sm">
              <Detail label="Received">{formatDateTime(message.createdAt)}</Detail>
              {message.readAt && <Detail label="First opened">{formatDateTime(message.readAt)}</Detail>}
              {message.repliedAt && <Detail label="Replied">{formatDateTime(message.repliedAt)}</Detail>}
              <Detail label="Sent from">{message.source ?? "Unknown page"}</Detail>
            </dl>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate">{label}</dt>
      <dd className="text-right text-graphite">{children}</dd>
    </div>
  );
}
