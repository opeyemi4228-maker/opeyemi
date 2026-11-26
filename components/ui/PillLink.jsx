"use client";

// The site's primary control: a fully rounded pill with its label on the
// left and the arrow set in its own circle on the right. The circle is what
// makes it read as a destination rather than a tag, and on hover the arrow
// turns a quarter towards where it is going.
//
// Renders a Next <Link> for internal paths and a plain <a> for anything
// else (mailto:, tel:, external), so call sites never have to choose.
// It leans toward the pointer on hover: the motion is on the pill itself,
// so every layout class a caller passes (spacing, alignment, full width)
// keeps working. Mouse only, never under reduced motion, and never on a
// full-width pill, where leaning a block that spans the screen reads as a
// glitch rather than a gesture.

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

// Icons are chosen by name, not passed as components: this is a client
// component, and a server page cannot hand a function across that boundary.
const icons = { arrow: ArrowUpRight, back: ArrowLeft };
const SPRING = { stiffness: 220, damping: 18, mass: 0.6 };

const tones = {
  // Ink on paper: the default primary.
  dark: {
    pill: "bg-ink text-paper hover:bg-graphite",
    dot: "bg-paper text-ink",
  },
  // Paper on ink: the primary inside dark sections.
  light: {
    pill: "bg-paper text-ink hover:bg-porcelain",
    dot: "bg-ink text-paper",
  },
  // The accent. One per view, at most.
  gold: {
    pill: "bg-gold text-ink hover:bg-gold-soft",
    dot: "bg-ink text-gold",
  },
  // Hairline secondary on paper.
  outline: {
    pill: "border border-ink/15 bg-transparent text-ink hover:border-ink",
    dot: "bg-ink text-paper",
  },
  // Hairline secondary on ink.
  outlineLight: {
    pill: "border border-porcelain/25 bg-transparent text-porcelain hover:border-porcelain",
    dot: "bg-porcelain text-ink",
  },
};

export default function PillLink({
  href,
  children,
  tone = "dark",
  size = "md",
  icon = "arrow",
  className,
  ...props
}) {
  const t = tones[tone] ?? tones.dark;
  const Icon = icons[icon] ?? ArrowUpRight;
  const internal = typeof href === "string" && href.startsWith("/");
  const Comp = internal ? MotionLink : motion.a;
  const reduce = useReducedMotion();
  const block = /(^|\s)w-full(\s|$)/.test(className ?? "");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const onPointerMove = (e) => {
    if (reduce || block || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Comp
      href={href}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "group inline-flex items-center justify-between gap-4 rounded-full font-semibold transition-colors duration-300",
        size === "lg" ? "h-14 pr-2 pl-7 text-[15px]" : "h-12 pr-1.5 pl-6 text-sm",
        tone === "gold" || tone === "light" || tone === "outlineLight"
          ? "focus-visible:outline-gold-soft"
          : undefined,
        t.pill,
        className
      )}
      {...props}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "grid shrink-0 place-items-center rounded-full",
          size === "lg" ? "size-10" : "size-9",
          t.dot
        )}
      >
        <Icon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </Comp>
  );
}
