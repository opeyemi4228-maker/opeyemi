"use client";

// A photograph that wipes open as it enters the viewport, then drifts a
// little slower than the page while it is on screen: the two movements
// that give an editorial page depth instead of a stack of flat cards.
//
// Wrap the frame's contents (usually a next/image with `fill`). The frame
// keeps its own size and rounding; only what is inside moves. Reduced
// motion gets the photograph in place, still.

import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ImageReveal({ children, className, parallax = 6, delay = 0 }) {
  const ref = React.useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={reduce ? false : { clipPath: "inset(14% 6% 14% 6% round 28px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -inset-y-[8%] inset-x-0"
        style={reduce ? undefined : { y }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
