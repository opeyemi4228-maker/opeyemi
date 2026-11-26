// 404 — keeps the brand voice even on error pages. The root not-found renders
// outside the (site) group's layout, so it brings the header and footer
// itself; a visitor who lands on a dead link still has the whole site to go to.

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { navLinks } from "@/data/navigation";
import PillLink from "@/components/ui/PillLink";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="relative isolate flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-paper px-4 pt-36 pb-24 text-center">
          <p
            aria-hidden="true"
            className="numeric pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 font-display text-[42vw] leading-none font-black tracking-[-0.07em] text-alabaster select-none lg:text-[30vw]"
          >
            404
          </p>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate">Error 404</p>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-ink">
            Nothing beneath<span className="text-gold">.</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-slate">
            The page you asked for is not here. It may have been renamed, or the link that brought
            you may be out of date.
          </p>
          <PillLink href="/" icon="back" size="lg" className="mt-10">
            Return home
          </PillLink>
          <nav aria-label="Popular pages" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-full border border-hairline px-4 py-2 text-sm font-semibold text-slate transition-colors hover:border-ink hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </>
  );
}
