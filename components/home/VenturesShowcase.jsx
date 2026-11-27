// 02 · What he leads now: BitLayerX Technologies, answered in one panel.
// The company in its own blue, the one-line answer to "What is BitLayerX?"
// on the left, the four things it does on the right, and a spec line of
// checkable facts beneath. Everything else is on /ventures/bitlayerx.
// Content comes from data/organisations.js.
//
// `BrandPanel` (a compact card in the organisation's colour) is still
// exported for the ventures pages.

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { organisations } from "@/data/organisations";
import OrgMark from "@/components/shared/OrgMark";

export function BrandPanel({ org, index, className = "" }) {
  return (
    <Link
      href={`/ventures/${org.slug}`}
      className={`group relative isolate flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-9 ${className}`}
      style={{ background: org.brand.color, color: org.brand.on }}
    >
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

// The full-width feature: one organisation, given the room to explain itself.
export function OrgFeature({ org }) {
  const facts = [
    { label: "Role", value: org.role },
    org.founded && { label: "Founded", value: org.founded },
    { label: "Base", value: org.base },
  ].filter(Boolean);

  return (
    <>
      <Link
        href={`/ventures/${org.slug}`}
        className="group relative isolate grid overflow-hidden rounded-[28px] p-7 sm:p-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:p-14"
        style={{ background: org.brand.color, color: org.brand.on }}
      >
        {/* Depth: light in one corner, shade in the other. */}
        <span aria-hidden="true" className="absolute -top-40 -left-32 -z-10 size-[34rem] rounded-full bg-white/20 blur-[110px]" />
        <span aria-hidden="true" className="absolute -right-40 -bottom-56 -z-10 size-[36rem] rounded-full bg-black/25 blur-[120px]" />

        {/* ---- The answer ---- */}
        <span className="flex flex-col justify-between gap-14">
          <span className="flex items-center gap-3">
            {org.logo && <OrgMark org={org} variant="white" className="size-11" />}
            <span className="rounded-full border border-current/30 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase">
              {org.question}
            </span>
          </span>

          <span className="block">
            <span className="block font-display text-[clamp(3.25rem,min(12vw,6.5vw+1rem),6.75rem)] leading-[0.85] font-black tracking-[-0.06em]">
              {org.short}
            </span>
            {org.name !== org.short && (
              <span className="mt-3 block text-xs font-bold tracking-[0.32em] uppercase opacity-75">
                {org.name.replace(org.short, "").trim()}
              </span>
            )}
            <span className="mt-8 block max-w-md text-xl leading-snug font-semibold text-balance sm:text-2xl">
              {org.oneLiner}
            </span>
            <span className="mt-10 inline-flex items-center gap-3 text-sm font-bold">
              <span className="grid size-11 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight aria-hidden="true" className="size-4" style={{ color: org.brand.color }} />
              </span>
              Discover {org.short}
            </span>
          </span>
        </span>

        {/* ---- What it does ---- */}
        <span className="mt-12 block lg:mt-0">
          <span className="block text-[11px] font-bold tracking-[0.24em] uppercase opacity-75">What it does</span>
          <span className="mt-5 block">
            {org.offers.map((o, i) => (
              <span
                key={o.title}
                className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 border-t border-current/20 py-5 last:pb-0 sm:py-6"
              >
                <span className="numeric pt-1 text-xs font-bold opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className="block">
                  <span className="block font-display text-lg leading-tight font-extrabold tracking-[-0.02em] sm:text-xl">
                    {o.title}
                  </span>
                  <span className="mt-1.5 block text-[15px] leading-relaxed opacity-80">{o.body}</span>
                </span>
              </span>
            ))}
          </span>
        </span>
      </Link>

      {/* ---- Spec line: facts a stranger can check ---- */}
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 px-1 sm:grid-cols-[repeat(3,auto)_1fr] sm:gap-x-12">
        {facts.map((f) => (
          <div key={f.label} className={f.label === "Base" ? "col-span-2 sm:col-span-1" : undefined}>
            <dt className="text-[10px] font-bold tracking-[0.22em] text-slate uppercase">{f.label}</dt>
            <dd className="mt-1.5 text-[15px] font-semibold text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export default function VenturesShowcase() {
  const [org] = organisations;
  if (!org) return null;
  return (
    <section className="bg-paper py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="02" eyebrow="What he leads" title="What is" accent={`${org.short}?`} />
        <ScrollReveal>
          <OrgFeature org={org} />
        </ScrollReveal>
      </div>
    </section>
  );
}
