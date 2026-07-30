// Small shared helpers.

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Join class names (clsx) and resolve Tailwind conflicts (tailwind-merge). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format an ISO date string like "July 13, 2026". */
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
