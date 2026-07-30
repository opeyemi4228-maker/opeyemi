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
import { Button } from "@/components/ui/Button";
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
      <section className="border-y border-smoke bg-charcoal py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="font-display text-3xl leading-snug text-balance text-porcelain md:text-5xl">
            I build the way the earth demands:{" "}
            <span className="text-gold">measure first</span>, design backwards
            from consequences, and{" "}
            <span className="text-gold">keep the standard</span> when it is
            inconvenient.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p className="text-xs uppercase tracking-[0.35em] text-fog">
              {siteConfig.name} · {siteConfig.role}
            </p>
          </div>
        </div>
      </section>

      {/* Bio, portrait + narrative */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div className="relative aspect-3/4 w-full max-w-md overflow-hidden justify-self-center lg:justify-self-start">
            <Image
              src="/images/about/portrait-bio.jpg"
              alt={`Portrait of ${siteConfig.name}`}
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-fog">
            <p>
              <span className="text-porcelain">Opeyemi Titus Ojurongbe</span>{" "}
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
      <section className="border-t border-smoke bg-ink pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-32">
          <SectionHeading eyebrow="Recognition" title="Credentials & Mandates" />
          <div className="grid gap-px border border-smoke bg-smoke sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((item, i) => (
              <div
                key={item.title}
                className="group bg-ink p-8 transition-colors hover:bg-charcoal"
              >
                <p className="font-display text-4xl font-light text-gold/60 transition-colors group-hover:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-display text-xl text-porcelain">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-y border-smoke bg-charcoal py-24 md:py-32">
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
                  className="group flex flex-col border border-smoke bg-ink p-8 transition-colors hover:border-gold/50"
                >
                  <span className="flex h-12 w-12 items-center justify-center bg-gold/10 text-gold">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-lg text-porcelain">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-gold">
                    {cert.issuer}
                    {cert.year ? ` · ${cert.year}` : ""}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fog">
                    {cert.focus}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise, the working toolkit */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Expertise" title="One Engineer, Many Grounds" />
          <div className="grid gap-px border border-smoke bg-smoke sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, i) => {
              const Icon = expertiseIcons[i % expertiseIcons.length];
              return (
                <div
                  key={item.area}
                  className="group bg-ink p-8 transition-colors hover:bg-charcoal"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-gold/70 transition-colors group-hover:text-gold"
                  />
                  <h3 className="mt-5 font-display text-lg text-porcelain">
                    {item.area}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy, four pillars */}
      <section className="border-y border-smoke bg-charcoal py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Philosophy"
            title="Three Disciplines, One Standard"
          />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="font-display text-2xl text-gold">
                  {pillar.title}
                </h3>
                {pillar.body.map((paragraph, i) => (
                  <p key={i} className="mt-5 leading-relaxed text-fog">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Journey" title="Milestones" />
          <ol className="max-w-3xl space-y-14 border-l border-smoke pl-8">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-9.25 top-2 h-2 w-2 bg-gold" />
                <p className="text-sm uppercase tracking-[0.3em] text-gold">
                  {item.year}
                </p>
                <h3 className="mt-2 font-display text-2xl text-porcelain">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-fog">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-smoke bg-charcoal py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Landmark aria-hidden="true" className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-8 font-display text-4xl text-balance text-porcelain md:text-5xl">
            The next chapter is being engineered.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-fog">
            Partnerships, products, and people built to last. If that is the
            kind of work you do, let us talk.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="gold" className="rounded-full px-9">
              <Link href="/contact">
                Start a Conversation
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-porcelain/40 px-9"
            >
              <Link href="/ventures">Explore Ventures</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
