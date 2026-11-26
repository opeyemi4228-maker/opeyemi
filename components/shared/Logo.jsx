// The brand mark and its lockup. What the mark means, and its exact
// geometry, live in lib/logo-geometry.js.
//
// Two colours, both inherited: the structure (ring, bar, shaft) takes
// currentColor; the strata take --logo-accent — gold-ink on paper, the
// brighter gold on ink. `simple` drops to two heavier strata for
// favicon-sized renders, where three blur together.

import { useId } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { BAR, RING, STEM, STRATA_LEFT, STRATA_RIGHT, strata } from "@/lib/logo-geometry";

export function LogoMark({ className, simple = false, title, ...rest }) {
  const clip = `logo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { rows, h } = strata(simple);

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="32" cy="32" r={RING.clip} />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r={RING.r} stroke="currentColor" strokeWidth={RING.width} />
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y={BAR.y} width="64" height={BAR.h} fill="currentColor" />
        <rect x={STEM.x} y={BAR.y} width={STEM.w} height="43" fill="currentColor" />
        <g fill="var(--logo-accent, var(--color-gold-ink))">
          {rows.map((y) => (
            <g key={y}>
              <rect x={STRATA_LEFT.x} y={y} width={STRATA_LEFT.w} height={h} />
              <rect x={STRATA_RIGHT.x} y={y} width={STRATA_RIGHT.w} height={h} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * Mark + name. `subline` adds the three disciplines beneath the name.
 * On a dark surface pass `inverse` so the strata switch to the light gold.
 */
export default function Logo({ className, markClassName, nameClassName, subline = false, inverse = false }) {
  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      style={inverse ? { "--logo-accent": "var(--color-gold)" } : undefined}
    >
      <LogoMark className={cn("h-9 w-9", markClassName)} />
      <span className="flex flex-col">
        <span className={cn("font-display font-semibold uppercase leading-none tracking-[0.2em]", nameClassName)}>
          {siteConfig.wordmark}
        </span>
        {subline && (
          <span
            className={cn(
              "mt-1.5 text-[9px] font-semibold uppercase leading-none tracking-[0.3em]",
              inverse ? "text-gold" : "text-gold-ink"
            )}
          >
            Mining · Design · Finance
          </span>
        )}
      </span>
    </span>
  );
}
