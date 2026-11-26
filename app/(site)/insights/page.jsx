// Insights index. The newest essay as a full-width dark feature, the rest
// as numbered rounded cards, then the newsletter. Driven by data/insights.js.
// (The essays themselves live under /insights/[slug] and are deliberately
// left in their original dark design.)

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { SectionLabel } from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Newsletter from "@/components/shared/Newsletter";
import { insights } from "@/data/insights";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Essays by Opeyemi T. Ojurongbe on technology, leadership, innovation, sustainability and system design, written from the ground up.",
  path: "/insights",
});

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;
  const categories = [...new Set(insights.map((p) => p.category))];

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Ideas & Perspectives"
        description="Essays on technology and leadership: innovation, sustainability, development, and system design, written from the ground up."
        facts={[
          { label: "Essays", value: String(insights.length) },
          { label: "Subjects", value: categories.slice(0, 3).join(" · ") },
          { label: "Latest", value: formatDate(featured.date) },
          { label: "Newsletter", value: "Words on Marble, twice weekly" },
        ]}
      />

      {/* ---- Featured ---- */}
      <section className="bg-paper px-4 pb-20 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-304">
          <Link
            href={`/insights/${featured.slug}`}
            className="group grid overflow-hidden rounded-[28px] bg-ink text-porcelain lg:grid-cols-2"
          >
            <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto lg:min-h-[32rem]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute top-5 left-5 rounded-full bg-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                Latest essay
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.22em]">
                <span className="rounded-full border border-porcelain/25 px-3.5 py-1.5 text-gold">
                  {featured.category}
                </span>
                <time dateTime={featured.date} className="text-fog">
                  {formatDate(featured.date)}
                </time>
              </div>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance">
                {featured.title}
              </h2>
              <p className="mt-5 leading-relaxed text-fog">{featured.excerpt}</p>
              <span className="mt-10 inline-flex items-center gap-4 self-start rounded-full bg-paper py-1.5 pr-1.5 pl-6 text-sm font-semibold text-ink">
                Read the essay
                <span className="grid size-9 place-items-center rounded-full bg-ink text-paper">
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </span>
            </div>
          </Link>
        </ScrollReveal>
      </section>

      {/* ---- More ---- */}
      {rest.length > 0 && (
        <section className="border-t border-hairline bg-alabaster py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionLabel index="02">More essays</SectionLabel>
            <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.08}>
                  <Link href={`/insights/${post.slug}`} className="group block">
                    <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-mist">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 rounded-full bg-paper px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                        {post.category}
                      </span>
                      <span aria-hidden="true" className="numeric absolute right-5 bottom-1 font-display text-8xl leading-none font-extralight text-paper/80">
                        {i + 2}
                      </span>
                    </div>
                    <time dateTime={post.date} className="mt-5 block text-xs font-medium text-slate">
                      {formatDate(post.date)}
                    </time>
                    <h3 className="mt-2 font-display text-xl leading-snug font-bold tracking-[-0.02em] text-balance text-ink transition-colors group-hover:text-gold-ink">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate">{post.excerpt}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-304">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
