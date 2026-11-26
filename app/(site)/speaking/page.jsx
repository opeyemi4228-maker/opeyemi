// Speaker kit. Everything an event organiser needs, on one page, without
// having to ask: bios at three lengths, downloadable photography, topics,
// platforms held, technical requirements, and a direct email address.

import Image from "next/image";
import { Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PillLink from "@/components/ui/PillLink";
import CTA from "@/components/home/CTA";
import CopyButton from "@/components/shared/CopyButton";
import { siteConfig } from "@/data/site";
import { bios, topics, photos, platforms, requirements } from "@/data/speaking";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Speaker Kit",
  description:
    "Bios, photography, speaking topics, and booking details for Opeyemi T. Ojurongbe, mining engineer, design engineer and finance engineer.",
  path: "/speaking",
});

const facts = [
  { label: "Name", value: siteConfig.name },
  { label: "Title", value: "CEO, BitLayerX Technologies · CEO, Orangé Finance" },
  { label: "Credential", value: "Registered Mining Engineer (NSE)" },
  { label: "Based in", value: siteConfig.location },
];

export default function SpeakingPage() {
  const mail = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Speaking enquiry")}`;

  return (
    <>
      <PageHeader
        eyebrow="Speaker Kit"
        title="Everything You Need to Book Me"
        description="Bios, photographs, topics, and a direct email. Take what you need; no request necessary."
        facts={facts}
      />

      <section className="bg-paper px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-304 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[15px] leading-relaxed text-slate">
            For availability, write directly with the date, the audience and the brief.
          </p>
          <PillLink href={mail} size="lg">
            Book a talk
          </PillLink>
        </div>
      </section>

      {/* ---- 01 Bios ---- */}
      <section className="border-t border-hairline bg-alabaster py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="01"
            eyebrow="Bios"
            title="Three lengths,"
            accent="ready to paste."
            intro="For programmes, introductions and websites. Copy with one click."
          />
          <div className="space-y-5">
            {bios.map((bio, i) => (
              <ScrollReveal key={bio.length} delay={i * 0.06}>
                <article className="rounded-3xl border border-hairline bg-paper p-7 sm:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-baseline gap-4">
                      <h3 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink">{bio.length}</h3>
                      <span className="rounded-full bg-alabaster px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-ink">
                        {bio.words}
                      </span>
                    </div>
                    <CopyButton text={bio.text} label={`Copy ${bio.length.toLowerCase()}`} />
                  </div>
                  <p className="mt-6 max-w-4xl leading-[1.85] text-graphite">{bio.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 02 Photography ---- */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="02"
            eyebrow="Photography"
            title="Download and"
            accent="use freely."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {photos.map((photo, i) => (
              <ScrollReveal key={photo.src} delay={i * 0.08}>
                <figure className="group">
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-[28px] bg-mist">
                    <Image
                      src={photo.src}
                      alt={`${photo.label} of ${siteConfig.name}`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="flex flex-wrap items-center justify-between gap-4 px-1 pt-5">
                    <div>
                      <p className="font-display text-lg font-bold tracking-[-0.01em] text-ink">{photo.label}</p>
                      <p className="mt-1 text-sm text-slate">{photo.note}</p>
                    </div>
                    <a
                      href={photo.src}
                      download
                      className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-graphite"
                    >
                      <Download aria-hidden="true" className="size-4" />
                      Download
                    </a>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 03 Topics ---- */}
      <section className="bg-ink py-20 text-porcelain md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="03"
            eyebrow="Topics"
            tone="dark"
            title="What I"
            accent="speak about."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {topics.map((topic, i) => (
              <ScrollReveal key={topic.title} delay={i * 0.08} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-porcelain/10 bg-smoke p-8">
                  <span className="numeric font-display text-6xl leading-none font-extralight tracking-tighter text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 font-display text-2xl leading-tight font-bold tracking-[-0.02em]">{topic.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-gold">{topic.subtitle}</p>
                  <ul className="mt-6 space-y-3 border-t border-porcelain/10 pt-6">
                    {topic.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-fog">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 04 Platforms + 05 Requirements ---- */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <SectionHeading index="04" eyebrow="Platforms" title="Where I" accent="have led." className="mb-10" />
            <ol className="border-t border-hairline">
              {platforms.map((p) => (
                <li key={p.org} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-hairline py-5">
                  <p className="numeric font-display text-2xl font-extralight tracking-[-0.03em] text-gold-ink">{p.year}</p>
                  <div>
                    <p className="font-semibold text-ink">{p.role}</p>
                    <p className="mt-1 text-sm text-slate">{p.org}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading index="05" eyebrow="Technical" title="Requirements" className="mb-10" />
            <ul className="border-t border-hairline">
              {requirements.map((req) => (
                <li key={req} className="flex gap-4 border-b border-hairline py-5 text-[15px] text-graphite">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {req}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-slate">
              Travelling from {siteConfig.location}. Remote and in person both work.
            </p>
          </div>
        </div>
      </section>

      <CTA
        title="Bring the standard"
        accent="to your stage."
        body="Conferences, campuses, boardrooms and panels. Write with the date, the audience and the brief."
        primary={{ label: "Book a talk", href: mail }}
        secondary={{ label: "Other enquiries", href: "/contact" }}
      />
    </>
  );
}
