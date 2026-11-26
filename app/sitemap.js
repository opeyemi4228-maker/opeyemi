// Generated sitemap, so the footer "Sitemap" link resolves to something real
// and search engines get an accurate index. The domain comes from
// NEXT_PUBLIC_SITE_URL (see lib/seo.js). /admin is deliberately absent.

import { insights } from "@/data/insights";
import { SITE_URL } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/ventures", priority: 0.9, changeFrequency: "monthly" },
    { path: "/ventures/bitlayerx", priority: 0.85, changeFrequency: "monthly" },
    { path: "/ventures/orange-finance", priority: 0.85, changeFrequency: "monthly" },
    { path: "/ventures/jetsup", priority: 0.85, changeFrequency: "monthly" },
    { path: "/words-on-marble", priority: 0.9, changeFrequency: "weekly" },
    { path: "/insights", priority: 0.9, changeFrequency: "weekly" },
    { path: "/speaking", priority: 0.8, changeFrequency: "monthly" },
    { path: "/media", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/now", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
  ].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // The essay index changes when an essay is published, not on every deploy.
  const newestEssay = insights.reduce((a, b) => (a.date > b.date ? a : b)).date;
  const index = staticRoutes.find((r) => r.url === `${SITE_URL}/insights`);
  if (index) index.lastModified = new Date(newestEssay);

  const essays = insights.map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...essays];
}
