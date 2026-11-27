// 03 · What is Words on Marble? Answered on black: the left column says
// what it is, how often, and how to receive it; the right column is the
// latest edition itself, as text (title, its scripture, the closing line),
// with a door to read it in full.

import { FaWhatsapp } from "react-icons/fa6";
import { SectionLabel } from "@/components/shared/SectionHeading";
import SplitReveal from "@/components/ui/SplitReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PillLink from "@/components/ui/PillLink";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { wordsOnMarble, whatsappHref, editionDate } from "@/data/wordsOnMarble";

export default function WordsOnMarbleFeature() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-porcelain sm:py-16 md:py-20">
      <div aria-hidden="true" className="absolute top-1/3 -right-40 -z-10 size-160 rounded-full bg-gold/15 blur-[140px]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionLabel index="03" tone="dark">
            What is Words on Marble?
          </SectionLabel>
          <SplitReveal className="mt-6 font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            Words worth
            <br />
            <span className="text-gold">carving.</span>
          </SplitReveal>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-porcelain/75">
            {wordsOnMarble.summary}
          </p>


          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <PillLink href="/words-on-marble#subscribe" tone="gold" size="lg">
              Subscribe
            </PillLink>
            <a
              href={whatsappHref()}
              {...(wordsOnMarble.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 border-b border-porcelain/30 pb-1 text-sm font-semibold text-porcelain transition-colors hover:border-gold hover:text-gold"
            >
              <FaWhatsapp aria-hidden="true" className="size-4 text-[#25D366]" />
              Or join on WhatsApp
            </a>
          </div>
        </div>

        <ScrollReveal delay={0.1}>
          <LatestEdition edition={wordsOnMarble.editions[0]} />
        </ScrollReveal>
      </div>
    </section>
  );
}

function LatestEdition({ edition }) {
  const verse = edition.body.find((b) => b.type === "verse");
  const close = edition.body.find((b) => b.type === "close");
  return (
    <Link
      href={`/words-on-marble/${edition.slug}`}
      className="group block rounded-[28px] bg-paper p-7 text-ink shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)] sm:p-10 lg:p-12"
    >
      <span className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-bold tracking-[0.22em] uppercase">
        <span className="text-gold-ink">Latest edition</span>
        <span className="text-slate">{editionDate(edition)}</span>
      </span>
      <span className="mt-6 block font-display text-[clamp(2rem,4vw,3.25rem)] leading-[0.98] font-black tracking-[-0.045em]">
        {edition.title}
      </span>
      <span className="mt-4 block max-w-lg text-[16px] leading-relaxed text-graphite">{edition.summary}</span>
      {verse && (
        <span className="mt-8 block border-l-2 border-gold pl-5">
          <span className="block text-[17px] leading-snug font-semibold text-ink">&ldquo;{verse.text}&rdquo;</span>
          <span className="mt-2 block text-[10px] font-bold tracking-[0.2em] text-gold-ink uppercase">{verse.ref}</span>
        </span>
      )}
      {close && (
        <span className="mt-8 block border-t border-hairline pt-6 font-display text-xl leading-tight font-extrabold tracking-[-0.025em] sm:text-2xl">
          {close.lines.join(" ")}
        </span>
      )}
      <span className="mt-8 inline-flex items-center gap-3 text-sm font-bold">
        <span className="grid size-10 place-items-center rounded-full bg-ink text-porcelain transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
        Read the full edition
      </span>
    </Link>
  );
}
