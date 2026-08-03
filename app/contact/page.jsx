// Contact. Four different intents arrive here, so each one gets its own
// route rather than being funnelled into a single undifferentiated form.
//
// The email address is visible and clickable at the top, because senior
// visitors generally will not fill in a form, and they are the most
// valuable people this page receives.

import Link from "next/link";
import { Handshake, Mic, Users, Newspaper, Mail, ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/shared/ContactForm";
import SocialLinks from "@/components/shared/SocialLinks";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Contact",
  description:
    "Partnerships, speaking, mentorship, and press enquiries for Opeyemi T. Ojurongbe. Direct email, no gatekeeping.",
};

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
    Icon: Users,
    title: "Mentorship",
    detail: "Young engineers and founders. These messages get answered.",
    action: {
      label: "Email directly",
      href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Mentorship")}`,
      external: true,
    },
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

      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Direct email, given its own weight. */}
          <div className="flex flex-col gap-4 border-y border-smoke py-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-3 text-porcelain transition-colors hover:text-gold"
            >
              <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-gold" />
              <span className="text-lg underline-offset-8 group-hover:underline sm:text-xl">
                {siteConfig.email}
              </span>
            </a>
            <p className="text-sm text-fog">
              Every enquiry is read. Considered replies over fast ones.
            </p>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-[2fr_3fr] lg:gap-20">
            {/* Channels */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-gold">
                What is this about?
              </h2>

              <div className="mt-8 grid gap-px border border-smoke bg-smoke sm:grid-cols-2 lg:grid-cols-1">
                {channels.map(({ Icon, title, detail, action }) => (
                  <div key={title} className="flex flex-col bg-ink p-7">
                    <Icon aria-hidden="true" className="h-6 w-6 text-gold" />
                    <h3 className="mt-4 font-display text-lg text-porcelain">
                      {title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">
                      {detail}
                    </p>
                    {action.external ? (
                      <a
                        href={action.href}
                        className="group mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-porcelain transition-colors hover:text-gold"
                      >
                        {action.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        />
                      </a>
                    ) : (
                      <Link
                        href={action.href}
                        className="group mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-porcelain transition-colors hover:text-gold"
                      >
                        {action.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <p className="text-xs uppercase tracking-[0.3em] text-fog">
                  Elsewhere
                </p>
                <SocialLinks className="mt-5" />
              </div>
            </div>

            {/* Form */}
            <div
              id="enquiry"
              className="scroll-mt-32 border border-smoke bg-charcoal p-7 sm:p-10"
            >
              <h2 className="font-display text-2xl text-porcelain">
                Tell me what we are building.
              </h2>
              <p className="mt-2 mb-8 text-sm leading-relaxed text-fog">
                A few lines is enough to start. This opens your own email app,
                so nothing is stored on this website.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
