"use client";

// Lotus-style header built on the header-1 mechanics:
// - transparent over the hero → black glass on scroll (useScrolled)
// - centered wordmark, uppercase tracked link row below (desktop)
// - animated hamburger opening a portal full-screen menu (mobile)

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { MenuToggleIcon } from "@/components/ui/MenuToggleIcon";
import { useScrolled } from "@/hooks/useScrolled";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import SocialLinks from "@/components/shared/SocialLinks";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScrolled(10);
  const pathname = usePathname();

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu on navigation.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-black/90 backdrop-blur-lg supports-[backdrop-filter]:bg-black/70"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
      )}
    >
      {/* Top row, centered wordmark, actions right */}
      <nav className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-6">
        <div aria-hidden="true" />
        <Link
          href="/"
          className="justify-self-center whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.15em] text-porcelain sm:text-base sm:tracking-[0.2em] md:text-xl md:tracking-[0.25em]"
        >
          {siteConfig.wordmark}
        </Link>
        <div className="flex items-center justify-self-end gap-3">
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className="border-transparent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-6" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Second row, Lotus-style uppercase link rail (desktop) */}
      <div className="hidden border-t border-white/10 md:block">
        <ul className="mx-auto flex h-12 max-w-7xl items-center justify-center gap-12 px-6">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.25em] transition-colors",
                    active ? "text-porcelain" : "text-fog hover:text-porcelain"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <MobileMenu open={open} pathname={pathname} />
    </header>
  );
}

function MobileMenu({ open, pathname }) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-lg md:hidden"
    >
      <div className="flex size-full flex-col justify-between p-6 pb-12">
        <ul className="mt-6 space-y-2">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "block py-2.5 font-display text-xl uppercase tracking-[0.2em] transition-colors",
                  pathname.startsWith(link.href)
                    ? "text-gold"
                    : "text-porcelain hover:text-gold"
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-8">
          <Button asChild variant="outline" className="w-full">
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <SocialLinks className="justify-center" />
        </div>
      </div>
    </div>,
    document.body
  );
}
