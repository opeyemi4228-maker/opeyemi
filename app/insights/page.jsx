// Insights — articles, essays, and thought leadership (index page).
// Structure: PageHeader → featured (newest) article → article grid →
// newsletter signup. Driven by data/insights.js.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Newsletter from "@/components/shared/Newsletter";
import { insights } from "@/data/insights";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Insights" };

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Ideas & Perspectives"
        description="Blogs on tech and leadership: innovation, sustainability, development, and system design."
      />

      {/* Featured, newest essay */}
      <section className="bg-paper pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">
            Latest
          </p>
          <Link
            href={`/insights/${featured.slug}`}
            className="group grid overflow-hidden border border-hairline bg-paper transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.3)] lg:grid-cols-2"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-mist lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.22em]">
                <span className="rounded-full border border-gold-ink/40 px-3.5 py-1.5 text-gold-ink">
                  {featured.category}
                </span>
                <time dateTime={featured.date} className="text-slate">
                  {formatDate(featured.date)}
                </time>
              </div>
              <h2 className="mt-6 font-display text-3xl text-balance text-ink transition-colors group-hover:text-gold-ink md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-5 leading-relaxed text-slate">
                {featured.excerpt}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
                Read the essay
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid, remaining essays */}
      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 border-t border-hairline pt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate">
            More essays
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
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
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
                  <h3 className="mt-4 font-display text-xl text-balance text-ink transition-colors group-hover:text-gold-ink">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
                    Read
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

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <Newsletter />
      </div>
    </>
  );
}
