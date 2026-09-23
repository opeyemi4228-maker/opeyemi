// Ventures showcase — editorial tiles linking into /ventures.
//
// Image above, type below, no card chrome. Holding the picture and the
// caption in one uninterrupted column is what makes a page of tiles read as
// a magazine spread rather than a dashboard.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { ventures } from "@/data/ventures";

export default function VenturesShowcase() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Ventures"
            title="What I'm Building"
            className="mb-0"
          />
          <Link
            href="/ventures"
            className="group mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:text-gold-ink"
          >
            All ventures
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {ventures.map((venture) => (
            <Link key={venture.slug} href="/ventures" className="group block">
              <div className="relative aspect-4/5 overflow-hidden bg-mist">
                <Image
                  src={venture.image}
                  alt={`${venture.name}, ${venture.role}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 border-t-2 border-ink pt-4">
                <p className="text-[10px] font-semibold uppercase leading-[1.5] tracking-[0.24em] text-gold-ink lg:min-h-[3em]">
                  {venture.role}
                </p>
                <h3 className="mt-2.5 font-display text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink transition-colors group-hover:text-gold-ink">
                  {venture.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
