// 01 · What he leads now. One card per organisation in its own colour: the
// question a visitor has ("What is BitLayerX?"), the one-line answer, his
// role and a single sentence. Everything else is on the organisation's own
// page, one click away. Content comes from data/organisations.js.

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PillLink from "@/components/ui/PillLink";
import { organisations } from "@/data/organisations";
import OrgMark from "@/components/shared/OrgMark";

export function BrandPanel({ org, index, className = "" }) {
  return (
    <Link
      href={`/ventures/${org.slug}`}
      className={`group relative isolate flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-9 ${className}`}
      style={{ background: org.brand.color, color: org.brand.on }}
    >
      {/* Depth: a soft light in the corner. */}
      <span aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-white/20 blur-3xl" />
      <span className="flex items-start justify-between gap-4">
        <span className="flex items-center gap-3">
          {org.logo && <OrgMark org={org} variant="white" className="size-10" />}
          <span className="rounded-full border border-current/30 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase">
            {org.question}
          </span>
        </span>
        {index != null && (
          <span className="numeric text-xs font-bold opacity-70">{String(index + 1).padStart(2, "0")}</span>
        )}
      </span>
      <span className="mt-16 block">
        <span className="block font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.92] font-black tracking-[-0.05em]">
          {org.short}
        </span>
        <span className="mt-4 block max-w-xs text-lg leading-snug font-semibold opacity-90">{org.oneLiner}</span>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
          {org.role}
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </span>
    </Link>
  );
}

export default function VenturesShowcase() {
  return (
    <section className="bg-paper py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="What he leads now"
          title="Two companies"
          accent="and a movement."
          action={<PillLink href="/ventures">All ventures</PillLink>}
        />

        {/* Subgrid: every panel shares one row and every caption the next,
            so a two-line name never throws the three cards out of line. */}
        <div className="grid gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-y-0">
          {organisations.map((org, i) => (
            <ScrollReveal key={org.slug} delay={i * 0.08} className="grid gap-5 lg:row-span-2 lg:grid-rows-subgrid">
              <BrandPanel org={org} index={i} className="h-full min-h-[22rem]" />
              <div className="px-1">
                <p className="text-[15px] leading-relaxed text-slate">{org.card}</p>
                <p className="mt-3 text-[11px] font-bold tracking-[0.16em] text-slate uppercase">
                  {org.founded ? `Founded ${org.founded}` : org.status}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
