// Generated sitemap, so the footer "Sitemap" link resolves to something real
// and search engines get an accurate index.
//
// Update SITE_URL once the custom domain is live.

import { insights } from "@/data/insights";

export const SITE_URL = "https://opeyemiojurongbe.vercel.app";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/ventures", priority: 0.9, changeFrequency: "monthly" },
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

  const essays = insights.map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...essays];
}
