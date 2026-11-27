// One Words on Marble edition on its own page, so every note has an
// address to share: date and scripture, the title, the note in full as
// text, then the newer and older editions either side, and how to receive
// the next one.

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";
import Newsletter from "@/components/shared/Newsletter";
import EditionBody from "@/components/words/EditionBody";
import { wordsOnMarble, editionBySlug, editionDate, editionRefs } from "@/data/wordsOnMarble";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return wordsOnMarble.editions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const edition = editionBySlug(slug);
  if (!edition) return {};
  return pageMetadata({
    title: `${edition.title} · Words on Marble`,
    description: edition.summary,
    path: `/words-on-marble/${edition.slug}`,
  });
}

export default async function EditionPage({ params }) {
  const { slug } = await params;
  const edition = editionBySlug(slug);
  if (!edition) notFound();

  const all = wordsOnMarble.editions;
  const i = all.findIndex((e) => e.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];
  const meta = [editionDate(edition), ...editionRefs(edition)].filter(Boolean);

  return (
    <>
      <article className="bg-paper px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-20 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/words-on-marble"
            className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-slate uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Words on Marble
          </Link>
          <p className="mt-10 text-[11px] font-bold tracking-[0.2em] text-gold-ink uppercase">{meta.join(" · ")}</p>
          <SplitReveal
            as="h1"
            immediate
            delay={0.1}
            className="mt-5 font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.95] font-black tracking-[-0.05em] text-balance text-ink"
          >
            {edition.title}
          </SplitReveal>
          <div className="mt-12 border-t border-hairline pt-10">
            <EditionBody edition={edition} />
          </div>
        </div>
      </article>

      {(newer || older) && (
        <nav aria-label="More editions" className="border-y border-hairline bg-paper">
          <div className="mx-auto grid max-w-7xl sm:grid-cols-2">
            {[
              { e: newer, label: "Newer edition", Icon: ArrowLeft, align: "" },
              { e: older, label: "Earlier edition", Icon: ArrowRight, align: "sm:text-right sm:border-l" },
            ].map(({ e, label, Icon, align }) =>
              e ? (
                <Link
                  key={label}
                  href={`/words-on-marble/${e.slug}`}
                  className={`group block border-hairline px-4 py-8 transition-colors hover:bg-alabaster sm:px-6 lg:px-8 ${align} ${label === "Earlier edition" ? "border-t sm:border-t-0" : ""}`}
                >
                  <span className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-slate uppercase ${align.includes("text-right") ? "sm:justify-end" : ""}`}>
                    {label === "Newer edition" && <Icon aria-hidden="true" className="size-3.5" />}
                    {label}
                    {label === "Earlier edition" && <Icon aria-hidden="true" className="size-3.5" />}
                  </span>
                  <span className="mt-3 block font-display text-2xl leading-tight font-extrabold tracking-[-0.03em] text-ink transition-colors group-hover:text-gold-ink">
                    {e.title}
                  </span>
                </Link>
              ) : (
                <span key={label} className={`hidden sm:block ${align}`} />
              ),
            )}
          </div>
        </nav>
      )}

      <section id="subscribe" className="scroll-mt-24 bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-304">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
