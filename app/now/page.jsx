// "Now" page. What is actually happening at the moment, updated monthly.
//
// It takes ten minutes a month and it is the page that makes a personal site
// feel alive rather than archived. It also gives returning visitors a reason
// to return.
//
// To update: change LAST_UPDATED and edit the entries below. Nothing else.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Now",
  description:
    "What Opeyemi T. Ojurongbe is working on at the moment: current projects, current reading, and what is next.",
};

const LAST_UPDATED = "July 2026";

const entries = [
  {
    heading: "Building",
    body: "Leading BitLayerX Technologies as Founder and CEO. The work is end to end: understanding how a business actually runs, designing the interface, building the system, and handing it over so it keeps working without me in the room.",
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
    body: "Digitalisation projects, speaking invitations, and conversations with young engineers who are trying to work out their first move. Mentorship requests get answered.",
  },
];

export default function NowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Now"
        title="What I Am Doing at the Moment"
        description="A snapshot rather than a CV. Updated monthly, so you are reading something current."
      />

      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Last updated {LAST_UPDATED} · {siteConfig.location}
          </p>

          <div className="mt-12 space-y-12">
            {entries.map((entry) => (
              <article key={entry.heading}>
                <h2 className="font-display text-2xl text-porcelain">
                  {entry.heading}
                </h2>
                <p className="mt-4 text-[17px] leading-[1.85] text-fog">
                  {entry.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-smoke pt-10">
            <p className="text-sm leading-relaxed text-fog">
              If any of that overlaps with what you are working on, I would
              like to hear about it.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-porcelain transition-colors hover:text-gold"
            >
              Start a conversation
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
