// "Now" page. What is actually happening at the moment, updated monthly.
//
// It takes ten minutes a month and it is the page that makes a personal site
// feel alive rather than archived. It also gives returning visitors a reason
// to return.
//
// To update: change LAST_UPDATED and edit the entries below. Nothing else.

import PageHeader from "@/components/shared/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTA from "@/components/home/CTA";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Now",
  description:
    "What Opeyemi T. Ojurongbe is working on at the moment: current projects, current reading, and what is next.",
  path: "/now",
});

const LAST_UPDATED = "July 2026";

const entries = [
  {
    heading: "Building",
    body: "Leading BitLayerX Technologies as Founder and CEO. At BitLayerX the work is end to end: understanding how a business actually runs, designing the interface, building the system, and handing it over so it keeps working without me in the room.",
  },
  {
    heading: "Practising",
    body: "Registered with the Nigerian Society of Engineers, having completed the National Youth Service Corps with distinction of service. The engineering practice continues alongside the product work; the two sharpen each other.",
  },
  {
    heading: "Writing",
    body: "Essays on system design, innovation, leadership, and development. Currently working through what geotechnical discipline actually transfers to software, and what does not.",
  },
  {
    heading: "Open to",
    body: "Digitalisation projects, product partnerships and speaking invitations.",
  },
];

export default function NowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Now"
        title="What I Am Doing at the Moment"
        description="A snapshot rather than a CV. Updated monthly, so you are reading something current."
        facts={[
          { label: "Last updated", value: LAST_UPDATED },
          { label: "Based", value: siteConfig.location },
          { label: "Leading", value: "BitLayerX Technologies" },
          { label: "Open to", value: "Projects & partnerships" },
        ]}
      />

      <section className="bg-paper pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-hairline border-b border-hairline">
            {entries.map((entry, i) => (
              <ScrollReveal key={entry.heading}>
                <article className="grid gap-5 py-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:py-14">
                  <div className="flex items-baseline gap-5">
                    <span className="numeric text-sm font-bold text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="font-display text-3xl font-extrabold tracking-[-0.035em] text-ink lg:text-4xl">
                      {entry.heading}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-lg leading-[1.75] text-graphite">{entry.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Overlap with"
        accent="your work?"
        body="If any of that touches what you are building, I would like to hear about it."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={null}
      />
    </>
  );
}
