// Full-viewport cinematic hero (Lotus Eletre composition, Nordic Bridge
// editorial detailing): portrait background with layered scrims, gold rule
// eyebrow, stacked display name, the creed, pill CTAs, and a labelled meta
// bar anchoring the bottom of the viewport.
//
// Positioning rule: the eyebrow carries three verifiable facts rather than a
// self-appointed title, and the creed does the emotional work. A reader meets
// evidence before they meet a claim.
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
  { label: "Base", value: "Abuja, Nigeria · Working Globally", short: "Abuja, Nigeria" },
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
        alt={`${siteConfig.name}, design engineer and registered mining engineer, in profile`}
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

      {/* Scrims at md+: left vignette carries the text, bottom fade settles
          into the page. The vignette holds density further right than the
          copy extends, so the wider text block stays legible over the
          portrait rather than fighting it. */}
      <div className="absolute inset-0 hidden bg-linear-to-r from-black/90 from-20% via-black/60 via-60% to-transparent md:block" />
      <div className="absolute inset-0 hidden bg-linear-to-b from-black/40 via-transparent to-black/95 md:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pt-36 sm:pb-4 md:pt-44 md:pb-6">
        {/* Eyebrow: three verifiable facts, with a gold rule. */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold sm:w-10" />
          {/* Mobile: tokenised, wraps cleanly on word boundaries. */}
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-gold sm:hidden">
            {eyebrowTokens.map((token, i) => (
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
          {/* sm+: single tracked line. */}
          <p className="hidden text-[11px] uppercase tracking-[0.28em] text-gold sm:block md:text-xs md:tracking-[0.3em]">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Stacked display name — fluid on phones, original scale from sm up. */}
        <h1 className="mt-6 font-display text-[clamp(2.35rem,10.5vw,3.4rem)] font-semibold uppercase leading-[0.95] text-porcelain sm:mt-7 sm:text-7xl lg:text-8xl">
          Opeyemi T.
          <br />
          Ojurongbe
        </h1>

        {/* The creed. The one sentence that makes three disciplines one. */}
        <blockquote className="mt-6 max-w-2xl border-l-2 border-gold pl-5 sm:mt-8 sm:pl-6 md:max-w-3xl lg:max-w-4xl">
          <p className="font-display text-lg leading-snug text-porcelain text-pretty sm:text-2xl md:text-[1.75rem] lg:text-[2rem]">
            &ldquo;{siteConfig.creed}&rdquo;
          </p>
        </blockquote>

        {/* Intro — concrete image, short sentences. */}
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fog sm:mt-6 sm:text-base md:max-w-2xl md:text-[17px] lg:max-w-3xl">
          I design and build the products and systems organisations run on.
          <span className="hidden sm:inline">
            {" "}
            Previously underground; now mostly on screens. The discipline is
            the same.
          </span>
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
              See the work
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-porcelain/40 px-9 sm:w-auto"
          >
            <Link href="/about">The story</Link>
          </Button>
        </div>

        {/* Meta bar. Phones get one quiet dot-separated line instead of three
            labelled blocks; sm+ keeps the labelled grid. */}
        <div className="mt-10 border-t border-white/15 pt-5 sm:mt-14 sm:pt-0">
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

          <dl className="hidden py-7 sm:grid sm:grid-cols-3 sm:gap-8">
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
