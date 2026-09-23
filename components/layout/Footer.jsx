// Footer, built on the Obama Presidential Library pattern: a light surface
// rather than a dark slab, link taxonomy first, then a block of record —
// seal, statement of what this site is and is not, and a "Connect with us"
// channel — closing on a horizontal legal rail.
//
// The reason that pattern works is that it answers the two questions a
// visitor actually has at the bottom of a page: what is this, and who
// stands behind it. A wall of links answers neither.

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { footerColumns, legalLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import SocialLinks from "@/components/shared/SocialLinks";
import Monogram from "@/components/shared/Monogram";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-alabaster">
      {/* ---- Link taxonomy ---- */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <span className="block font-display text-xl font-semibold uppercase leading-snug tracking-[0.18em] text-ink transition-colors hover:text-gold-ink">
                Opeyemi T.
                <br />
                Ojurongbe
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-slate">
              {siteConfig.role}
              <br />
              {siteConfig.location}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink underline decoration-hairline underline-offset-4 transition-colors hover:text-gold-ink hover:decoration-current"
            >
              {siteConfig.email}
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink">
                {column.heading}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-slate transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ---- Block of record: seal · statement · connect ---- */}
      <div className="border-t border-hairline">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[auto_1fr_auto] lg:gap-14">
          <Monogram className="h-24 w-24 shrink-0 text-ink" />

          <p className="max-w-2xl text-sm leading-[1.8] text-slate">
            This is the personal website of{" "}
            <span className="text-ink">{siteConfig.name}</span>, a design
            engineer and a registered mining engineer with the Nigerian
            Society of Engineers. Views published here are his own. They are
            not the positions of any employer, client, or professional body he
            is associated with, and nothing here is professional engineering
            advice.
          </p>

          <div className="lg:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink">
              Connect with us
            </p>
            <SocialLinks
              className="mt-5 lg:flex lg:justify-end"
              fallback={
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-gold-ink"
                >
                  Get in touch
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              }
            />
          </div>
        </div>
      </div>

      {/* ---- Legal rail ---- */}
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-7xl flex-col-reverse gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate">
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2.5">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
