// Speaker kit. Everything an event organiser needs, on one page, without
// having to ask: bios at three lengths, downloadable photography, topics,
// platforms held, technical requirements, and a direct email address.

import Image from "next/image";
import { Download, Mail } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import CopyButton from "@/components/shared/CopyButton";
import { siteConfig } from "@/data/site";
import { bios, topics, photos, platforms, requirements } from "@/data/speaking";

export const metadata = {
  title: "Speaker Kit",
  description:
    "Bios, photography, speaking topics, and booking details for Opeyemi T. Ojurongbe, design engineer and registered mining engineer.",
};

const facts = [
  { label: "Name", value: siteConfig.name },
  { label: "Title", value: "Founder & CEO, BitLayerX Technologies" },
  { label: "Credential", value: "Registered Mining Engineer (NSE)" },
  { label: "Based in", value: siteConfig.location },
];

export default function SpeakingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Speaker Kit"
        title="Everything You Need to Book Me"
        description="Bios, photographs, topics, and a direct email. Take what you need; no request necessary."
      />

      {/* Fast facts */}
      <section className="bg-paper pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <dl className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-paper p-7">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate">
                  {fact.label}
                </dt>
                <dd className="mt-2.5 text-[15px] text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Speaking enquiry")}`}
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold-ink"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            {siteConfig.email}
          </a>
        </div>
      </section>

      {/* Bios */}
      <section className="border-y border-hairline bg-alabaster py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Bios" title="Three Lengths, Ready to Paste" />
          <div className="space-y-6">
            {bios.map((bio) => (
              <article
                key={bio.length}
                className="border border-hairline bg-paper p-7 sm:p-9"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl text-ink">
                      {bio.length}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                      {bio.words}
                    </span>
                  </div>
                  <CopyButton text={bio.text} label={`Copy ${bio.length.toLowerCase()}`} />
                </div>
                <p className="mt-5 leading-[1.8] text-slate">{bio.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Photography */}
      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Photography"
            title="Download and Use Freely"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {photos.map((photo) => (
              <figure key={photo.src} className="border border-hairline bg-paper">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-mist">
                  <Image
                    src={photo.src}
                    alt={`${photo.label} of ${siteConfig.name}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="flex flex-wrap items-center justify-between gap-4 p-6">
                  <div>
                    <p className="text-sm font-medium text-ink">{photo.label}</p>
                    <p className="mt-1 text-xs text-slate">{photo.note}</p>
                  </div>
                  <a
                    href={photo.src}
                    download
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <Download aria-hidden="true" className="h-3.5 w-3.5" />
                    Download
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="border-y border-hairline bg-alabaster py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Topics" title="What I Speak About" />
          <div className="grid gap-6 lg:grid-cols-3">
            {topics.map((topic, i) => (
              <article
                key={topic.title}
                className="border border-hairline bg-paper p-8"
              >
                <span className="font-display text-3xl font-light text-gold-ink/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl text-ink">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm text-gold-ink">{topic.subtitle}</p>
                <ul className="mt-6 space-y-3">
                  {topic.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-slate"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-ink"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms + requirements */}
      <section className="bg-paper py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Platforms" title="Where I Have Led" />
            <ul className="space-y-6">
              {platforms.map((p) => (
                <li key={p.org} className="border-l-2 border-gold pl-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-ink">
                    {p.year}
                  </p>
                  <p className="mt-2 text-ink">{p.role}</p>
                  <p className="mt-1 text-sm text-slate">{p.org}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Technical" title="Requirements" />
            <ul className="space-y-4">
              {requirements.map((req) => (
                <li
                  key={req}
                  className="flex gap-3 border-b border-hairline pb-4 text-sm text-slate"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-ink"
                  />
                  {req}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-slate">
              Travelling from {siteConfig.location}. Remote and in person both
              work. For availability, write to{" "}
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Speaking enquiry")}`}
                className="text-ink underline underline-offset-4 transition-colors hover:text-gold-ink"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
