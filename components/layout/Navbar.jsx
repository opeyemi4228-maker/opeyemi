"use client";

// Lotus-style header built on the header-1 mechanics:
// - transparent over the hero → black glass on scroll (useScrolled)
// - centered wordmark, uppercase tracked link row below (desktop)
// - animated hamburger opening a portal full-screen menu (mobile)

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  const toggleRef = React.useRef(null);

  const close = React.useCallback(() => setOpen(false), []);

  // Lock the page while the menu is open. `position: fixed` (rather than
  // `overflow: hidden`) is what actually holds iOS Safari still; the scroll
  // offset is stashed and restored so closing doesn't jump to the top.
  React.useEffect(() => {
    if (!open) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflowY: body.style.overflowY,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflowY = "scroll"; // keeps the scrollbar gutter, no reflow

    return () => {
      Object.assign(body.style, prev);
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Close on navigation. Same-route taps don't change `pathname`, so the
  // links also call `close()` directly.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close when the viewport crosses into the desktop layout — the panel is
  // `md:hidden`, so leaving it open there would lock scrolling with no menu
  // in sight.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape closes and returns focus to the toggle.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

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
          onClick={close}
          className="justify-self-center whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.15em] text-porcelain sm:text-base sm:tracking-[0.2em] md:text-xl md:tracking-[0.25em]"
        >
          {siteConfig.wordmark}
        </Link>
        <div className="flex items-center justify-self-end gap-3">
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button
            ref={toggleRef}
            size="icon"
            variant="outline"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 border-transparent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
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

      <MobileMenu open={open} pathname={pathname} onClose={close} />
    </header>
  );
}

// Panel slides down under the header; links stagger in behind it and fade
// straight back out on close (no reverse cascade — it reads as hesitation).
const panelVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.05, delayChildren: 0.06 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

function MobileMenu({ open, pathname, onClose }) {
  const panelRef = React.useRef(null);
  // Portals need a DOM target, so wait for mount rather than sniffing
  // `window` mid-render (which desynchronises server and client markup).
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Move focus into the panel on open so keyboard and screen-reader users
  // land on the menu instead of the page behind it.
  React.useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      panelRef.current?.querySelector("a, button")?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Keep Tab inside the panel while it is open.
  const onKeyDown = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={onKeyDown}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          // Scrollable, not clipped: short landscape phones still reach the
          // CTA and socials at the bottom.
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain border-t border-white/10 bg-black/95 backdrop-blur-lg md:hidden"
        >
          {/* Every level between the panel and the staggered items must be a
              motion component — variant propagation stops at plain DOM. */}
          <motion.div className="flex min-h-full flex-col justify-between gap-10 p-6 pb-[max(3rem,env(safe-area-inset-bottom))]">
            <motion.ul className="mt-6 space-y-2">
              {navLinks.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <motion.li key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 py-2.5 font-display text-xl uppercase tracking-[0.2em] transition-colors",
                        active ? "text-gold" : "text-porcelain hover:text-gold"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-px transition-all duration-300",
                          active ? "w-6 bg-gold" : "w-0 bg-transparent"
                        )}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
            <motion.div variants={itemVariants} className="space-y-8">
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact" onClick={onClose}>
                  Get in Touch
                </Link>
              </Button>
              <SocialLinks className="justify-center" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
