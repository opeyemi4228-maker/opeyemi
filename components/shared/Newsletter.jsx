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
    <div className="border-t border-smoke py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-porcelain md:text-3xl">
            Monthly notes on building.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fog">
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
            className="h-12 w-full border border-smoke bg-charcoal px-5 text-sm text-porcelain placeholder:text-fog/60 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-gold px-7 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
          >
            Subscribe <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
