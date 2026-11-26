// About. The full record, told in the order a careful reader checks it:
//   PageHeader with a fact rail → a dark manifesto panel → the biography
//   beside a portrait → 01 credentials → 02 certifications → 03 expertise
//   → 04 philosophy → 05 the journey, year by year → the closing panel.

import Image from "next/image";
import {
  Map,
  Award,
  Flag,
  Code2,
  Workflow,
  Compass,
  Mountain,
  HardHat,
  BarChart3,
  Megaphone,
  Users,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading, { SectionLabel } from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ImageReveal from "@/components/ui/ImageReveal";
import CTA from "@/components/home/CTA";
import { timeline } from "@/data/timeline";
import { siteConfig } from "@/data/site";
import {
  credentials,
  certifications,
  expertise,
} from "@/data/certifications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "The story of Opeyemi T. Ojurongbe: mining engineer, design engineer and finance engineer, from geotechnical fieldwork to leading BitLayerX Technologies and Orangé Finance.",
  path: "/about",
});

// Icon assignments for data-driven sections (order matches the data files).
const certIcons = [Map, Award, Flag];
const expertiseIcons = [
  Compass,
  Map,
  HardHat,
  Mountain,
  Code2,
  Workflow,
  BarChart3,
  Megaphone,
  Users,
];

