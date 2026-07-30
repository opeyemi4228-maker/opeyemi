// Ventures showcase — editorial cards linking into /ventures.
// Driven by data/ventures.js.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { ventures } from "@/data/ventures";

export default function VenturesShowcase() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Ventures"
            title="What I'm Building"
            className="mb-0"
          />
          <Link
            href="/ventures"
            className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-fog transition-colors hover:text-gold"
          >
            All ventures <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ventures.map((venture) => (
            <Link
              key={venture.slug}
              href="/ventures"
              className="group overflow-hidden border border-smoke bg-charcoal"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={venture.image}
                  alt={`${venture.name}, ${venture.role}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                    {venture.role}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-porcelain transition-colors group-hover:text-gold">
                    {venture.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
