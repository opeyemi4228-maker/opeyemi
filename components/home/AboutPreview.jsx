// About statement on porcelain: an editorial lede in short sentences.
//
// Rewritten away from stacked abstractions ("bold ideas", "beyond borders")
// toward one concrete image a reader can carry away. The service promise
// ("take your vision further") belongs on the company site, not here; a
// personal site establishes who someone is so the company site can sell.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Restrained highlight, used twice at most. Overuse reads as decoration.
function Mark({ children, variant = "gold" }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-lg border border-dotted px-2.5 py-0.5",
        variant === "gold" && "border-gold/70 text-gold",
        variant === "inverse" && "border-transparent bg-ink text-porcelain"
      )}
    >
      {children}
    </span>
  );
}

export default function AboutPreview() {
  return (
    <section className="bg-porcelain py-24 text-ink sm:py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50 sm:text-sm">
            About
          </p>
        </div>

        {/* Lede: one sentence, one concrete image. */}
        <h2 className="mt-10 max-w-4xl font-display text-[1.85rem] leading-tight text-balance sm:text-4xl sm:leading-tight md:text-[3.25rem]">
          I spent my early career studying{" "}
          <Mark variant="gold">what is underneath</Mark>: rock, soil, load, the
          things that decide whether what you build above will stand.
        </h2>

        {/* Supporting paragraph: four short sentences, one idea each. */}
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/70 sm:text-xl sm:leading-relaxed">
          Now I do the same work on products. Understand the ground first.
          Design honestly. Build it properly. Hand it over so it still works
          when I am not in the room.
        </p>

        {/* Closing beat. */}
        <p className="mt-12 font-display text-2xl sm:text-3xl">
          Three disciplines. <Mark variant="inverse">One standard.</Mark>
        </p>

        <div className="mt-14 flex flex-col gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[15px] leading-relaxed text-ink/60">
            I write about what I am learning while building. Some of it is
            useful.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-ink px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-porcelain transition-colors hover:bg-gold hover:text-ink sm:self-auto"
          >
            Read the full story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
