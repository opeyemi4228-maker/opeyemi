// Home — cinematic landing page (Lotus Eletre-style full-bleed hero,
// followed by editorial sections in the BMW Group corporate rhythm).

import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import Stats from "@/components/home/Stats";
import RuixenSection from "@/components/ui/ruixen-feature-section";
import VenturesShowcase from "@/components/home/VenturesShowcase";
import Quote from "@/components/home/Quote";
import InsightsPreview from "@/components/home/InsightsPreview";
import HighlightsBento from "@/components/home/HighlightsBento";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Stats />
      <RuixenSection />
      <VenturesShowcase />
      <Quote />
      <InsightsPreview />
      <HighlightsBento />
      <CTA />
    </>
  );
}
