// Closing call to action.
//
// Two things matter for conversion here: the primary action is a visible
// email address, because senior people generally will not fill in a form and
// they are the most valuable visitor this site gets; and the band is set in
// ink so the page finishes on a deliberate change of material rather than
// fading out.

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function CTA() {
  return (
    <section className="bg-ink py-20 text-porcelain sm:py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Contact
          </p>
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
        </div>

        <h2 className="mt-8 font-display text-3xl text-balance sm:text-4xl md:text-5xl">
          Let&apos;s build something that lasts.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
          A product to launch. A partnership to explore. A team that needs a
          second opinion. The door is open, and a conversation costs nothing.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-porcelain px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold sm:w-auto"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            Email me directly
          </a>
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-porcelain/30 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-porcelain transition-colors hover:border-porcelain hover:bg-porcelain hover:text-ink sm:w-auto"
          >
            Other enquiries
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <p className="mt-8 text-sm text-fog">
          Or write to{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-porcelain underline underline-offset-4 transition-colors hover:text-gold"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}
