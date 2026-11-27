// Home: what Opeyemi does now, and nothing more.
//   Hero     Who he is, in one line, with the four things he leads
//   01       BitLayerX Technologies, the company he leads
//   02       Words on Marble, with the latest edition
//   CTA      One clear way to start a conversation
// His history, credentials and timeline live on /about.

import Hero from "@/components/home/Hero";
import WhoIs from "@/components/home/WhoIs";
import VenturesShowcase from "@/components/home/VenturesShowcase";
import WordsOnMarbleFeature from "@/components/home/WordsOnMarbleFeature";
import CTA from "@/components/home/CTA";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = pageMetadata({
  description:
    "Opeyemi T. Ojurongbe is an engineer, a CEO and a leader: Founder & CEO of BitLayerX Technologies and author of Words on Marble.",
  path: "",
});

// Home opens on the black hero, so the mobile browser chrome should too.
export const viewport = { themeColor: "#000000" };

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoIs />
      <VenturesShowcase />
      <WordsOnMarbleFeature />
      <CTA
        tone="light"
        title="Work with"
        accent="Opeyemi."
        body="Projects and partnerships with BitLayerX, speaking invitations and press enquiries. Every message is read personally."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "Email directly", href: `mailto:${siteConfig.email}` }}
        showEmail={false}
      />
    </>
  );
}
