"use client";

// Counts from 0 to `value` when scrolled into view — used in the
// Stats band. Supports suffixes like "+", "%", "M".

export default function AnimatedCounter({ value, suffix = "", duration = 1800 }) {
  // TODO: requestAnimationFrame count-up gated by useInView
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
