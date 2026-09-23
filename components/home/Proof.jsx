// Proof, not navigation.
//
// This section sits immediately before the final call to action, where a
// reader who has scrolled this far is at maximum interest. It carries
// externally-conferred, dated evidence: things somebody else awarded,
// elected, or appointed.
//
// Laid out on the Obama Library's module pattern — photograph, heading,
// a sentence of substance, one "learn more" path out — with the first item
// given the width of two so the grid has a clear entry point instead of
// five equal claims competing.

import Image from "next/image";
import Link from "next/link";
import { Award, Flag, Rocket, Landmark, Map, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const proof = [
  {
    Icon: Flag,
    name: "National Vice President, NUESA",
    description:
      "Elected 2023 to represent every university engineering student in Nigeria, and South West Coordinator alongside it.",
    href: "/about",
    cta: "The full record",
    image: "/images/ventures/leadership.jpg",
    alt: "Opeyemi T. Ojurongbe in NYSC uniform during national service",
    featured: true,
  },
  {
    Icon: Award,
    name: "Registered Engineer, NSE",
    description:
      "Active member of the Nigerian Society of Engineers. A credential awarded by a body, not claimed on a website.",
    href: "/about",
    cta: "Credentials",
    image: "/images/insights/engineer-the-ground.jpg",
    alt: "Portrait of Opeyemi T. Ojurongbe",
    position: "object-[50%_20%]",
  },
  {
    Icon: Rocket,
    name: "Founder & CEO, BitLayerX",
    description:
      "Founded 2025. Digitalisation for businesses still running on paper, memory, and heroic effort.",
    href: "/ventures",
    cta: "See the work",
    image: "/images/ventures/bitlayerx.jpg",
    alt: "Opeyemi T. Ojurongbe, Founder and CEO of BitLayerX Technologies",
  },
  {
    Icon: Landmark,
    name: "Federal Ministry of Works",
    description:
      "Quality control and geotechnics, under the Director. Where standards get enforced when it is inconvenient.",
    href: "/about",
    cta: "The journey",
    image: "/images/insights/editorial.jpg",
    alt: "Opeyemi T. Ojurongbe between decisions",
  },
  {
    Icon: Map,
    name: "GIS Professional, Karnataka",
    description:
      "Certified 2020 by the University of Karnataka and the State Institute of Urban Development, India.",
    href: "/about",
    cta: "Certifications",
    image: "/images/media/lounge.jpg",
    alt: "Opeyemi T. Ojurongbe working between engagements",
    position: "object-[50%_35%]",
  },
];

function ProofCard({ Icon, name, description, href, cta, image, alt, position, featured }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden border border-hairline bg-paper transition-shadow duration-300 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.28)]",
        featured && "lg:col-span-2 lg:flex-row"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-mist",
          featured ? "aspect-4/3 lg:aspect-auto lg:w-1/2 lg:shrink-0" : "aspect-4/3"
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes={featured ? "(min-width: 1024px) 34vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-[1.04]",
            position ?? "object-top"
          )}
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-7", featured && "lg:justify-center lg:p-10")}>
        <Icon aria-hidden="true" className="h-7 w-7 text-gold-ink" />
        <h3
          className={cn(
            "mt-5 font-display text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.01em] text-balance text-ink transition-colors group-hover:text-gold-ink",
            featured && "lg:text-[1.75rem]"
          )}
        >
          {name}
        </h3>
<p className={cn("mt-3 text-sm leading-relaxed text-slate", !featured && "flex-1")}>
          {description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
          {cta}
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

export default function Proof() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Verifiable" title="Awarded, Elected, Appointed" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proof.map((item) => (
            <ProofCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
