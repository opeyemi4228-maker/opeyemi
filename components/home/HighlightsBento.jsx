// Proof, not navigation.
//
// This section sits immediately before the final call to action, where a
// reader who has scrolled this far is at maximum interest. It previously
// repeated the five nav items (their third appearance on the page). It now
// carries externally-conferred, dated evidence instead: things somebody else
// awarded, elected, or appointed.

import Image from "next/image";
import { Award, Flag, Rocket, Landmark, Map } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import SectionHeading from "@/components/shared/SectionHeading";

// Photo background — dimmed and fading to black at the base so the
// card's title/description stay legible; sharpens slightly on hover.
function Photo({ src, alt, position = "object-top" }) {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className={`object-cover opacity-50 transition-all duration-300 group-hover:scale-105 group-hover:opacity-65 ${position}`}
      />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-transparent" />
    </div>
  );
}

const proof = [
  {
    Icon: Flag,
    name: "National Vice President, NUESA",
    description:
      "Elected 2023 to represent every university engineering student in Nigeria, and South West Coordinator alongside it.",
    href: "/about",
    cta: "The full record",
    background: (
      <Photo
        src="/images/ventures/leadership.jpg"
        alt="Opeyemi T. Ojurongbe in NYSC uniform during national service"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Award,
    name: "Registered Engineer, NSE",
    description:
      "Active member of the Nigerian Society of Engineers. A credential awarded by a body, not claimed on a website.",
    href: "/about",
    cta: "Credentials",
    background: (
      <Photo
        src="/images/insights/engineer-the-ground.jpg"
        alt="Portrait of Opeyemi T. Ojurongbe"
        position="object-[50%_20%]"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Rocket,
    name: "Founder & CEO, BitLayerX",
    description:
      "Founded 2025. Digitalisation for businesses still running on paper, memory, and heroic effort.",
    href: "/ventures",
    cta: "See the work",
    background: (
      <Photo
        src="/images/ventures/bitlayerx.jpg"
        alt="Opeyemi T. Ojurongbe, Founder and CEO of BitLayerX Technologies"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Landmark,
    name: "Federal Ministry of Works",
    description:
      "Quality control and geotechnics, under the Director. Where standards get enforced when it is inconvenient.",
    href: "/about",
    cta: "The journey",
    background: null,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Map,
    name: "GIS Professional, Karnataka",
    description:
      "Certified 2020 by the University of Karnataka and the State Institute of Urban Development, India.",
    href: "/about",
    cta: "Certifications",
    background: (
      <Photo
        src="/images/media/lounge.jpg"
        alt="Opeyemi T. Ojurongbe working between engagements"
        position="object-[50%_35%]"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function HighlightsBento() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Verifiable"
          title="Awarded, Elected, Appointed"
        />
        <BentoGrid className="lg:grid-rows-3">
          {proof.map((item) => (
            <BentoCard key={item.name} {...item} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
