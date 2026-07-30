// Signature quote interlude — oversized display type on a dark
// full-width band.

import { siteConfig } from "@/data/site";

export default function Quote() {
  return (
    <section className="bg-charcoal py-40">
      <blockquote className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-display text-3xl leading-snug text-balance text-porcelain md:text-5xl">
          &ldquo;Whether it is rock, code, or people, everything worth
          building begins with understanding what lies beneath.&rdquo;
        </p>
        <footer className="mt-10 text-sm uppercase tracking-[0.3em] text-gold">
          {siteConfig.name}
        </footer>
      </blockquote>
    </section>
  );
}
