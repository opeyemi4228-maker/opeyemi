// Contact. Four different intents arrive here, so each one gets its own
// route rather than being funnelled into a single undifferentiated form.
//
// The email address is visible and clickable at the top, because senior
// visitors generally will not fill in a form, and they are the most
// valuable people this page receives.

import Link from "next/link";
import { Handshake, Mic, Landmark, Newspaper, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { SectionLabel } from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/shared/ContactForm";
import SocialLinks from "@/components/shared/SocialLinks";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Partnerships, speaking, and press enquiries for Opeyemi T. Ojurongbe, CEO of BitLayerX Technologies and Orangé Finance. Direct email, no gatekeeping.",
  path: "/contact",
});

const channels = [
  {
    Icon: Handshake,
    title: "Partnership",
    detail: "Digitalisation projects, product builds, and ventures.",
    action: { label: "Use the form", href: "#enquiry" },
  },
  {
    Icon: Mic,
    title: "Speaking",
    detail: "Bios, photography, and topics are ready to download now.",
    action: { label: "Open the speaker kit", href: "/speaking" },
  },
  {
    Icon: Landmark,
    title: "Finance",
    detail: "Orangé Finance, and finance engineering for organisations that need their money to be as well built as their systems.",
    action: { label: "Use the form", href: "#enquiry" },
  },
  {
    Icon: Newspaper,
    title: "Press",
    detail: "Interviews and features. Assets and bios are on the kit page.",
    action: { label: "Press assets", href: "/speaking" },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a Conversation"
        description="A product to launch. A partnership to explore. A team that needs a second opinion. The door is open, and a conversation costs nothing."
      />

      {/* ---- Direct line ---- */}
      <section className="bg-paper px-4 pb-16 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-304">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group relative isolate flex flex-col gap-8 overflow-hidden rounded-[28px] bg-ink p-8 text-porcelain sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16"
          >
            <div aria-hidden="true" className="absolute -right-40 -bottom-56 -z-10 size-144 rounded-full bg-gold/25 blur-[120px]" />
            <div className="min-w-0">
              <SectionLabel tone="dark">The direct line</SectionLabel>
              <p className="mt-6 font-display text-[clamp(1.15rem,5vw,3.75rem)] leading-[1.05] font-extrabold tracking-[-0.04em] break-all sm:break-normal transition-colors group-hover:text-gold">
                {siteConfig.email}
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fog">
                Every enquiry is read personally. Considered replies over fast ones.
              </p>
            </div>
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-gold text-ink sm:size-20">
              <ArrowUpRight aria-hidden="true" className="size-7 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </a>
        </ScrollReveal>
      </section>

      <section className="border-t border-hairline bg-alabaster py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8">
          {/* ---- Channels ---- */}
          <div>
            <SectionLabel index="01">What is this about?</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em] text-ink">
              Four doors. <span className="text-gold-ink">One standard.</span>
            </h2>

            <div className="mt-10 space-y-4">
              {channels.map(({ Icon, title, detail, action }, i) => (
                <ScrollReveal key={title} delay={i * 0.06} y={16}>
                  <Link
                    href={action.href}
                    className="group flex items-start gap-5 rounded-3xl border border-hairline bg-paper p-6 transition-[box-shadow,border-color] duration-300 hover:border-ink/20 hover:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.3)]"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-gold">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-4">
                        <span className="font-display text-lg font-bold tracking-[-0.01em] text-ink">{title}</span>
                        <span className="numeric text-[11px] font-bold text-slate">{String(i + 1).padStart(2, "0")}</span>
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-slate">{detail}</span>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-ink">
                        {action.label}
                        <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
                      </span>
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate">Elsewhere</p>
              <SocialLinks className="mt-4" />
            </div>
          </div>

          {/* ---- Form ---- */}
          <ScrollReveal delay={0.1}>
            <div id="enquiry" className="scroll-mt-28 rounded-[28px] border border-hairline bg-paper p-7 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12">
              <SectionLabel index="02">The enquiry</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-ink">
                Tell me what we are building.
              </h2>
              <p className="mt-3 mb-10 text-sm leading-relaxed text-slate">
                A few lines is enough to start. Your message comes straight to me, and is used for
                nothing else.{" "}
                <Link href="/privacy" className="font-semibold text-ink underline underline-offset-4 hover:text-gold-ink">
                  How it is handled
                </Link>
                .
              </p>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
