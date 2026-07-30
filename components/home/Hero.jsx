// Full-viewport cinematic hero (Lotus Eletre composition, Nordic Bridge
// editorial detailing): portrait background with layered scrims, gold rule
// eyebrow, stacked display name, shimmer line, pill CTAs, and a labeled
// meta bar anchoring the bottom of the viewport.
//
// The md+ composition is deliberately untouched. Everything below md is
// re-tuned so the hero fits one phone viewport without clipping:
//   • svh height + safe-area padding (mobile browser chrome / notch)
//   • portrait re-cropped so the face sits above the copy
//   • bottom-up scrim instead of the desktop left vignette
//   • fluid display type, trimmed intro, stacked full-width CTAs
//   • meta bar collapses from three labelled columns to one quiet line

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import TextShimmerWave from "@/components/ui/TextShimmerWave";
import { siteConfig } from "@/data/site";

// `short` feeds the compact mobile meta line; `value` the labelled grid.
const heroMeta = [
  {
    label: "Currently",
    value: "Founder & CEO, BitLayerX Technologies",
    short: "Founder & CEO, BitLayerX",
  },
  {
    label: "Credential",
    value: "Registered Mining Engineer (NSE)",
    short: "Mining Engineer (NSE)",
  },
  { label: "Base", value: "Nigeria · Working Globally", short: "Nigeria" },
];

// Tokens for the mobile eyebrow, so it wraps on word boundaries rather than
// breaking mid-phrase. sm+ keeps the original single tracked string.
const eyebrowTokens = siteConfig.tagline.split("·").map((t) => t.trim());

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink md:min-h-screen">
      {/* Background portrait — focal point shifts up and right on narrow
          screens so the face clears the copy block below it. */}
      <Image
        src="/images/hero/hero-3.jpg"
        alt={`Black and white profile portrait of ${siteConfig.name}`}
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-[64%_12%] sm:object-[58%_18%] md:object-[50%_25%]"
      />

      {/* Scrims below md: copy runs full width, so it needs a floor rather
          than a side vignette, plus a cap under the fixed navbar. */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 via-45% to-black/30 md:hidden" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/70 to-transparent md:hidden" />

      {/* Scrims at md+: unchanged — left vignette carries the text, bottom
          fade settles into the page. */}
      <div className="absolute inset-0 hidden bg-linear-to-r from-black/85 via-black/40 to-transparent md:block" />
      <div className="absolute inset-0 hidden bg-linear-to-b from-black/40 via-transparent to-black/95 md:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pt-36 sm:pb-4 md:pt-44 md:pb-6">
        {/* Eyebrow with gold rule */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold sm:w-10" />
          {/* Mobile: tokenised, wraps cleanly, drops the fourth descriptor. */}
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-gold sm:hidden">
            {eyebrowTokens.slice(0, 3).map((token, i) => (
              <span key={token} className="inline-flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-gold/50">
                    ·
                  </span>
                )}
                {token}
              </span>
            ))}
          </p>
          {/* sm+: original single tracked line. */}
          <p className="hidden text-sm uppercase tracking-[0.35em] text-gold sm:block">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Stacked display name — fluid on phones, original scale from sm up. */}
        <h1 className="mt-6 font-display text-[clamp(2.35rem,10.5vw,3.4rem)] font-semibold uppercase leading-[0.95] text-porcelain sm:mt-7 sm:text-7xl lg:text-8xl">
          Opeyemi T.
          <br />
          Ojurongbe
        </h1>

        {/* Shimmer line */}
        <p className="mt-5 font-display text-lg font-medium uppercase tracking-[0.22em] text-porcelain sm:mt-7 sm:text-2xl sm:tracking-[0.25em] md:text-3xl">
          The{" "}
          <TextShimmerWave
            as="span"
            duration={1.2}
            spread={1.5}
            className="[--base-color:#c9a24b] [--base-gradient-color:#e6cf94]"
          >
            Visionary
          </TextShimmerWave>
        </p>

        {/* Intro — phones get the lead clause only; sm+ the full sentence. */}
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog sm:mt-6 sm:text-base md:text-lg">
          Engineering Africa&apos;s next chapter: bold ideas made real
          <span className="hidden sm:inline">
            , ventures that open doors, and communities built to last
          </span>
          .
        </p>

        {/* CTAs — full-width stack on phones (thumb-friendly, equal weight),
            inline pills from sm up. */}
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button
            asChild
            variant="gold"
            className="w-full rounded-full px-9 sm:w-auto"
          >
            <Link href="/ventures">
              Explore Ventures
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-porcelain/40 px-9 sm:w-auto"
          >
            <Link href="/about">The Story</Link>
          </Button>
        </div>

        {/* Meta bar. Phones get one quiet dot-separated line instead of three
            labelled blocks; sm+ keeps the original grid. */}
        <div className="mt-10 border-t border-white/15 pt-5 sm:mt-16 sm:pt-0">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] leading-snug text-fog sm:hidden">
            {heroMeta.map((item, i) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-gold/60">
                    ·
                  </span>
                )}
                <span className={i === 0 ? "text-porcelain" : undefined}>
                  {item.short}
                </span>
              </span>
            ))}
          </p>

          <dl className="hidden py-8 sm:grid sm:grid-cols-3 sm:gap-8">
            {heroMeta.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-fog">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm text-porcelain md:text-[15px]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
