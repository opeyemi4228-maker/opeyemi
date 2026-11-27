// 01 · Who is Opeyemi? The first thing after the hero, because it is the
// first thing a visitor asks. One plain sentence that answers it, then the
// three words from the hero (Engineer, CEO, Leader), each held up by three
// facts a stranger can check. No adjectives doing the work of evidence.
// The full story is on /about.

import { SectionLabel } from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SplitReveal from "@/components/ui/SplitReveal";
import PillLink from "@/components/ui/PillLink";

const pillars = [
  {
    word: "Engineer",
    proofs: [
      "Registered mining engineer, Nigerian Society of Engineers",
      "B.Eng. Mining Engineering, Federal University of Technology, Akure",
      "Geotechnics and quality control for federal institutions, quarries and earthworks firms",
    ],
  },
  {
    word: "CEO",
    proofs: [
      "Founder and CEO of BitLayerX Technologies since 2025",
      "Leads end-to-end delivery: strategy, design, engineering and automation",
      "Serving organisations across Nigeria and international markets",
    ],
  },
  {
    word: "Leader",
    proofs: [
      "National Vice President, Nigerian Universities Engineering Students Association",
      "Four national leadership mandates, 2021 to 2024",
      "Writes Words on Marble, twice a week, on excellence and competence",
    ],
  },
];

export default function WhoIs() {
  return (
    <section className="bg-paper pt-16 pb-4 sm:pt-20 md:pt-24 md:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <SectionLabel index="01">Who is Opeyemi?</SectionLabel>
          </div>
          <div>
            <SplitReveal
              as="h2"
              stagger={0.025}
              className="font-display text-[clamp(1.7rem,3.6vw,3rem)] leading-[1.12] font-extrabold tracking-[-0.035em] text-ink"
            >
              A registered engineer who builds the products and systems organisations run on,
              <span className="text-slate"> and the company that delivers them: </span>
              <span className="text-gold-ink">BitLayerX Technologies.</span>
            </SplitReveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.word} delay={i * 0.08}>
              <div className="border-t-2 border-ink pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-black tracking-[-0.05em] text-ink">
                    {p.word}
                    <span className="text-gold">.</span>
                  </h3>
                  <span className="numeric text-xs font-bold text-slate">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-6 space-y-3.5">
                  {p.proofs.map((proof) => (
                    <li key={proof} className="flex gap-3 text-[15px] leading-relaxed text-graphite">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
                      {proof}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 md:mt-14">
          <PillLink href="/about">Read his full story</PillLink>
        </div>
      </div>
    </section>
  );
}
