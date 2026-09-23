// About — the story of a professional design engineer, told with intent.
// Structure: PageHeader → Manifesto band → Bio (portrait + narrative) →
// Credentials (numbered) → Certifications → Expertise → Philosophy →
// Timeline → closing CTA band.

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
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
  Landmark,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import { timeline } from "@/data/timeline";
import { siteConfig } from "@/data/site";
import {
  credentials,
  certifications,
  expertise,
} from "@/data/certifications";

export const metadata = { title: "About" };

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
      "So I build communities the way I build products: deliberately. Mentoring young engineers, opening rooms I once had to knock on, and treating every venture as infrastructure someone else will stand on. Innovation is not a solo act. The most important thing I will ever build is the number of builders who come after me.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="From the Ground Up"
        description="Design engineer. Registered mining engineer. Founder & CEO of BitLayerX Technologies. A leader shaped by stewardship, and a builder shaped by the ground itself."
      />

      {/* Manifesto band */}
      <section className="border-y border-hairline bg-alabaster py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="font-display text-[1.9rem] leading-snug text-balance text-ink sm:text-4xl md:text-5xl">
            I build the way the earth demands:{" "}
            <span className="text-gold-ink">measure first</span>, design
            backwards from consequences, and{" "}
            <span className="text-gold-ink">keep the standard</span> when it is
            inconvenient.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-8 bg-gold-ink" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate">
              {siteConfig.name} · {siteConfig.role}
            </p>
          </div>
        </div>
      </section>

      {/* Bio, portrait + narrative */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div className="relative aspect-3/4 w-full max-w-md overflow-hidden bg-mist justify-self-center lg:justify-self-start">
            <Image
              src="/images/about/portrait-bio.jpg"
              alt={`Portrait of ${siteConfig.name}`}
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-6 text-[17px] leading-[1.8] text-slate lg:text-lg">
            <p>
              <span className="font-medium text-ink">
                Opeyemi Titus Ojurongbe
              </span>{" "}
              is a design engineer, a registered mining engineer with the
              Nigerian Society of Engineers, and the Founder &amp; CEO of
              BitLayerX Technologies. His career runs on a single conviction:
              the disciplines that keep a mine safe (measurement, standards,
              accountability) are the same disciplines that make products
              people trust and leadership people believe in.
            </p>
            <p>
              Trained in mining engineering at the Federal University of
              Technology, Akure, he cut his teeth on the ground itself:
              geotechnical investigations, soil testing, and site
              characterisation for federal institutions, active quarries, and
              earthworks firms across Nigeria, including quality control and
              geotechnics under the Federal Ministry of Works.
            </p>
            <p>
              In parallel, he became a nationally recognised student leader,
              rising from Financial Secretary to National Vice President of
              the Nigerian Universities Engineering Students Association: a
              record of progressive governance and financial stewardship
              across university, state, and national platforms.
            </p>
            <p>
              Today, as Founder &amp; CEO of BitLayerX Technologies, he leads
              end to end product delivery across UI/UX design, full stack
              development, deployment, and business process automation,
              accelerating business digitalisation across Nigeria and
              international markets.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials, numbered mandates */}
      <section className="border-t border-hairline bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Recognition" title="Credentials & Mandates" />
          <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((item, i) => (
              <div
                key={item.title}
                className="group bg-paper p-8 transition-colors hover:bg-alabaster"
              >
                <p className="font-display text-4xl font-light text-gold-ink/45 transition-colors group-hover:text-gold-ink">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-display text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-y border-hairline bg-alabaster py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Certifications"
            title="Certified Across Disciplines"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => {
              const Icon = certIcons[i % certIcons.length];
              return (
                <div
                  key={cert.title}
                  className="flex flex-col border border-hairline bg-paper p-8 transition-shadow duration-300 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.25)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-gold-ink">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-lg text-ink">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-ink">
                    {cert.issuer}
                    {cert.year ? ` · ${cert.year}` : ""}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate">
                    {cert.focus}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise, the working toolkit */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Expertise" title="One Engineer, Many Grounds" />
          <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, i) => {
              const Icon = expertiseIcons[i % expertiseIcons.length];
              return (
                <div
                  key={item.area}
                  className="group bg-paper p-8 transition-colors hover:bg-alabaster"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-gold-ink/70 transition-colors group-hover:text-gold-ink"
                  />
                  <h3 className="mt-5 font-display text-lg text-ink">
                    {item.area}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy, four pillars */}
      <section className="border-y border-hairline bg-alabaster py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Philosophy"
            title="Three Disciplines, One Standard"
          />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="border-t-2 border-ink pt-7">
                <h3 className="font-display text-2xl text-ink">
                  {pillar.title}
                </h3>
                {pillar.body.map((paragraph, i) => (
                  <p key={i} className="mt-5 leading-[1.8] text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Journey" title="Milestones" />
          <ol className="max-w-3xl space-y-12 border-l border-hairline pl-8">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.3rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-gold-ink bg-paper"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">
                  {item.year}
                </p>
                <h3 className="mt-2.5 font-display text-2xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-20 text-porcelain md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Landmark aria-hidden="true" className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-8 font-display text-3xl text-balance sm:text-4xl md:text-5xl">
            The next chapter is being engineered.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-fog">
            Partnerships, products, and people built to last. If that is the
            kind of work you do, let us talk.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-porcelain px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold sm:w-auto"
            >
              Start a Conversation
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/ventures"
              className="inline-flex w-full items-center justify-center rounded-full border border-porcelain/30 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-porcelain transition-colors hover:border-porcelain hover:bg-porcelain hover:text-ink sm:w-auto"
            >
              Explore Ventures
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
