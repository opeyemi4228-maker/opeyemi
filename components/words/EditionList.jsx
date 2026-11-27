// The archive: one row per edition, newest first. Date, title, the
// one-line summary, and a door to the edition's own page.

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { editionDate } from "@/data/wordsOnMarble";

export default function EditionList({ editions }) {
  return (
    <ol className="border-t border-hairline">
      {editions.map((e) => (
        <li key={e.slug} className="border-b border-hairline">
          <Link
            href={`/words-on-marble/${e.slug}`}
            className="group grid gap-2 py-7 transition-colors sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8 md:py-8"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] text-slate uppercase">
              {editionDate(e) || "Earlier edition"}
            </span>
            <span className="block">
              <span className="block font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-extrabold tracking-[-0.035em] text-ink transition-colors group-hover:text-gold-ink">
                {e.title}
              </span>
              <span className="mt-2 block max-w-2xl text-[15px] leading-relaxed text-slate">{e.summary}</span>
            </span>
            <span className="mt-2 hidden size-11 place-items-center rounded-full border border-hairline text-ink transition-[background,border-color,transform] duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-porcelain sm:grid">
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
