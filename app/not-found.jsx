// 404 — keeps the brand voice even on error pages.

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-paper px-6 pt-32 pb-24 text-center">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-8 bg-gold-ink" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">
          404
        </p>
        <span aria-hidden="true" className="h-px w-8 bg-gold-ink" />
      </div>
      <h1 className="font-display text-4xl text-ink md:text-6xl">
        Page not found
      </h1>
      <p className="max-w-md text-[15px] leading-relaxed text-slate">
        The page you asked for is not here. It may have been renamed, or the
        link that brought you may be out of date.
      </p>
      <Link
        href="/"
        className="group mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold-ink"
      >
        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
        />
        Return home
      </Link>
    </section>
  );
}
