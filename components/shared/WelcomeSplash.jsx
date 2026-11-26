"use client";

// Welcome screen, shown every time the site is loaded (a first visit, a
// refresh, a link opened in a new tab). Moving between pages inside the site
// does not replay it: it lives in the persistent layout, so it plays once per
// load and then stays out of the way.
//
// The whole timeline is CSS. The overlay is in the server HTML from the first
// byte, so the page never flashes before it appears, and it removes itself on
// a timer even if scripts are slow or fail, so it can never trap a visitor.
// JavaScript only adds click-to-skip. Visitors who ask for reduced motion get
// no welcome at all: the global rule collapses it to its end state at once.
//
// Sequence (≈2.6s): the mark draws in, "Welcome" in gold, the name rises in
// two unbreakable lines, a gold line runs beneath, then the black curtain
// lifts off the page.

import React from "react";
import { LogoMark } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const lines = ["Opeyemi T.", "Ojurongbe"];

// The exit is defined here, inline, as well as in globals.css, so the
// welcome can never outstay its time because a stylesheet is stale or slow:
// the overlay carries its own way out.
const EXIT_CSS = `
@keyframes oto-splash-out {
  from { clip-path: inset(0 0 0 0); visibility: visible; }
  to { clip-path: inset(0 0 100% 0); visibility: hidden; }
}
.oto-splash { animation: oto-splash-out 0.85s cubic-bezier(0.76, 0, 0.24, 1) 2s both; }
:root { --intro: 2.15s; }
@media (prefers-reduced-motion: reduce) { .oto-splash { display: none; } }
`;

// Belt and braces: once the curtain has had time to lift, the overlay is
// removed from the page entirely, whatever the CSS did.
const REMOVE_AFTER_MS = 3000;

export default function WelcomeSplash() {
  const [gone, setGone] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setGone(true), REMOVE_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      onClick={() => setGone(true)}
      className="oto-splash fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-ink px-6 text-porcelain"
    >
      <style>{EXIT_CSS}</style>
      {/* Gold glow, low and to one side, as on the closing panels. */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[140px]" />

      <div className="relative flex flex-col items-center text-center">
        <span
          className="animate-fade-up text-porcelain [animation-delay:0.05s]"
          style={{ "--logo-accent": "var(--color-gold)" }}
        >
          <LogoMark className="size-14 sm:size-16" />
        </span>

        <p className="mt-8 animate-fade-up text-[11px] font-semibold tracking-[0.4em] text-gold uppercase [animation-delay:0.2s] sm:text-xs">
          Welcome
        </p>

        <p className="mt-5 font-display text-[clamp(2.4rem,12.5vw,6.5rem)] leading-[0.88] font-black tracking-[-0.05em] uppercase">
          {lines.map((line, i) => (
            // One line per row, never broken inside: the surname always
            // reads whole, at every width.
            <span key={line} className="block overflow-hidden pb-[0.06em] whitespace-nowrap">
              <span
                className={cn("inline-block animate-rise")}
                style={{ animationDelay: `${0.35 + i * 0.12}s` }}
              >
                {line}
                {i === lines.length - 1 && <span className="text-gold">.</span>}
              </span>
            </span>
          ))}
        </p>

        <p className="mt-6 animate-fade-up text-[11px] font-semibold tracking-[0.3em] text-fog uppercase [animation-delay:0.7s] sm:text-xs">
          Engineer <span className="text-gold">·</span> CEO <span className="text-gold">·</span> Leader
        </p>

        {/* The line that runs while the welcome holds. */}
        <span className="mt-10 block h-px w-40 overflow-hidden bg-porcelain/15 sm:w-56">
          <span className="block h-full origin-left animate-[progress_1.3s_cubic-bezier(0.65,0,0.35,1)_0.6s_both] bg-gold" />
        </span>
      </div>
    </div>
  );
}
