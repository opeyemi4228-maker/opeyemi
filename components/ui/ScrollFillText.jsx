"use client";

// A paragraph that inks itself in as it is read. Each word starts pale and
// reaches full colour as the block scrolls through the middle of the
// viewport, so the eye is led along the sentence at reading pace.
//
// The text is real text throughout: one <p>, every word present and
// selectable from the first frame. Only the colour animates. Visitors who
// ask for reduced motion get the finished paragraph.

import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

function Word({ children, progress, range, from, to }) {
  const color = useTransform(progress, range, [from, to]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

export default function ScrollFillText({
  text,
  className,
  from = "rgba(10,10,12,0.16)",
  to = "rgba(10,10,12,1)",
}) {
  const ref = React.useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");
  // Same markup either way, so server and client always agree; reduced
  // motion simply starts every word at its finished colour.
  const start = reduce ? to : from;

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((w, i) => {
        const a = i / words.length;
        const b = Math.min(1, a + 2.5 / words.length);
        return (
          <React.Fragment key={i}>
            <Word progress={scrollYProgress} range={[a, b]} from={start} to={to}>
              {w}
            </Word>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </p>
  );
}
