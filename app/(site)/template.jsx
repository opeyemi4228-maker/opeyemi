"use client";

// Page transitions. A template re-mounts on every navigation, so this is
// where a route change gets its moment: a black curtain bearing the mark
// lifts off the new page while the page itself settles in underneath.
//
// It plays only on navigation within the site, never on the first load, so
// a visitor's first impression (and the page's largest paint) is never
// held behind an animation. Reduced motion: no curtain, no movement.

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "@/components/shared/Logo";

// Module scope survives navigations but not reloads: false on the first
// render of a fresh page load, true for every route change after it.
let navigated = false;

export default function Template({ children }) {
  const reduce = useReducedMotion();
  const [curtain] = React.useState(() => navigated && !reduce);

  React.useEffect(() => {
    navigated = true;
  }, []);

  return (
    <>
      {curtain && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] flex origin-top items-center justify-center bg-ink"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeIn" }}
            style={{ "--logo-accent": "var(--color-gold)" }}
            className="text-porcelain"
          >
            <LogoMark className="size-16" />
          </motion.span>
        </motion.div>
      )}
      <motion.div
        initial={curtain ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
