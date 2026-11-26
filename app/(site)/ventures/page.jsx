// Ventures. First the three organisations he leads (BitLayerX, Orangé
// Finance, JETSUP Community), each in its own colour with the one-line
// answer to "what is it?" and a door to its own page. Then the practice and
// the record behind them, each given a full chapter with the story behind
// its photograph.

import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ImageReveal from "@/components/ui/ImageReveal";
import PillLink from "@/components/ui/PillLink";
import CTA from "@/components/home/CTA";
import SectionHeading from "@/components/shared/SectionHeading";
import { BrandPanel } from "@/components/home/VenturesShowcase";
import { organisations } from "@/data/organisations";
import { ventures } from "@/data/ventures";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ventures",
  description:
    "What Opeyemi T. Ojurongbe leads: BitLayerX Technologies, Orangé Finance and JETSUP Community, with the engineering practice, R-Zone Enterprises and the national leadership record behind them.",
  path: "/ventures",
});

// The story behind each venture's picture — keyed by slug so the
// narrative lives beside the data without bloating data/ventures.js.
const stories = {
  "bitlayerx-technologies":
    "This is what conviction looks like on a Monday morning. BitLayerX began with a simple observation: thousands of capable businesses run on paper, memory, and heroic effort. Every engagement starts the way a geotechnical survey does, studying how the business actually works before building what it stands on next.",
  "r-zone-enterprises":
    "Between takes. Directing media strategy across borders means translating one global brand voice into local resonance, content production, campaigns, and partnerships that align Lagos and London without flattening either.",
  "engineering-practice":
    "The discipline underneath everything else. Soil investigation, site characterisation, quality control: the unglamorous measurements that keep structures standing and people safe. The earth does not negotiate, so the practice is simple, measure first, certify honestly, build accordingly.",
  "leadership":
    "The khaki tells its own story. National service in uniform, after years of national mandates out of it, from keeping a students' federation's books to representing every engineering student in Nigeria.",
};

// BitLayerX has its own page now; this list is what sits underneath.
const practice = ventures.filter((v) => v.slug !== "bitlayerx-technologies");

export default function VenturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ventures"
        title="Building What Matters"
        description="Two companies and a movement, and the engineering practice and leadership record underneath them."
        facts={[
          { label: "BitLayerX Technologies", value: "Founder & CEO" },
          { label: "Orangé Finance", value: "CEO" },
          { label: "JETSUP Community", value: "Founder & President" },
          { label: "Practice", value: "Registered Mining Engineer" },
        ]}
      />

      {/* ---- The three organisations ---- */}
      <section className="bg-paper pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {organisations.map((org, i) => (
              <ScrollReveal key={org.slug} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col gap-5">
                  <BrandPanel org={org} index={i} className="min-h-[24rem]" />
                  <p className="px-1 text-[15px] leading-relaxed text-slate">{org.summary}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="02"
            eyebrow="Underneath"
            title="The practice"
            accent="and the record."
            intro="The engineering, media and leadership work that the organisations stand on."
          />
        </div>
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 md:space-y-24 lg:px-8">
          {practice.map((venture, i) => (
            <article
              key={venture.slug}
              id={venture.slug === "engineering-practice" ? "practice" : undefined}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <div className={i % 2 === 1 ? "lg:order-last" : undefined}>
                <div className="relative">
                  <ImageReveal className="aspect-4/5 w-full rounded-[28px] bg-mist">
                    <Image
                      src={venture.image}
                      alt={`${venture.name}, ${venture.role}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-[50%_18%]"
                    />
                  </ImageReveal>
                  <span className="numeric absolute top-5 left-5 grid size-12 place-items-center rounded-full bg-paper text-xs font-bold text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <ScrollReveal delay={0.1}>
                <p
                  aria-hidden="true"
                  className="numeric font-display text-[7rem] leading-[0.8] font-black tracking-[-0.06em] text-mist sm:text-[9rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-ink">
                    {venture.role}
                  </p>
                </div>
                <h2 className="mt-5 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1] font-extrabold tracking-[-0.04em] text-balance text-ink">
                  {venture.name}
                </h2>
                <p className="mt-6 text-[17px] leading-[1.8] text-slate">{venture.summary}</p>
                {stories[venture.slug] && (
                  <blockquote className="mt-8 rounded-3xl bg-alabaster p-6 sm:p-7">
                    <p className="text-[15px] leading-relaxed text-graphite">{stories[venture.slug]}</p>
                  </blockquote>
                )}
                {venture.url && (
                  <PillLink
                    href={venture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8"
                  >
                    Visit {venture.name}
                  </PillLink>
                )}
              </ScrollReveal>
            </article>
          ))}
        </div>
      </section>

      <CTA
        title="The next chapter"
        accent="is under construction."
        body="Digitalisation projects, product builds, finance partnerships and new ventures. If you are building something that has to last, start here."
        primary={{ label: "Build with me", href: "/contact" }}
        secondary={{ label: "Read the story", href: "/about" }}
      />
    </>
  );
}
