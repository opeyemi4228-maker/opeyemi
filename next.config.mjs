// Baseline security headers for every response. No CSP here: Next's inline
// bootstrap scripts need nonces for a strict one, and a loose CSP adds
// little; these cover clickjacking, MIME sniffing, referrer leakage and
// powerful browser features nobody on this site needs.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The dashboard is never cached by the browser or a shared proxy.
      { source: "/admin/:path*", headers: [{ key: "Cache-Control", value: "no-store" }, { key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // The hero portrait is the largest thing a first-time visitor sees, so it
    // is served at quality 90. Next 15 requires every quality used in the app
    // to be declared here, and Next 16 turns the warning into an error.
    qualities: [75, 90],
    // Caps the srcset so we stop generating 3840px variants for a portrait
    // that is never displayed above ~1600px. Smaller candidates mean phones
    // download far less.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
  },
};

export default nextConfig;
