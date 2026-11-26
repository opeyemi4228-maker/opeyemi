// The section opening used on every page.
//
//   01 ── ABOUT                                     ← index, rule, label
//   What I'm building.                              ← heavy display title,
//   One standard.                                     accent phrase in gold
//                                   A short intro, bottom-aligned on the right.
//
// The numbered label gives a long page a spine a reader can feel while
// scrolling; the gold second phrase is the one place a heading raises its
// voice. Both are optional, so the component still reads well as a bare
// eyebrow and title.

import SplitReveal from "@/components/ui/SplitReveal";
import { cn } from "@/lib/utils";

export function SectionLabel({ index, children, tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {index && (
        <span
          className={cn(
            "numeric text-[11px] font-bold tracking-[0.1em]",
            dark ? "text-gold" : "text-gold-ink"
          )}
        >
          {index}
        </span>
      )}
      <span
        aria-hidden="true"
        className={cn("h-px w-8", dark ? "bg-porcelain/25" : "bg-ink/20")}
      />
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.26em]",
          dark ? "text-fog" : "text-slate"
        )}
      >
        {children}
      </p>
    </div>
  );
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  intro,
  action,
  tone = "light",
  className = "",
}) {
  const dark = tone === "dark";
  // Only reserve the right-hand column when there is something to put in
  // it; otherwise a heading in a half-width column is squeezed to a word
  // per line.
  const aside = Boolean(intro || action);

  return (
    <div
      className={cn(
        "mb-10 grid gap-6 md:mb-12",
        aside && "lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-16",
        className
      )}
    >
      <div>
        {eyebrow && (
          <SectionLabel index={index} tone={tone}>
            {eyebrow}
          </SectionLabel>
        )}
        <SplitReveal
          className={cn(
            "mt-6 max-w-4xl font-display text-[clamp(2.25rem,6.4vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance",
            dark ? "text-porcelain" : "text-ink"
          )}
        >
          {title}
          {accent ? " " : null}
          {accent ? <span className={dark ? "text-gold" : "text-gold-ink"}>{accent}</span> : null}
        </SplitReveal>
      </div>

      {aside && (
        <div className="flex flex-col items-start gap-6 lg:pb-2">
          {intro && (
            <p
              className={cn(
                "max-w-sm text-[15px] leading-relaxed",
                dark ? "text-fog" : "text-slate"
              )}
            >
              {intro}
            </p>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
