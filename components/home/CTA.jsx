// Closing call to action.
//
// Two changes that matter for conversion: the comma splice is gone, and the
// primary action is a visible email address. Senior people generally will
// not fill in a form, and they are the most valuable visitor this site gets.

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function CTA() {
  return (
    <section className="bg-porcelain py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl text-balance sm:text-4xl md:text-6xl">
          Let&apos;s build something that lasts.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
          A product to launch. A partnership to explore. A team that needs a
          second opinion. The door is open, and a conversation costs nothing.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex w-full items-center justify-center gap-2 bg-ink px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-porcelain transition-colors hover:bg-gold hover:text-ink sm:w-auto"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            Email me directly
          </a>
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 border border-ink/25 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:border-ink sm:w-auto"
          >
            Other enquiries
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <p className="mt-8 text-sm text-ink/50">
          Or write to{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-ink underline underline-offset-4 transition-colors hover:text-gold"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}
