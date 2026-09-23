// Ventures — portfolio of companies, practices, and mandates, told as
// alternating full-width story panels: portrait beside role eyebrow,
// display name, summary, and the story behind the picture.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { ventures } from "@/data/ventures";

export const metadata = { title: "Ventures" };

// The story behind each venture's picture — keyed by slug so the
// narrative lives beside the data without bloating data/ventures.js.
const stories = {
  "bitlayerx-technologies":
    "This is what conviction looks like on a Monday morning. BitLayerX began with a simple observation: thousands of capable businesses run on paper, memory, and heroic effort. Every engagement starts the way a geotechnical survey does, studying how the business actually works before building what it stands on next.",
  "r-zone-enterprises":
    "Between takes. Directing media strategy across borders means translating one global brand voice into local resonance, content production, campaigns, and partnerships that align Lagos and London without flattening either.",
  "engineering-practice":
    "The discipline underneath everything else. Soil investigation, site characterisation, quality control: the unglamorous measurements that keep structures standing and people safe. The earth does not negotiate, so the practice is simple, measure first, certify honestly, build accordingly.",
  "leadership-mentorship":
    "The khaki tells its own story. National service in uniform, after years of national mandates out of it, from keeping a students' federation's books to representing every engineering student in Nigeria. Now that record compounds through mentorship: building the builders who come next.",
};

export default function VenturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ventures"
        title="Building What Matters"
        description="Companies, practices, and mandates, each one a chapter, each picture a story."
      />

      <section className="bg-paper pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl space-y-20 px-6 md:space-y-28">
          {ventures.map((venture, i) => (
            <article
              key={venture.slug}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              {/* Picture */}
              <div
                className={`relative aspect-4/5 w-full overflow-hidden bg-mist ${
                  i % 2 === 1 ? "lg:order-last" : ""
                }`}
              >
                <Image
                  src={venture.image}
                  alt={`${venture.name}, ${venture.role}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>

              {/* Story */}
              <div>
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold-ink" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-ink">
                    {venture.role}
                  </p>
                </div>
                <h2 className="mt-5 font-display text-3xl text-ink sm:text-4xl md:text-5xl">
                  {venture.name}
                </h2>
                <p className="mt-6 text-[17px] leading-[1.8] text-slate">
                  {venture.summary}
                </p>
                {stories[venture.slug] && (
                  <p className="mt-6 border-l-2 border-gold pl-5 text-[15px] leading-relaxed text-graphite">
                    {stories[venture.slug]}
                  </p>
                )}
                {venture.url && (
                  <Link
                    href={venture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:text-gold-ink"
                  >
                    Visit
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-20 text-center text-porcelain md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl text-balance md:text-4xl">
            The next chapter is always under construction.
          </h2>
          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-porcelain px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold"
          >
            Build with me
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
