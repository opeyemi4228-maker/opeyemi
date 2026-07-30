"use client";

// Returns true once the page is scrolled past `offset` px — used by
// the Navbar to switch from transparent to glass background.

import { useEffect, useState } from "react";

export function useScrolled(offset = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}
