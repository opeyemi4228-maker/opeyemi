"use client";

// Site header: a full-width bar in the corporate tradition (BMW,
// Mercedes-Benz): mark and name on the left, the sections in the middle,
// one action on the right, a hairline underneath. No floating capsule and
// no margins around it, so it frames the page rather than sitting on it.
//
// Two skins, chosen by what is underneath:
//   - Over a dark section (the home hero) it is transparent with light
//     type, so the photograph runs right up to the top of the screen. Once
//     the page scrolls, it fills in solid ink so the type stays legible.
//   - Everywhere else it is solid paper with ink type.
// A section opts in to the dark skin with `data-nav-theme="dark"`; the bar
// measures those sections on scroll and switches at the exact pixel the
// dark region stops covering it. Home is known to open dark, so the first
// paint is already right and nothing flashes.
//
// The current page carries a gold underline flush with the bar's base, and
// a gold reading-progress line runs along the bottom edge as the page is
// read. Below 1024px the links fold into a full-screen black menu.

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PillLink from "@/components/ui/PillLink";
import { MenuToggleIcon } from "@/components/ui/MenuToggleIcon";
import { navLinks } from "@/data/navigation";
import { organisations } from "@/data/organisations";
import { siteConfig } from "@/data/site";
import SocialLinks from "@/components/shared/SocialLinks";
import { LogoMark } from "@/components/shared/Logo";
import OrgMark from "@/components/shared/OrgMark";
import { cn } from "@/lib/utils";

const DARK_AT_TOP = new Set(["/"]);
const desktopLinks = navLinks.filter((l) => l.href !== "/contact");

