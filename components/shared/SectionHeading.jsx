// Consistent section header used across home + inner pages:
// small gold eyebrow, large display heading, optional right-aligned link.

import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, className = "" }) {
  return (
    <div className={cn("mb-16", className)}>
      {eyebrow && (
        <p className="text-sm tracking-[0.3em] uppercase text-gold">{eyebrow}</p>
      )}
      <h2 className="mt-3 max-w-2xl font-display text-4xl text-balance md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
