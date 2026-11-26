"use client";

// Fades and lifts its children into place the first time they enter the
// viewport. Short travel, long ease: content arrives with weight rather
// than bouncing in. `delay` staggers siblings (pass i * 0.08).
//
// Visitors who ask for reduced motion get the content in place from the
// first frame, with no transition at all.

import { motion, useReducedMotion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;

  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
