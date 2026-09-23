"use client";

// Newsletter signup strip — composes a mailto until a provider
// (Mailchimp / ConvertKit / Resend) is wired up.

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Newsletter signup");
    const body = encodeURIComponent(
      `Please add ${email} to the newsletter list.`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div id="newsletter" className="scroll-mt-36 border-t-2 border-ink pt-12">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">
            Newsletter
          </p>
          <h2 className="mt-4 font-display text-2xl text-ink md:text-3xl">
            Monthly notes on building.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            Tech, leadership, innovation, sustainability, development, and
            system design. One considered email a month. No noise.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12 w-full rounded-full border border-hairline bg-paper px-6 text-sm text-ink placeholder:text-slate/70 focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold-ink"
          >
            Subscribe <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
