// Closing call-to-action — invitation to connect / book speaking,
// leading into the footer. Gold accent on dark.

import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-porcelain py-32 text-ink">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-4xl text-balance md:text-6xl">
          Let&apos;s build something enduring.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/60">
          A product to launch, a partnership to forge, a community to grow,
          the door is open.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-block bg-ink px-10 py-4 text-sm tracking-[0.2em] uppercase text-porcelain transition-colors hover:bg-gold hover:text-ink"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
