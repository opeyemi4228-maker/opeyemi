// 04 · Insights. The three newest essays as rounded cards: photograph with
// the category on a pill and the essay's number set large in its corner,
// then the date and the title. Nothing else competes with the headline.

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import PillLink from "@/components/ui/PillLink";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { insights } from "@/data/insights";
import { formatDate } from "@/lib/utils";

export default function InsightsPreview() {
  const latest = [...insights].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section className="bg-alabaster py-16 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Insights"
          title="In my"
          accent="own words."
          intro="Notes from building: on engineering, on leadership, and on what holds when the pressure arrives."
          action={<PillLink href="/insights">All insights</PillLink>}
        />

        <div className="grid gap-x-5 gap-y-12 md:grid-cols-3">
          {latest.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.08}>
            <Link href={`/insights/${post.slug}`} className="group block">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-mist">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
                />
                <span className="absolute top-4 left-4 rounded-full bg-paper px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  {post.category}
                </span>
                <span
                  aria-hidden="true"
                  className="numeric absolute right-5 bottom-1 font-display text-8xl leading-none font-extralight text-paper/80"
                >
                  {i + 1}
                </span>
              </div>
              <time
                dateTime={post.date}
                className="mt-5 block text-xs font-medium text-slate"
              >
                {formatDate(post.date)}
              </time>
              <h3 className="mt-2 font-display text-xl leading-snug font-bold tracking-[-0.02em] text-balance text-ink transition-colors group-hover:text-gold-ink">
                {post.title}
              </h3>
            </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
