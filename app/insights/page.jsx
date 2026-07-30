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
      <section className="bg-ink pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href={`/insights/${featured.slug}`}
            className="group grid overflow-hidden border border-smoke bg-charcoal lg:grid-cols-2"
          >
            <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em]">
                <span className="border border-gold/50 px-3 py-1 text-gold">
                  {featured.category}
                </span>
                <time dateTime={featured.date} className="text-fog">
                  {formatDate(featured.date)}
                </time>
              </div>
              <h2 className="mt-6 font-display text-3xl text-porcelain text-balance transition-colors group-hover:text-gold md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-5 leading-relaxed text-fog">
                {featured.excerpt}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-porcelain transition-colors group-hover:text-gold">
                Read the essay
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid, remaining essays */}
      <section className="bg-ink pb-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group flex flex-col overflow-hidden border border-smoke bg-charcoal"
            >
              <div className="relative aspect-3/2 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <Newsletter />
      </div>
    </>
  );
}
