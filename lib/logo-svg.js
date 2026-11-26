// The brand mark as an SVG string, for places that cannot render the React
// component: the social card and the iOS home-screen icon (ImageResponse).
// Geometry comes from lib/logo-geometry.js, shared with components/shared/Logo.jsx.

import { BAR, RING, STEM, STRATA_LEFT, STRATA_RIGHT, strata } from "@/lib/logo-geometry";

export function logoSvg({ ink = "#f7f7f5", accent = "#c9a24b", simple = false } = {}) {
  const { rows, h } = strata(simple);
  const bars = rows
    .map(
      (y) =>
        `<rect x="${STRATA_LEFT.x}" y="${y}" width="${STRATA_LEFT.w}" height="${h}"/><rect x="${STRATA_RIGHT.x}" y="${y}" width="${STRATA_RIGHT.w}" height="${h}"/>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><defs><clipPath id="c"><circle cx="32" cy="32" r="${RING.clip}"/></clipPath></defs><circle cx="32" cy="32" r="${RING.r}" stroke="${ink}" stroke-width="${RING.width}"/><g clip-path="url(#c)"><rect x="0" y="${BAR.y}" width="64" height="${BAR.h}" fill="${ink}"/><rect x="${STEM.x}" y="${BAR.y}" width="${STEM.w}" height="43" fill="${ink}"/><g fill="${accent}">${bars}</g></g></svg>`;
}

export function logoDataUrl(options) {
  return `data:image/svg+xml;base64,${Buffer.from(logoSvg(options)).toString("base64")}`;
}