const pillars = [
  {
    title: "On Leadership",
    body: [
      "My leadership education began with a ledger, not a stage. Elected Financial Secretary of a national students' federation, I was trusted with other people's money before I was trusted with a microphone, and I believe that order is the right one. Stewardship first; the spotlight, if it comes, comes later.",
      "Every mandate that followed, from General Secretary and National Welfare Director to National Vice President of the Nigerian Universities Engineering Students Association, reinforced the same conviction: leadership is a structure people live inside. It must carry human load. That means explicit standards, honest records, and a welfare test I still apply everywhere: the person furthest from power is the truest measure of whether your leadership works.",
    ],
  },
  {
    title: "On Engineering",
    body: [
      "Mining and geotechnical engineering taught me humility before the facts. The earth does not negotiate. It has properties, and whatever you build will obey them whether you measured them or not. So I measure. Soil investigation, site characterisation, quality control at federal institutions: the unglamorous work that keeps structures standing and people safe.",
      "That discipline became my design philosophy. Study the ground before you trust what stands above it. Design backwards from consequences, not forwards from excitement. Write the standard down, and keep it when it is inconvenient. It works for rock, and it works just as well for code.",
    ],
  },
  {
    title: "On Building",
    body: [
      "A founder, in my view, is a design engineer whose product is the company itself. BitLayerX Technologies exists because thousands of capable businesses still run on paper, memory, and heroic effort. Our mission is to give them systems that do not depend on anyone having a good day: digitalisation with engineering rigour, from human centred design to full stack delivery and automation.",
      "I hold a quiet definition of entrepreneurship: dream boldly, build like an engineer. Vision sets the destination; discipline sets the pace. The market, like the earth, rewards those who respected it enough to measure first.",
    ],
  },
  {
    title: "On Community",
    body: [
      "I learned what community means by knocking on its doors. Census enumeration took me house to house across Ondo State; welfare directorship taught me to find the student no system had reached. You cannot lead a community you have not walked through, and you cannot innovate for people you have not listened to.",
      "So I build communities the way I build products: deliberately. Opening rooms I once had to knock on, and treating every venture as infrastructure someone else will stand on. Innovation is not a solo act. The most important thing I will ever build is the number of builders who come after me.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Who is Opeyemi"
        mark="?"
        description="An engineer, a CEO and a leader. Registered mining engineer; Founder & CEO of BitLayerX Technologies; CEO of Orangé Finance; Founder & President of JETSUP Community; author of Words on Marble. A leader shaped by stewardship, and a builder shaped by the ground itself."
        facts={[
          { label: "Credential", value: "Registered Engineer, NSE" },
          { label: "Education", value: "B.Eng. Mining, FUTA" },
          { label: "Leading", value: "BitLayerX · Orangé · JetsUp" },
          { label: "Based", value: siteConfig.location },
        ]}
      />

      {/* ---- Manifesto ---- */}
      <section className="bg-paper px-4 py-8 sm:px-6 lg:px-8">
        <ScrollReveal className="relative isolate mx-auto max-w-304 overflow-hidden rounded-[28px] bg-ink px-6 py-16 text-porcelain sm:px-12 sm:py-24 lg:px-20">
          <div
            aria-hidden="true"
            className="absolute -top-40 -left-40 -z-10 size-120 rounded-full bg-gold/20 blur-[120px]"
          />
          <span aria-hidden="true" className="block font-display text-7xl leading-[0.6] font-black text-gold">
            &ldquo;
          </span>
          <p className="mt-6 max-w-5xl font-display text-[clamp(1.9rem,4.6vw,3.9rem)] leading-[1.06] font-bold tracking-[-0.035em] text-balance">
            I build the way the earth demands: <span className="text-gold">measure first</span>,
            design backwards from consequences, and{" "}
            <span className="text-gold">keep the standard</span> when it is inconvenient.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-fog">
              {siteConfig.name}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ---- Biography ---- */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <ImageReveal className="aspect-4/5 w-full rounded-3xl bg-mist">
                <Image
                  src="/images/about/portrait-bio.jpg"
                  alt={`Portrait of ${siteConfig.name}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[50%_20%]"
                />
              </ImageReveal>
              <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink backdrop-blur">
                Opeyemi Titus Ojurongbe
              </span>
            </div>
          </div>
          <div>
            <SectionLabel index="01">Biography</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance text-ink">
              The disciplines that keep a mine safe{" "}
              <span className="text-gold-ink">build everything else.</span>
            </h2>
            <div className="mt-10 space-y-6 text-[17px] leading-[1.85] text-slate">
              <p>
                <span className="font-semibold text-ink">Opeyemi Titus Ojurongbe</span> is a
                registered mining engineer with the Nigerian Society of Engineers, a design
                engineer, and a finance engineer: CEO of BitLayerX Technologies and CEO of Orangé
                Finance. His career runs on a single conviction: the disciplines that keep a mine
                safe (measurement, standards, accountability) are the same disciplines that make
                products people trust, money people can account for, and leadership people
                believe in.
              </p>
              <p>
                Trained in mining engineering at the Federal University of Technology, Akure, he
                cut his teeth on the ground itself: geotechnical investigations, soil testing, and
                site characterisation for federal institutions, active quarries, and earthworks
                firms across Nigeria, including quality control and geotechnics under the Federal
                Ministry of Works.
              </p>
              <p>
                In parallel, he became a nationally recognised student leader, rising from
                Financial Secretary to National Vice President of the Nigerian Universities
                Engineering Students Association: a record of progressive governance and financial
                stewardship across university, state, and national platforms.
              </p>
              <p>
                Today he leads two companies and a movement. As CEO of BitLayerX Technologies, which
                he founded, he runs end to end product delivery across UI/UX design, full stack
                development, deployment, and business process automation, accelerating business
                digitalisation across Nigeria and international markets. As CEO of Orangé Finance, he
                brings the same engineering discipline to money. As Founder and President of JETSUP
                Community, he is raising Africa&apos;s young problem-solvers, from every school, every
                village and every street.
              </p>
              <p>
                Twice a week he writes <span className="font-semibold text-ink">Words on Marble</span>,
                a short note on excellence, competence and wisdom, delivered by email and WhatsApp and
                published as videos and posts across every social platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- 02 Credentials ---- */}
      <section className="border-t border-hairline bg-alabaster py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="02"
            eyebrow="Recognition"
            title="Credentials"
            accent="& mandates."
            intro="Conferred by institutions, not claimed on a website. Each one is on the public record."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col rounded-3xl border border-hairline bg-paper p-7 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]">
                  <p className="numeric font-display text-6xl leading-none font-extralight tracking-tighter text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-10 font-display text-xl font-bold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{item.detail}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 03 Certifications ---- */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="03"
            eyebrow="Certifications"
            title="Certified across"
            accent="disciplines."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {certifications.map((cert, i) => {
              const Icon = certIcons[i % certIcons.length];
              return (
                <ScrollReveal key={cert.title} delay={i * 0.08} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl bg-ink p-8 text-porcelain">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-full bg-gold text-ink">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="numeric rounded-full border border-porcelain/20 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-porcelain/80">
                        {cert.year}
                      </span>
                    </div>
                    <h3 className="mt-10 font-display text-2xl leading-tight font-bold tracking-[-0.02em]">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                      {cert.issuer}
                    </p>
                    <p className="mt-5 text-sm leading-relaxed text-fog">{cert.focus}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- 04 Expertise ---- */}
      <section className="border-y border-hairline bg-alabaster py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="04"
            eyebrow="Expertise"
            title="One engineer,"
            accent="many grounds."
            intro="The working toolkit: field, studio and spreadsheet, held to the same standard."
          />
          <div className="grid overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3 [&>*]:bg-paper gap-px">
            {expertise.map((item, i) => {
              const Icon = expertiseIcons[i % expertiseIcons.length];
              return (
                <div key={item.area} className="group p-8 transition-colors duration-300 hover:bg-ink">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-full bg-alabaster text-gold-ink transition-colors group-hover:bg-gold group-hover:text-ink">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="numeric text-[11px] font-bold text-slate transition-colors group-hover:text-fog">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-lg font-bold tracking-[-0.01em] text-ink transition-colors group-hover:text-porcelain">
                    {item.area}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate transition-colors group-hover:text-fog">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- 05 Philosophy ---- */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="05"
            eyebrow="Philosophy"
            title="Three disciplines,"
            accent="one standard."
          />
          <div className="divide-y divide-hairline border-y border-hairline">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title}>
                <article className="grid gap-6 py-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:py-16">
                  <div className="flex items-baseline gap-5">
                    <span className="numeric font-display text-sm font-bold text-gold-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-3xl font-extrabold tracking-[-0.035em] text-ink lg:text-4xl">
                      {pillar.title}
                    </h3>
                  </div>
                  <div className="space-y-5">
                    {pillar.body.map((paragraph, j) => (
                      <p
                        key={j}
                        className={
                          j === 0
                            ? "text-lg leading-[1.75] text-graphite"
                            : "leading-[1.85] text-slate"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 06 Journey ---- */}
      <section className="bg-ink py-20 text-porcelain md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel index="06" tone="dark">
              Journey
            </SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
              A life of <span className="text-gold">standards.</span>
            </h2>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-fog">
              From the mining faculty at FUTA to the boardroom: every step dated, every step
              checkable.
            </p>
          </div>
          <ol className="border-t border-porcelain/10">
            {timeline.map((item) => (
              <li key={item.year} className="border-b border-porcelain/10">
                <ScrollReveal y={18} className="grid gap-3 py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
                  <p className="numeric font-display text-4xl leading-none font-extralight tracking-[-0.04em] text-gold sm:text-5xl">
                    {item.year}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-porcelain">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-fog">{item.description}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTA
        title="The next chapter"
        accent="is being engineered."
        body="Partnerships, products, and people built to last. If that is the kind of work you do, let us talk."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "Explore ventures", href: "/ventures" }}
      />
    </>
  );
}
