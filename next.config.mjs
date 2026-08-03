/** @type {import('next').NextConfig} */
const nextConfig = {
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
