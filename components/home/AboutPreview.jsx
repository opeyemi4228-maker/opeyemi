// About statement — oversized editorial manifesto on porcelain with
// dotted-highlight phrases (Nordic Bridge-style), sign-off line and a
// pill CTA into /about.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Dotted highlight chips inside the statement, in three brand treatments.
function Mark({ children, variant = "gold" }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-lg border border-dotted px-3 py-0.5",
        variant === "gold" && "border-gold/70 text-gold",
        variant === "tint" && "border-gold/40 bg-gold/10 text-ink",
        variant === "inverse" && "border-transparent bg-ink text-porcelain"
      )}
    >
      {children}
    </span>
  );
}

export default function AboutPreview() {
  return (
    <section className="bg-porcelain py-32 text-ink md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">About</p>

        {/* Statement */}
        <h2 className="mt-10 max-w-5xl font-display text-[2rem] leading-tight sm:text-5xl sm:leading-[1.3] md:text-6xl md:leading-[1.3]">
          I am <Mark variant="gold">engineering</Mark> what lasts, designing
          digital products, building ventures, and raising communities to{" "}
          <Mark variant="tint">grow beyond borders</Mark> with insight,
          discipline, and <Mark variant="inverse">one standard.</Mark>
        </h2>

        {/* Sign-off + CTA */}
        <div className="mt-20 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg text-ink/60">
              I am Opeyemi T. Ojurongbe, and I will
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em]">
              Take Your Vision Further
            </p>
          </div>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-ink px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-porcelain transition-colors hover:bg-gold hover:text-ink md:self-auto"
          >
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            About Opeyemi
          </Link>
        </div>
      </div>
    </section>
  );
}
