// Small shared helpers.

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Join class names (clsx) and resolve Tailwind conflicts (tailwind-merge). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string like "July 13, 2026". Pinned to UTC: a bare
 * "2026-07-13" parses as UTC midnight, so formatting it in a timezone west
 * of UTC would otherwise print the day before.
 */
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
