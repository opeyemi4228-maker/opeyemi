// Footer in the BMW Group layout, on pure black, set in Montserrat:
// stacked wordmark left · uppercase column headings with link groups ·
// social icon row bottom-left · legal links bottom-right.

import Link from "next/link";
import { footerColumns, legalLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import SocialLinks from "@/components/shared/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-smoke bg-ink font-montserrat">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Top, wordmark + link columns */}
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <Link href="/" className="self-start">
            <span className="block text-xl font-bold uppercase leading-snug tracking-widest text-porcelain">
              Opeyemi T.
              <br />
              Ojurongbe
            </span>
          </Link>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-porcelain">
                {column.heading}
              </h3>
              <ul className="mt-7 space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] font-medium text-fog transition-colors hover:text-porcelain"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom, socials left, legal right */}
        <div className="mt-20 flex flex-col gap-10 border-t border-smoke pt-10 lg:flex-row lg:items-center lg:justify-between">
          <SocialLinks />
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-fog transition-colors hover:text-porcelain"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-xs text-fog/70">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
