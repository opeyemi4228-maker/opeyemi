// Latest insights — three-card editorial grid pulling the newest
// essays from data/insights.js, linking to /insights.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { insights } from "@/data/insights";
import { formatDate } from "@/lib/utils";

export default function InsightsPreview() {
  const latest = [...insights]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="border-t border-hairline bg-alabaster py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Insights"
            title="Latest Thinking"
            className="mb-0"
          />
          <Link
            href="/insights"
            className="group mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:text-gold-ink"
          >
            All insights
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group flex flex-col overflow-hidden border border-hairline bg-paper transition-shadow duration-300 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.28)]"
            >
              <div className="relative aspect-3/2 overflow-hidden bg-mist">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  <span className="text-gold-ink">{post.category}</span>
                  <span aria-hidden="true" className="h-px w-4 bg-hairline" />
                  <time dateTime={post.date} className="text-slate">
                    {formatDate(post.date)}
                  </time>
                </div>
                <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.01em] text-balance text-ink transition-colors group-hover:text-gold-ink">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
                  Read the essay
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
