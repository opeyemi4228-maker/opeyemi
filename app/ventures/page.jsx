// Ventures — portfolio of companies, practices, and mandates, told as
// alternating full-width story panels (Lotus model-page rhythm):
// portrait beside role eyebrow, display name, summary, and the story
// behind the picture.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-7xl space-y-24 px-6 md:space-y-32">
          {ventures.map((venture, i) => (
            <article
              key={venture.slug}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              {/* Picture */}
              <div
                className={`relative aspect-4/5 w-full overflow-hidden bg-charcoal ${
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
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Story */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold sm:text-sm">
                  {venture.role}
                </p>
                <h2 className="mt-4 font-display text-3xl text-porcelain sm:text-4xl md:text-5xl">
                  {venture.name}
                </h2>
                <p className="mt-6 leading-relaxed text-fog">
                  {venture.summary}
                </p>
                {stories[venture.slug] && (
                  <p className="mt-5 border-l-2 border-gold/60 pl-5 text-sm leading-relaxed text-fog/90 sm:text-base">
                    {stories[venture.slug]}
                  </p>
                )}
                {venture.url && (
                  <Link
                    href={venture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-porcelain transition-colors hover:text-gold"
                  >
                    Visit <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-smoke bg-charcoal py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl text-balance text-porcelain md:text-4xl">
            The next chapter is always under construction.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
          >
            Build with me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