function useOverDark(pathname, barRef) {
  const [overDark, setOverDark] = React.useState(() => DARK_AT_TOP.has(pathname));

  React.useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const regions = document.querySelectorAll('[data-nav-theme="dark"]');
      // The page streams in after the header (behind loading.jsx), so on a
      // first load the header can measure before the hero exists. With
      // nothing to measure yet, keep the route's known opening skin.
      if (!regions.length) {
        setOverDark(DARK_AT_TOP.has(pathname) && window.scrollY < 8);
        return;
      }
      const bar = barRef.current?.getBoundingClientRect().height ?? 80;
      const dark = [...regions].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 0 && r.bottom >= bar;
      });
      setOverDark(dark);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Re-measure when the page itself changes size, which is exactly when
    // streamed content arrives.
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, barRef]);

  return [overDark, setOverDark];
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const barRef = React.useRef(null);
  const toggleRef = React.useRef(null);
  const [overDark, setOverDark] = useOverDark(pathname, barRef);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  const close = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route change: close the menu and take the new route's opening skin
  // (adjusting state during render, React's documented pattern).
  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setOverDark(DARK_AT_TOP.has(pathname));
  }

  // Lock the page while the menu is open; position: fixed is what holds
  // iOS Safari still, and the offset is restored on close.
  React.useEffect(() => {
    if (!open) return;
    const { body } = document;
    const y = window.scrollY;
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width };
    Object.assign(body.style, { position: "fixed", top: `-${y}px`, width: "100%" });
    return () => {
      Object.assign(body.style, prev);
      window.scrollTo(0, y);
    };
  }, [open]);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // The menu is black, so the bar over it takes the light-on-dark skin.
  const dark = overDark || open;

  return (
    <header
      ref={barRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        dark
          ? scrolled
            ? "border-porcelain/10 bg-ink shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]"
            : "border-porcelain/10 bg-transparent"
          : cn(
              "border-hairline bg-paper",
              scrolled && "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)]"
            )
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center gap-6 px-4 sm:px-6 md:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-8"
      >
        <Link
          href="/"
          onClick={close}
          aria-label={`${siteConfig.name}, home`}
          style={{ "--logo-accent": dark ? "var(--color-gold)" : undefined }}
          className={cn(
            "group flex min-w-0 items-center gap-3 justify-self-start transition-colors duration-300",
            dark ? "text-porcelain" : "text-ink"
          )}
        >
          <LogoMark className="size-9 shrink-0 transition-transform duration-700 group-hover:rotate-[360deg] md:size-10" />
          <span className="truncate font-display text-base font-extrabold tracking-[-0.01em] whitespace-nowrap md:text-lg">
            Opeyemi T.{" "}
            <span className={dark ? "text-gold" : "text-gold-ink"}>Ojurongbe</span>
          </span>
        </Link>

        <ul className="hidden h-full items-stretch lg:flex">
          {desktopLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex h-full items-center px-3.5 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 xl:px-5 xl:text-base",
                    dark
                      ? active
                        ? "text-porcelain"
                        : "text-porcelain/70 hover:text-porcelain"
                      : active
                        ? "text-ink"
                        : "text-slate hover:text-ink"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3.5 -bottom-px h-0.5 origin-center transition-transform duration-300 xl:inset-x-5",
                      dark ? "bg-gold" : "bg-gold-ink",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 justify-self-end">
          <PillLink
            href="/contact"
            tone={dark ? "light" : "dark"}
            className="hidden h-11 lg:inline-flex"
          >
            Get in touch
          </PillLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "flex h-11 items-center gap-3 rounded-full p-1.5 text-[15px] font-semibold transition-colors min-[400px]:pl-5 lg:hidden",
              dark ? "bg-porcelain text-ink" : "bg-ink text-paper"
            )}
          >
            <span className="sr-only min-[400px]:not-sr-only">{open ? "Close" : "Menu"}</span>
            <span
              className={cn(
                "grid size-8 place-items-center rounded-full",
                dark ? "bg-ink text-porcelain" : "bg-paper text-ink"
              )}
            >
              <MenuToggleIcon open={open} className="size-4" duration={300} />
            </span>
          </button>
        </div>
      </nav>

      {/* Reading progress along the bar's base. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gold"
      />

      <SiteMenu open={open} pathname={pathname} onClose={close} />
    </header>
  );
}

// Full-screen black menu for phones and tablets: the sections, numbered and
// large, beside the organisations he leads, so the menu itself answers
// "what does he do?". Focus moves in on open and is held there until it
// closes; Escape closes it from anywhere.
function SiteMenu({ open, pathname, onClose }) {
  const panelRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => panelRef.current?.querySelector("a")?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const items = panelRef.current.querySelectorAll("a[href], button:not([disabled])");
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={onKeyDown}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ink text-porcelain lg:hidden"
        >
          <div className="mx-auto flex min-h-full max-w-7xl flex-col gap-12 px-4 pt-28 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 md:pt-32">
            <ul className="border-t border-porcelain/10">
              {navLinks.map((link, i) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-porcelain/10"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline gap-5 py-4 font-display text-[clamp(1.9rem,8vw,3rem)] leading-none font-extrabold tracking-[-0.04em] transition-colors",
                        active ? "text-gold" : "text-porcelain hover:text-gold"
                      )}
                    >
                      <span className="numeric w-6 text-xs font-bold tracking-normal text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid gap-10 sm:grid-cols-2"
            >
              <div>
                <p className="text-[11px] font-semibold tracking-[0.26em] text-fog uppercase">What he leads</p>
                <ul className="mt-4 space-y-3">
                  {organisations.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/ventures/${o.slug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between gap-4 text-porcelain"
                      >
                        <OrgMark org={o} className={o.logo ? "size-7" : "size-2.5"} />
                        <span className="flex-1">
                          <span className="block font-semibold">{o.name}</span>
                          <span className="block text-sm text-fog">{o.role}</span>
                        </span>
                        <ArrowUpRight aria-hidden="true" className="size-4 text-gold transition-transform group-hover:rotate-45" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-6">
                <PillLink href="/contact" tone="gold" size="lg" onClick={onClose} className="w-full">
                  Get in touch
                </PillLink>
                <SocialLinks className="text-fog" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
