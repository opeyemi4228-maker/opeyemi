// 01 · Who is Opeyemi? The question every visitor arrives with, answered
// in three words and then proved: Engineer, CEO, Leader, each with the
// facts behind it. A full-length portrait holds the left; the credentials
// close the section as large figures, so no claim has to be taken on trust.

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import ImageReveal from "@/components/ui/ImageReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import PillLink from "@/components/ui/PillLink";
import { stats } from "@/data/stats";
import { siteConfig } from "@/data/site";

const roles = [
  {
    word: "Engineer",
    title: "Registered with the Nigerian Society of Engineers",
    body: "Trained in mining engineering at FUTA; geotechnics and quality control in the field, including the Federal Ministry of Works. Design and finance engineering are the same discipline, applied to products and to capital.",
    href: "/about",
    cta: "The engineering record",
  },
  {
    word: "CEO",
    title: "Two companies, one standard",
    body: "Founder and CEO of BitLayerX Technologies, which designs and builds the products, brands and systems companies run on. CEO of Orangé Finance, which puts the world's markets in your own account.",
    href: "/ventures",
    cta: "What he leads",
  },
  {
    word: "Leader",
    title: "Building the people who come next",
    body: "Founder and President of JETSUP Community, raising Africa's young problem-solvers. Former National Vice President of NUESA. Author of Words on Marble, a note on excellence twice a week.",
    href: "/ventures/jetsup",
    cta: "The leadership record",
  },
];

export default function AboutPreview() {
  return (
    <section className="bg-paper pt-12 sm:pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="Who is Opeyemi?"
          title="An engineer, a CEO"
          accent="and a leader."
          intro="Three roles, one standard: understand what lies beneath, design it honestly, build it to last, and leave it in hands that can carry it."
          action={<PillLink href="/about">The full story</PillLink>}
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="relative">
            {/* Fixed shape on phones; on desktop it fills its column to the
                height of the three rows, never wider than the column. */}
            <ImageReveal className="aspect-4/5 w-full rounded-[28px] bg-mist lg:aspect-auto lg:h-full">
              <Image
                src="/images/about/portrait.jpg"
                alt={`${siteConfig.name}, full-length portrait`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </ImageReveal>
            <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-ink uppercase backdrop-blur">
              {siteConfig.location}
            </span>
          </div>

          <div className="grid gap-5">
            {roles.map((r, i) => (
              <ScrollReveal key={r.word} delay={i * 0.08} className="h-full">
                {/* A row, not a narrow column: the word gets its own track
                    wide enough for "Engineer." at full size, so it is never
                    clipped, and the facts read at a comfortable measure. */}
                <Link
                  href={r.href}
                  className="group grid h-full gap-5 rounded-[28px] border border-hairline bg-alabaster p-7 transition-colors duration-500 hover:border-ink hover:bg-ink sm:p-8 md:grid-cols-[20rem_minmax(0,1fr)] md:items-center md:gap-8"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="numeric text-xs font-bold text-gold-ink transition-colors group-hover:text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[2.75rem] leading-none font-black tracking-[-0.05em] whitespace-nowrap text-ink transition-colors group-hover:text-porcelain">
                      {r.word}
                      <span className="text-gold">.</span>
                    </span>
                  </span>
                  <span className="block">
                    <span className="flex items-start justify-between gap-4">
                      <span className="block text-[15px] font-bold text-ink transition-colors group-hover:text-porcelain">
                        {r.title}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 shrink-0 text-slate transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-gold"
                      />
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate transition-colors group-hover:text-fog">
                      {r.body}
                    </span>
                    <span className="mt-4 block text-xs font-bold tracking-[0.16em] text-gold-ink uppercase transition-colors group-hover:text-gold">
                      {r.cta}
                    </span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Credentials ---- */}
      <dl className="mt-16 grid border-y border-hairline sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              "border-hairline px-6 py-8 sm:px-8 lg:py-10",
              i > 0 ? "border-t sm:border-t-0" : "",
              i % 2 === 1 ? "sm:border-l" : "",
              i >= 2 ? "sm:border-t lg:border-t-0" : "",
              i === 2 ? "lg:border-l" : "",
            ].join(" ")}
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <p className="numeric font-display text-6xl leading-none font-black tracking-tighter text-ink lg:text-7xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-[15px] font-semibold text-ink">{stat.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate">{stat.detail}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
