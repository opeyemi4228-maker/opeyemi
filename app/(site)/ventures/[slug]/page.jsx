// One page per organisation he leads: /ventures/bitlayerx,
// /ventures/orange-finance, /ventures/jetsup. Each answers, in order:
//   What is it?       the name, the one-line answer, the plain summary
//   What does it do?  four things, in its own colour
//   Why does it exist? the reason, set large on black
//   Where does it stand? status, and (where it applies) the promise
//   What is his role?  beside his portrait
// then the other two organisations, and the closing panel.
//
// Everything is read from data/organisations.js, itself drawn from each
// organisation's own documents.

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionHeading";
import SplitReveal from "@/components/ui/SplitReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ImageReveal from "@/components/ui/ImageReveal";
import PillLink from "@/components/ui/PillLink";
import CTA from "@/components/home/CTA";
import { BrandPanel } from "@/components/home/VenturesShowcase";
import { organisations, organisationBySlug } from "@/data/organisations";
import { pageMetadata } from "@/lib/seo";
import OrgMark from "@/components/shared/OrgMark";

export function generateStaticParams() {
  return organisations.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const org = organisationBySlug(slug);
  if (!org) return {};
  return pageMetadata({
    title: org.name,
    description: `${org.summary} Led by Opeyemi T. Ojurongbe, ${org.role}.`,
    path: `/ventures/${org.slug}`,
  });
}

export default async function OrganisationPage({ params }) {
  const { slug } = await params;
  const org = organisationBySlug(slug);
  if (!org) notFound();
  const others = organisations.filter((o) => o.slug !== org.slug);

  const facts = [
    { label: "Opeyemi's role", value: org.role },
    { label: "Founded", value: org.founded || "—" },
    { label: "Base", value: org.base },
    { label: "Status", value: org.status },
  ];

  return (
    <>
      {/* ---- What is it? ---- */}
      <section className="bg-paper px-4 pt-28 sm:px-6 md:pt-36 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-304">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate">
            <Link href="/ventures" className="hover:text-ink">
              Ventures
            </Link>
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <span className="text-ink" aria-current="page">
              {org.short}
            </span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
            <div>
              {org.logo && <OrgMark org={org} className="mb-6 size-16" />}
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ background: org.brand.color }} />
                <p className="text-[11px] font-semibold tracking-[0.26em] text-slate uppercase">{org.question}</p>
              </div>
              <SplitReveal
                as="h1"
                immediate
                delay={0.1}
                className="mt-6 font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] font-black tracking-[-0.05em] text-balance text-ink"
              >
                {org.name}
              </SplitReveal>
              <p className="mt-6 max-w-2xl font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-tight font-bold tracking-[-0.02em] text-graphite">
                {org.oneLiner}
              </p>
            </div>
            <p className="text-[17px] leading-relaxed text-slate lg:pb-2">{org.summary}</p>
          </div>
        </div>

        <dl className="mx-auto mt-10 grid max-w-304 border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={[
                "border-hairline py-5 sm:px-6",
                i > 0 ? "border-t sm:border-t-0" : "",
                i % 2 === 1 ? "sm:border-l" : "",
                i >= 2 ? "sm:border-t lg:border-t-0" : "",
                i === 2 ? "lg:border-l" : "",
                i % 2 === 0 ? "sm:pl-0" : "",
                i === 2 ? "lg:pl-6" : "",
              ].join(" ")}
            >
              <dt className="text-[10px] font-semibold tracking-[0.24em] text-slate uppercase">{f.label}</dt>
              <dd className="mt-2 text-[15px] font-semibold text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---- What does it do? ---- */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="01">What it does</SectionLabel>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {org.offers.map((o, i) => (
              <ScrollReveal key={o.title} delay={i * 0.07} className="h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-paper p-7">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: org.brand.color }} />
                  <span className="numeric text-xs font-bold" style={{ color: org.brand.ink }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-8 font-display text-xl font-extrabold tracking-[-0.02em] text-ink">{o.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{o.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Why does it exist? ---- */}
      <section className="bg-paper px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="relative isolate mx-auto max-w-304 overflow-hidden rounded-[28px] bg-ink px-6 py-14 text-porcelain sm:px-12 sm:py-20 lg:px-16">
          <span
            aria-hidden="true"
            className="absolute -top-40 -right-40 -z-10 size-120 rounded-full blur-[120px]"
            style={{ background: org.brand.color, opacity: 0.35 }}
          />
          <SectionLabel index="02" tone="dark">
            Why it exists
          </SectionLabel>
          <p className="mt-8 max-w-4xl font-display text-[clamp(1.7rem,3.6vw,3rem)] leading-[1.1] font-bold tracking-[-0.03em] text-balance">
            {org.why}
          </p>
          {(org.promise || org.statusNote) && (
            <div className="mt-10 grid gap-6 border-t border-porcelain/10 pt-8 md:grid-cols-2">
              {org.statusNote && (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">Where it stands</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-fog">{org.statusNote}</p>
                </div>
              )}
              {org.promise && (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">The promise</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-fog">{org.promise}</p>
                </div>
              )}
              {org.heritage && (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">Heritage</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-fog">{org.heritage}</p>
                </div>
              )}
            </div>
          )}
        </ScrollReveal>
      </section>

      {/* ---- His role ---- */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:px-8">
          <div className="relative">
            <ImageReveal className="aspect-4/5 rounded-[28px] bg-mist">
              <Image src={org.image} alt={org.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_18%]" />
            </ImageReveal>
            <span
              className="absolute bottom-4 left-4 rounded-full px-4 py-2 text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{ background: org.brand.color, color: org.brand.on }}
            >
              {org.role}
            </span>
          </div>
          <div>
            <SectionLabel index="03">Opeyemi&apos;s role</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em] text-ink">
              {org.role}
              <span className="text-gold-ink">.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">{org.leadership}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href="/about">Who is Opeyemi?</PillLink>
              {org.url ? (
                <PillLink href={org.url} tone="outline" target="_blank" rel="noopener noreferrer">
                  Visit {org.short}
                </PillLink>
              ) : (
                <PillLink href="/contact" tone="outline">
                  Enquire about {org.short}
                </PillLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---- The others ---- */}
      <section className="border-t border-hairline bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel index="04">Also led by Opeyemi</SectionLabel>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((o) => (
              <BrandPanel key={o.slug} org={o} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={`Work with`}
        accent={`${org.short}.`}
        body={`For partnerships, enquiries and introductions to ${org.name}, write directly. Every message is read personally.`}
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "All ventures", href: "/ventures" }}
      />
    </>
  );
}
