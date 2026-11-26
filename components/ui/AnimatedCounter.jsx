"use client";

// Counts up to `value` the first time it scrolls into view. Non-numeric
// values ("NSE") render as they are. The final figure is in the markup from
// the start, so search engines, screen readers and anyone with reduced
// motion read the true number, never a zero.

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export default function AnimatedCounter({ value, suffix = "", duration = 1.6, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const target = Number(value);
  const numeric = Number.isFinite(target) && String(value).trim() !== "";
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!numeric || reduce || !inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, numeric, reduce, target, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden="true">{shown}</span>
      {suffix ? (
        <span aria-hidden="true" className="text-gold-ink">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
