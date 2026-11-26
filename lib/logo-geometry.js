// The brand mark's geometry, on a 64×64 grid. Read by the React component
// (components/shared/Logo.jsx) and the SVG-string builder (lib/logo-svg.js),
// so the two can never drift apart.
//
// The mark is the creed drawn: "everything worth building begins with
// understanding what lies beneath."
//   - The ring is the O.
//   - The T's crossbar runs ring to ring, so it reads as a horizon — a
//     ground line — as much as a letter.
//   - The stem drops below it as a shaft through gold strata: mining, the
//     discipline of looking beneath; design, the structure that stands on
//     it; finance, the ledger lines that hold it up.
//   - The ground line sits above centre on purpose: what is beneath
//     outweighs what shows.

export const RING = { r: 28.1, width: 3.8, clip: 26.1 };
export const BAR = { y: 21, h: 5 };
export const STEM = { x: 29.5, w: 5 };

/** Strata rows: three at display sizes, two (heavier) at favicon sizes. */
export function strata(simple) {
  return simple ? { rows: [36, 46], h: 3.5 } : { rows: [34.5, 42, 49.5], h: 2.5 };
}

// Strata stop short of the shaft on both sides.
export const STRATA_LEFT = { x: 0, w: 26.75 };
export const STRATA_RIGHT = { x: 37.25, w: 26.75 };
