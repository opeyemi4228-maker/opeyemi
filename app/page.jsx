// Home. Ordered as a single argument rather than a set of sections:
//   1. Who this is, and the one idea that unifies three disciplines (Hero)
//   2. What that idea means in practice (About)
//   3. The credentials that make it checkable (Stats)
//   4. What has actually been built (Ventures)
//   5. The thinking, in his own words (Insights)
//   6. Externally-conferred proof, at peak reader interest (Proof)
//   7. One clear, low-friction way to start a conversation (CTA)

import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import Stats from "@/components/home/Stats";
import VenturesShowcase from "@/components/home/VenturesShowcase";
import InsightsPreview from "@/components/home/InsightsPreview";
import Proof from "@/components/home/Proof";
import CTA from "@/components/home/CTA";

// Home opens on black, so the mobile browser chrome should too — the
// root layout's white is right for every other route.
export const viewport = { themeColor: "#000000" };

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Stats />
      <VenturesShowcase />
      <InsightsPreview />
      <Proof />
      <CTA />
    </>
  );
}
