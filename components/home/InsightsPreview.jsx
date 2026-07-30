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
    <section className="border-t border-smoke bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Insights"
            title="Latest Thinking"
            className="mb-0"
          />
          <Link
            href="/insights"
            className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-fog transition-colors hover:text-gold"
          >
            All insights <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group flex flex-col overflow-hidden border border-smoke bg-ink"
            >
              <div className="relative aspect-3/2 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em]">
                  <span className="text-gold">{post.category}</span>
                  <span aria-hidden="true" className="h-px w-4 bg-smoke" />
                  <time dateTime={post.date} className="text-fog">
                    {formatDate(post.date)}
                  </time>
                </div>
                <h3 className="mt-4 font-display text-xl text-porcelain text-balance transition-colors group-hover:text-gold">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
