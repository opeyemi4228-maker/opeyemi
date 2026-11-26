"use client";

// A heading that rises into place word by word from behind a mask, the
// opening move on Vista Energy's and most award-grade editorial sites.
//
// Each word sits in its own overflow-hidden slot and slides up from below
// its baseline, staggered, so a line reads as being set rather than faded
// in. The words stay real text in one element throughout: screen readers
// and search engines read the sentence, never fragments, and copy-paste
// works. Reduced motion renders the finished heading with no movement.
//
// `children` may mix plain strings and elements (an accent <span>); strings
// are split into words, elements are kept whole and animate as one word.

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

function tokens(children) {
  const out = [];
  React.Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split(/(\s+)/)
        .forEach((t) => {
          if (t === "") return;
          out.push(/^\s+$/.test(t) ? { space: true } : { text: t });
        });
    } else if (child) {
      // An element: split its own string children so an accent phrase
      // still rises word by word, keeping the element's styling.
      if (React.isValidElement(child) && typeof child.props.children === "string") {
        child.props.children
          .split(/(\s+)/)
          .forEach((t) => {
            if (t === "") return;
            out.push(
              /^\s+$/.test(t)
                ? { space: true }
                : { el: React.cloneElement(child, { key: undefined }, t) }
            );
          });
      } else if (React.isValidElement(child) && child.type === "br") {
        out.push({ br: true });
      } else {
        out.push({ el: child });
      }
    }
  });

  // Glue: a piece with no space before it (the gold full stop, the gold
  // square after a name) belongs to the word it follows, so it rides in the
  // same masked slot and the line can never break between them.
  const glued = [];
  for (const t of out) {
    const prev = glued[glued.length - 1];
    if (!t.space && !t.br && prev && !prev.space && !prev.br) {
      prev.extra = [...(prev.extra ?? []), t];
    } else {
      glued.push({ ...t });
    }
  }
  return glued;
}

function content(p) {
  return (
    <>
      {p.text ?? p.el}
      {p.extra?.map((x, i) => (
        <React.Fragment key={i}>{x.text ?? x.el}</React.Fragment>
      ))}
    </>
  );
}

export default function SplitReveal({
  as = "h2",
  children,
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false,
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.h2;
  const parts = tokens(children);
  let w = 0;

  const word = {
    hidden: { y: "105%" },
    shown: (i) => ({
      y: "0%",
      transition: { duration: 0.95, ease: EASE, delay: delay + i * stagger },
    }),
  };

  // Above the fold: pure CSS, so the words rise from the first paint with
  // no wait for hydration. (Reduced motion is handled by the global rule in
  // globals.css, which collapses the animation to its finished state.)
  if (immediate) {
    const Plain = as;
    let n = 0;
    return (
      <Plain className={className}>
        {parts.map((p, i) => {
          if (p.space) return " ";
          if (p.br) return <br key={`br-${i}`} />;
          const idx = n++;
          return (
            <span key={i} className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom whitespace-nowrap">
              <span
                className="inline-block animate-rise"
                // --intro: set by the welcome screen on a full load, so the
                // words rise as its curtain lifts rather than behind it.
                style={{ animationDelay: `calc(var(--intro, 0s) + ${delay + idx * stagger}s)` }}
              >
                {content(p)}
              </span>
            </span>
          );
        })}
      </Plain>
    );
  }

  const viewProps = {
    initial: reduce ? false : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: 0.4 },
  };

  return (
    <Tag className={className} {...viewProps}>
      {parts.map((p, i) => {
        if (p.space) return " ";
        if (p.br) return <br key={`br-${i}`} />;
        const idx = w++;
        return (
          <span
            key={i}
            // Slightly taller than the line so descenders and the gold
            // full stop are never clipped by the mask.
            className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom whitespace-nowrap"
          >
            <motion.span className="inline-block will-change-transform" variants={word} custom={idx}>
              {content(p)}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
