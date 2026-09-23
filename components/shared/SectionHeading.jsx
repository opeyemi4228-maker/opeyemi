// Consistent section header used across home + inner pages:
// gold rule and tracked eyebrow, large display heading in ink.

import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, className = "" }) {
  return (
    <div className={cn("mb-14", className)}>
      {eyebrow && (
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold-ink" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="mt-5 max-w-3xl font-display text-[2rem] font-semibold leading-[1.05] text-balance text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
