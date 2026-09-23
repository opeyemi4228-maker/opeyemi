// About statement: an editorial lede in short sentences, set on paper with
// nothing competing for attention.
//
// The service promise ("take your vision further") belongs on the company
// site, not here; a personal site establishes who someone is so the company
// site can sell.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Restrained highlight, used twice at most. Overuse reads as decoration.
//
// The gold mark is a ruled underline rather than a dotted pill: inside a
// serif sentence a bordered box reads as a form field, and the phrase it
// marks is part of the sentence, not an aside lifted out of it.
function Mark({ children, variant = "gold" }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap",
        variant === "gold" &&
          "border-b-2 border-gold-ink/50 pb-0.5 text-gold-ink",
        variant === "inverse" && "rounded-lg bg-ink px-2.5 py-0.5 text-paper"
      )}
    >
      {children}
    </span>
  );
}

export default function AboutPreview() {
  return (
    <section className="border-t border-hairline bg-paper py-20 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-8 bg-gold-ink" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">
            About
          </p>
        </div>

        {/* Lede: one sentence, one concrete image — and the second of the
            two places on the home page that speak in the serif. The hero
            creed and this are the personal statements; everything between
            them is the grotesque doing structural work. */}
        <h2 className="editorial mt-9 max-w-4xl text-[2rem] leading-[1.14] text-balance text-ink sm:text-[2.6rem] md:text-[3.4rem]">
          I spent my early career studying{" "}
          <Mark variant="gold">what is underneath</Mark>: rock, soil, load, the
          things that decide whether what you build above will stand.
        </h2>

        {/* Supporting paragraph: four short sentences, one idea each. */}
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-slate sm:text-xl sm:leading-relaxed">
          Now I do the same work on products. Understand the ground first.
          Design honestly. Build it properly. Hand it over so it still works
          when I am not in the room.
        </p>

        {/* Closing beat. */}
        <p className="mt-12 font-display text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
          Three disciplines. <Mark variant="inverse">One standard.</Mark>
        </p>

        <div className="mt-14 flex flex-col gap-6 border-t border-hairline pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[15px] leading-relaxed text-slate">
            I write about what I am learning while building. Some of it is
            useful.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold-ink sm:self-auto"
          >
            Read the full story
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
