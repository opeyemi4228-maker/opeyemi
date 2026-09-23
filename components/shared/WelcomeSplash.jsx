"use client";

// First-visit-of-the-day welcome splash. On the first page load each
// calendar day (any route), a full-screen paper overlay greets the
// visitor with a gold shimmer-wave message, then fades out. Subsequent
// loads the same day skip it (tracked in localStorage). Click to skip.

import React from "react";
import { TextShimmerWave } from "@/components/ui/TextShimmerWave";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "oto-welcome-shown";
const SHOW_MS = 4200; // how long the shimmer plays
const FADE_MS = 700; // fade-out duration (matches duration-700)

export default function WelcomeSplash() {
  // "hidden" → (first visit today) "showing" → "leaving" → "hidden"
  const [phase, setPhase] = React.useState("hidden");
  const timers = React.useRef([]);

  const dismiss = React.useCallback(() => {
    timers.current.forEach(clearTimeout);
    setPhase("leaving");
    timers.current = [setTimeout(() => setPhase("hidden"), FADE_MS)];
  }, []);

  React.useEffect(() => {
    const today = new Date().toDateString();
    try {
      if (localStorage.getItem(STORAGE_KEY) === today) return;
      localStorage.setItem(STORAGE_KEY, today);
    } catch {
      return; // storage unavailable, never nag on every load
    }
    // Intentional setState-in-effect: the splash is gated on localStorage,
    // which only exists on the client, so the server must render "hidden" and
    // the client promotes it after mount. There is no render-time equivalent
    // that stays hydration-safe.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("showing");
    timers.current = [
      setTimeout(() => setPhase("leaving"), SHOW_MS),
      setTimeout(() => setPhase("hidden"), SHOW_MS + FADE_MS),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, []);

  // Hold the page still while the splash is up.
  React.useEffect(() => {
    document.body.style.overflow = phase === "showing" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      role="status"
      aria-label="Welcome"
      onClick={dismiss}
      className={cn(
        "fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-paper transition-opacity duration-700",
        phase === "leaving" ? "opacity-0" : "opacity-100"
      )}
    >
      <TextShimmerWave
        as="h2"
        className="max-w-4xl px-6 text-center font-display text-xl uppercase leading-relaxed tracking-[0.2em] [--base-color:#8a6a1f] [--base-gradient-color:#0c0c0d] md:text-3xl"
        duration={1}
        spread={1}
        zDistance={1}
        scaleDistance={1.1}
        rotateYDistance={20}
      >
        Welcome, This is Opeyemi T. Ojurongbe
      </TextShimmerWave>
    </div>
  );
}
