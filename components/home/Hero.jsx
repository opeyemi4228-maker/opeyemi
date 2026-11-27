// Hero: "Who is Opeyemi?", answered in the first screen.
//
// Cinematic and full-bleed: a black-and-white portrait runs edge to edge
// and floor to ceiling (on desktop it holds the right of the frame so the
// type sits on solid black), the header lies transparent over it, and the
// answer is set large on the left. Along the base, a rail names the four
// things he leads, each one a door to its own page, so a visitor knows who
// this is and what he does before scrolling at all.
//
// The entrance is CSS, timed off --intro: on a full page load the welcome
// screen sets it so the name rises just as the curtain lifts; on a move
// between pages it is zero and the hero plays at once.

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PillLink from "@/components/ui/PillLink";
import SplitReveal from "@/components/ui/SplitReveal";
import { organisations } from "@/data/organisations";
import { wordsOnMarble } from "@/data/wordsOnMarble";
import { siteConfig } from "@/data/site";
import OrgMark from "@/components/shared/OrgMark";

const after = (s) => ({ animationDelay: `calc(var(--intro, 0s) + ${s}s)` });

const rail = [
  {
    href: "/about",
    role: "Registered",
    name: "Mining Engineer",
    color: "var(--color-porcelain)",
  },
  ...organisations.map((o) => ({
    org: o,
    href: `/ventures/${o.slug}`,
    role: o.role,
    name: o.short,
    line: o.oneLiner,
    color: o.brand.color,
  })),
  {
    href: "/words-on-marble",
    role: "Author",
    name: wordsOnMarble.name,
    line: `${wordsOnMarble.cadence}: newsletter, videos, posts.`,
    color: "var(--color-gold)",
  },
];

export default function Hero() {
  return (
    <section
      data-nav-theme="dark"
      // Phones: at least a screen, growing to fit. Desktop and laptop: exactly
      // one screen, so the name, the answer and the rail are all in view.
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-porcelain lg:h-[100svh] lg:min-h-[640px]"
    >
      {/* ---- The photograph ---- */}
      {/* Phones and tablets: the photograph is the top of the screen and fades
          into black, and the type starts below the face, never across it.
          Desktop: it holds the right 60% of the frame beside the type. */}
      <div className="relative -z-10 h-[58svh] min-h-[340px] w-full shrink-0 sm:h-[62svh] lg:absolute lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[60%]">
        <Image
          src="/images/ventures/bitlayerx.jpg"
          alt={`${siteConfig.name}, engineer, CEO and leader`}
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="animate-[hero-photo_1.8s_cubic-bezier(0.22,1,0.36,1)_both] object-cover object-[50%_12%] grayscale contrast-[1.08] lg:object-[50%_18%]"
          style={after(0)}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40 lg:bg-gradient-to-r lg:from-ink lg:via-ink/50 lg:to-ink/0"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink to-transparent lg:h-1/2" />
      </div>
      {/* Gold light, low on the left, behind the type. */}
      <div aria-hidden="true" className="absolute -bottom-48 -left-40 -z-10 size-160 rounded-full bg-gold/15 blur-[140px]" />

      {/* ---- The answer ---- */}
      <div className="relative mx-auto -mt-20 flex w-full max-w-7xl flex-1 items-end px-4 pb-8 sm:-mt-24 sm:px-6 sm:pb-10 lg:mt-0 lg:items-center lg:px-8 lg:pt-24 lg:pb-8">
        <div className="w-full">
          <div className="flex animate-fade-up items-center gap-3" style={after(0.05)}>
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase sm:text-xs sm:tracking-[0.3em]">
              Engineer · CEO · Leader
            </p>
          </div>

          <SplitReveal
            as="h1"
            immediate
            delay={0.12}
            stagger={0.1}
            // Width and height both set the size, so on a short laptop screen
            // the name gives way before the rail is pushed off the bottom.
            // Phones: sized so "OJURONGBE." (with its stop) spans the measure
            // with room to spare: ~6.6em wide at this tracking.
            className="mt-4 font-display text-[clamp(2.2rem,13.4vw,4.5rem)] leading-[0.86] font-black tracking-[-0.05em] uppercase sm:mt-5 lg:text-[clamp(3rem,min(10.5vw,14.5svh),8.25rem)]"
          >
            Opeyemi T.
            <br />
            Ojurongbe
            <span className="text-gold">.</span>
          </SplitReveal>

          <p
            className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-porcelain/75 sm:mt-6 sm:text-lg lg:text-xl"
            style={after(0.45)}
          >
            Registered engineer. Founder and CEO of BitLayerX Technologies.
            Author of Words on Marble.
          </p>

          <div
            className="mt-7 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8"
            style={after(0.6)}
          >
            <PillLink href="/about" tone="gold" className="lg:h-14 lg:pr-2 lg:pl-7 lg:text-[15px]">
              Who is Opeyemi?
            </PillLink>
            <Link
              href="/words-on-marble"
              className="group inline-flex items-center gap-2 border-b border-porcelain/30 pb-1 text-sm font-semibold text-porcelain transition-colors hover:border-gold hover:text-gold lg:text-[15px]"
            >
              Read Words on Marble
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Engineer · CEO · Leader, each a door ---- */}
      <nav
        aria-label="Who Opeyemi is"
        className="relative animate-fade-up border-t border-porcelain/10 bg-ink/50 backdrop-blur-md"
        style={after(0.75)}
      >
        <ul className="mx-auto grid max-w-7xl grid-cols-3">
          {rail.map((item, i) => (
            <li
              key={item.href}
              className={i > 0 ? "border-l border-porcelain/10" : undefined}
            >
              <Link href={item.href} className="group relative block h-full px-3 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: item.color }}
                />
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[9px] leading-snug font-semibold tracking-[0.14em] text-fog uppercase sm:text-[10px] sm:tracking-[0.2em]">
                    {item.role}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="hidden size-4 shrink-0 text-porcelain/40 sm:block transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-gold"
                  />
                </span>
                <span className="mt-2 flex items-center gap-2 sm:gap-2.5">
                  {item.org?.logo ? (
                    <OrgMark org={item.org} className="size-6" />
                  ) : (
                    <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ background: item.color }} />
                  )}
                  <span className="font-display text-[15px] leading-tight font-extrabold tracking-[-0.02em] sm:text-xl">
                    {item.name}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
