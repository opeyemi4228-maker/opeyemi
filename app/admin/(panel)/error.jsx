"use client";

// Shown if a dashboard page fails, most often because the database is
// unreachable. Says what to check rather than showing a stack trace.

import { RotateCcw } from "lucide-react";

export default function AdminError({ error, reset }) {
  return (
    <div role="alert" className="mx-auto max-w-lg rounded-2xl border border-hairline bg-paper p-8 text-center">
      <h1 className="font-display text-2xl font-semibold text-ink">Something went wrong</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate">
        The dashboard could not load this page. This usually means the database is unreachable for a moment.
        Try again, and if it keeps happening, check the DATABASE_URL setting with your host.
      </p>
      {error?.digest && <p className="mt-3 font-mono text-xs text-slate">Reference: {error.digest}</p>}
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper hover:bg-graphite"
      >
        <RotateCcw aria-hidden="true" className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
