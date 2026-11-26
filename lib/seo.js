// SEO helpers. One function builds every page's metadata, so no page can
// forget its canonical URL, its social card, or its description.
//
// Why this exists: Next merges metadata shallowly. A canonical or openGraph
// block set in the root layout is inherited *whole* by every page that does
// not set its own — which previously told search engines that every page on
// the site was a duplicate of the home page.

import { siteConfig } from "@/data/site";

// Set NEXT_PUBLIC_SITE_URL in the hosting dashboard once the custom domain is
// live; the fallback is the current deployment.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://opeyemiojurongbe.vercel.app"
).replace(/\/+$/, "");

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}, mining engineer, design engineer and finance engineer`,
};

/**
 * @param {object} o
 * @param {string} o.title       Page title (the template appends the name).
 * @param {string} o.description 140–160 characters reads best in results.
 * @param {string} o.path        Route path, e.g. "/about". "" for home.
 * @param {object} [o.image]     { url, width, height, alt } — defaults to the site card.
 * @param {string} [o.type]      "website" | "article" | "profile".
 * @param {object} [o.article]   { publishedTime, section } for essays.
 */
export function pageMetadata({ title, description, path = "", image, type = "website", article }) {
  const url = `${SITE_URL}${path}`;
  const images = [image ?? DEFAULT_OG_IMAGE];
  const socialTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path || "/" },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      locale: "en_GB",
      title: socialTitle,
      description,
      images,
      ...(article && {
        publishedTime: article.publishedTime,
        section: article.section,
        authors: [SITE_URL],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Renders a JSON-LD block. `data` may be one object or an array. */
export function jsonLd(data) {
  return {
    type: "application/ld+json",
    // Escape "<" so a string in the data can never close the script tag.
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  };
}
