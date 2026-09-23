// Hero — full-bleed cinematic, the barackobama.com opening move.
//
// One photograph running edge to edge and floor to ceiling, the argument
// set over it at the lower left, and a labelled meta rail ruled off along
// the bottom. No split, no panel, no frame: the page opens on the subject
// and the type is inside the picture rather than beside it.
//
// The earlier split composition kept type off the photograph so nothing had
// to be dimmed to stay legible. This one takes the opposite bet and pays
// for it properly — two scrims, one across and one up, sized so the copy
// sits on near-solid black while his face stays in the clear. The portrait
// is already a black-and-white studio profile on a grey seamless, which is
// why it can carry a full bleed at all.
//
// Positioning rule (unchanged): the eyebrow carries three verifiable facts
// rather than a self-appointed title, and the creed does the emotional work.
// A reader meets evidence before they meet a claim.

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

// Tokens for the eyebrow, so it wraps on separators rather than mid-phrase.
const eyebrowTokens = siteConfig.tagline.split("·").map((t) => t.trim());

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-porcelain">
      {/* ---- The photograph ---- */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-3.jpg"
          alt={`${siteConfig.name}, design engineer and registered mining engineer, in profile`}
          fill
          priority
          sizes="100vw"
          quality={90}
          // The source is a 960x1280 portrait, so which axis gets cropped
          // flips with the viewport: phones crop horizontally (hold him
          // right of centre, copy on the seamless), desktops crop
          // vertically (hold the frame high, or the top of his head goes).
          className="object-cover object-[64%_50%] sm:object-[58%_12%] lg:object-[50%_6%]"
        />

        {/* Scrim one, across: holds the lower-left corner at near-solid ink
            and releases before it reaches his face. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/15 sm:from-ink sm:via-ink/60 sm:to-transparent"
        />
        {/* Scrim two, up: grounds the meta rail and keeps the fixed header's
            porcelain type off the bright top of the seamless. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55"
        />
      </div>

      {/* ---- The argument ---- */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-10 sm:pt-36 md:pb-12">
        <div className="max-w-3xl">
          {/* Eyebrow: three verifiable facts, with a gold rule. The rule is
              pinned to the first line's optical centre rather than to the
              block, so it stays put when the tagline wraps. */}
          <div className="flex items-start gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="mt-[0.45rem] h-px w-8 shrink-0 bg-gold sm:w-10"
            />
            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-gold sm:text-[11px] sm:tracking-[0.22em]">
              {eyebrowTokens.map((token, i) => (
                <span key={token} className="inline-flex items-center gap-2.5">
                  {token}
                  {/* The separator trails its own fact rather than leading
                      the next one, so a wrap never starts a line on a dot. */}
                  {i < eyebrowTokens.length - 1 && (
                    <span aria-hidden="true" className="text-gold/40">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Stacked display name. The drop shadow is almost subliminal and
              is there for the one case the scrims cannot cover: a very wide
              viewport pulling the bright seamless in behind the descenders. */}
          <h1 className="mt-6 font-display text-[clamp(2.6rem,11vw,3.6rem)] font-semibold uppercase leading-[0.9] text-porcelain [text-shadow:0_2px_28px_rgba(0,0,0,0.5)] sm:mt-7 sm:text-7xl lg:text-[5.5rem] xl:text-[6.25rem]">
            Opeyemi T.
            <br />
            Ojurongbe
          </h1>

          {/* The creed. The one sentence that makes three disciplines one,
              and one of only two places on the page that speak in the serif. */}
          <blockquote className="mt-6 max-w-2xl border-l-2 border-gold pl-5 sm:mt-8 sm:pl-6">
            <p className="editorial text-lg italic leading-[1.35] text-porcelain text-pretty sm:text-2xl lg:text-[1.75rem]">
              &ldquo;{siteConfig.creed}&rdquo;
            </p>
          </blockquote>

          {/* CTAs — full-width stack on phones (thumb-friendly, equal
              weight), inline from sm up. On black the primary inverts to
              porcelain; ink on ink would be a button nobody can see. */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto">
              <Link href="/ventures">
                See the work
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outlineInverse"
              className="w-full sm:w-auto"
            >
              <Link href="/about">The story</Link>
            </Button>
          </div>
        </div>

        {/* ---- Meta rail ---- */}
        <div className="mt-10 border-t border-porcelain/15 pt-5 sm:mt-14 sm:pt-0">
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

          <dl className="hidden sm:grid sm:grid-cols-3 sm:divide-x sm:divide-porcelain/15">
            {heroMeta.map((item, i) => (
              <div key={item.label} className={i === 0 ? "py-6 pr-8" : "px-8 py-6"}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-fog">
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

      {/* Marks where the dark region ends, for the header. While this line
          is still below the bar's own bottom edge — while the bar is over
          black and nothing else — the bar goes transparent with light type.
          The moment the line rises into it, the bar returns to opaque paper
          and covers whatever is left. Any page can opt into that behaviour
          by rendering the same marker, which is why the header carries no
          list of routes. */}
      <div
        id="dark-region-end"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
      />
    </section>
  );
}
