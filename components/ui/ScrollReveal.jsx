"use client";

// Wrapper that fades/slides children in when they enter the viewport
// (IntersectionObserver via hooks/useInView). Gives the site its
// cinematic scroll rhythm without a heavy animation library.

export default function ScrollReveal({ children, delay = 0, className = "" }) {
  // TODO: useInView + transition classes (opacity/translate) with delay
  return <div className={className}>{children}</div>;
}
