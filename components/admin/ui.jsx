// Dashboard building blocks. Server-safe (no hooks), so pages can compose
// them freely. Same visual language as the public site — paper, hairline,
// ink, one gold accent — tuned for density and scanning rather than drama.

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageTitle({ title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, description, action, className, children, padded = true }) {
  return (
    <section className={cn("rounded-2xl border border-hairline bg-paper", className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-6">
          <div>
            {title && <h2 className="text-sm font-semibold text-ink">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-slate">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={padded ? "p-5 sm:p-6" : undefined}>{children}</div>
    </section>
  );
}

export function StatTile({ label, value, hint, delta, href, accent = false }) {
  const body = (
    <>
      <p className="text-xs font-medium text-slate">{label}</p>
      <p className={cn("numeric mt-3 font-display text-4xl font-semibold leading-none", accent ? "text-gold-ink" : "text-ink")}>
        {value.toLocaleString("en-GB")}
      </p>
      <div className="mt-3 flex min-h-5 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate">
        {typeof delta === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
              delta >= 0 ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            )}
          >
            {delta >= 0 ? <ArrowUpRight aria-hidden="true" className="h-3 w-3" /> : <ArrowDownRight aria-hidden="true" className="h-3 w-3" />}
            {delta >= 0 ? "+" : ""}
            {delta}%
          </span>
        )}
        {hint && <span>{hint}</span>}
      </div>
    </>
  );

  const cls = "block rounded-2xl border border-hairline bg-paper p-5 sm:p-6";
  return href ? (
    <Link href={href} className={cn(cls, "transition-colors hover:border-ink/30")}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

const STATUS_STYLES = {
  NEW: "bg-gold/15 text-gold-ink ring-gold-ink/25",
  READ: "bg-alabaster text-graphite ring-hairline",
  REPLIED: "bg-emerald-50 text-emerald-800 ring-emerald-700/20",
  ARCHIVED: "bg-mist text-slate ring-hairline",
  ACTIVE: "bg-emerald-50 text-emerald-800 ring-emerald-700/20",
  UNSUBSCRIBED: "bg-mist text-slate ring-hairline",
};

const STATUS_LABELS = {
  NEW: "Unread",
  READ: "Read",
  REPLIED: "Replied",
  ARCHIVED: "Archived",
  ACTIVE: "Active",
  UNSUBSCRIBED: "Unsubscribed",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
        STATUS_STYLES[status]
      )}
    >
      {status === "NEW" && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-ink" />}
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

/** Filter tabs as links, so a filtered view is shareable and survives reload. */
export function Tabs({ tabs, current, counts, hrefFor }) {
  return (
    <nav aria-label="Filter" className="-mx-1 overflow-x-auto">
      <ul className="flex min-w-max gap-1 px-1">
        {Object.entries(tabs).map(([key, tab]) => {
          const active = key === current;
          return (
            <li key={key}>
              <Link
                href={hrefFor(key)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
                  active ? "bg-ink text-paper" : "text-slate hover:bg-mist hover:text-ink"
                )}
              >
                {tab.label}
                {counts && (
                  <span className={cn("numeric text-xs", active ? "text-paper/70" : "text-slate/80")}>
                    {counts[key] ?? 0}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** A plain GET form: works without JavaScript and keeps the query in the URL. */
export function SearchBox({ action, q, placeholder, hidden = {} }) {
  return (
    <form action={action} role="search" className="relative w-full sm:max-w-xs">
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <label htmlFor="admin-search" className="sr-only">
        Search
      </label>
      <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
      <input
        id="admin-search"
        type="search"
        name="q"
        defaultValue={q}
        placeholder={placeholder}
        className="h-10 w-full rounded-full border border-hairline bg-paper pl-10 pr-4 text-sm text-ink placeholder:text-slate/70 focus:border-ink focus:outline-none"
      />
    </form>
  );
}

export function Pagination({ page, pages, total, hrefFor, noun = "items" }) {
  if (total === 0) return null;
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-slate">
      <p>
        <span className="numeric">{total.toLocaleString("en-GB")}</span> {noun}
        {pages > 1 && (
          <>
            {" "}
            · page <span className="numeric">{page}</span> of <span className="numeric">{pages}</span>
          </>
        )}
      </p>
      {pages > 1 && (
        <div className="flex gap-2">
          <PageLink href={page > 1 ? hrefFor(page - 1) : null} label="Previous page">
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </PageLink>
          <PageLink href={page < pages ? hrefFor(page + 1) : null} label="Next page">
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </PageLink>
        </div>
      )}
    </div>
  );
}

function PageLink({ href, label, children }) {
  const cls = "grid h-9 w-9 place-items-center rounded-full border border-hairline";
  return href ? (
    <Link href={href} aria-label={label} className={cn(cls, "text-ink hover:border-ink")}>
      {children}
    </Link>
  ) : (
    <span aria-hidden="true" className={cn(cls, "text-slate/40")}>
      {children}
    </span>
  );
}

export function EmptyState({ icon: Icon, title, children }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      {Icon && (
        <span className="grid h-12 w-12 place-items-center rounded-full bg-alabaster">
          <Icon aria-hidden="true" className="h-5 w-5 text-slate" />
        </span>
      )}
      <p className="mt-4 font-medium text-ink">{title}</p>
      {children && <div className="mt-1.5 max-w-sm text-sm leading-relaxed text-slate">{children}</div>}
    </div>
  );
}

export const buttonStyles = {
  primary:
    "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-graphite disabled:opacity-60",
  secondary:
    "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-hairline bg-paper px-5 text-sm font-medium text-ink transition-colors hover:border-ink/40 disabled:opacity-60",
  danger:
    "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-red-200 bg-paper px-5 text-sm font-medium text-red-700 transition-colors hover:border-red-700 hover:bg-red-700 hover:text-paper disabled:opacity-60",
  quiet:
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium text-slate transition-colors hover:bg-mist hover:text-ink disabled:opacity-60",
};

export const inputStyles =
  "h-11 w-full rounded-xl border border-hairline bg-paper px-4 text-[15px] text-ink placeholder:text-slate/70 focus:border-ink focus:outline-none";

export const labelStyles = "mb-1.5 block text-sm font-medium text-graphite";
