// Bento overview — hover-reveal doorways into the site's main chapters,
// built on the shadcn-style bento grid (components/ui/bento-grid).
// Cards with a genuinely relevant photo get a photographic background;
// the rest keep the gold glow (no stock filler).

import Image from "next/image";
import { Rocket, PenLine, Clapperboard, User, Mail } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import SectionHeading from "@/components/shared/SectionHeading";

// Photo background — dimmed and fading to black at the base so the
// card's title/description stay legible; sharpens slightly on hover.
function Photo({ src, position = "object-top" }) {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className={`object-cover opacity-50 transition-all duration-300 group-hover:scale-105 group-hover:opacity-65 ${position}`}
      />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-transparent" />
    </div>
  );
}

const features = [
  {
    Icon: User,
    name: "The Story",
    description:
      "From first principles to founded companies. The journey so far.",
    href: "/about",
    cta: "Read the story",
    background: <Photo src="/images/about/portrait.jpg" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Rocket,
    name: "Ventures",
    description: "Companies and platforms creating opportunity across borders.",
    href: "/ventures",
    cta: "Explore ventures",
    background: <Photo src="/images/ventures/bitlayerx.jpg" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: PenLine,
    name: "Insights",
    description: "Blogs on tech, leadership, innovation, and system design.",
    href: "/insights",
    cta: "Read insights",
    background: <Photo src="/images/insights/editorial.jpg" position="object-[50%_22%]" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Clapperboard,
    name: "Media",
    description: "Talks, features, and appearances.",
    href: "/media",
    cta: "Watch & listen",
    background: <Photo src="/images/media/appearance.jpg" position="object-[50%_18%]" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Mail,
    name: "Contact",
    description: "Partnerships, mentorship, speaking, and press enquiries.",
    href: "/contact",
    cta: "Get in touch",
    background: <Photo src="/images/media/lounge.jpg" position="object-[50%_35%]" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function HighlightsBento() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Explore" title="One Site, Every Chapter" />
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
