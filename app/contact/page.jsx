// Contact — enquiry form (speaking, partnership, mentorship, press) +
// direct channels. Structure: PageHeader → split layout (channels | form).

import { Handshake, Mic, Users, Newspaper, Mail } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/shared/ContactForm";
import SocialLinks from "@/components/shared/SocialLinks";
import { siteConfig } from "@/data/site";

export const metadata = { title: "Contact" };

const channels = [
  {
    Icon: Handshake,
    title: "Partnership",
    detail: "Digitalisation projects, product builds, and ventures.",
  },
  {
    Icon: Mic,
    title: "Speaking",
    detail: "Engineering, entrepreneurship, and leadership platforms.",
  },
  {
    Icon: Users,
    title: "Mentorship",
    detail: "Young engineers and founders, rooms open here first.",
  },
  {
    Icon: Newspaper,
    title: "Press",
    detail: "Interviews, features, and media enquiries.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a Conversation"
        description="A product to launch, a partnership to forge, a community to grow, the door is open."
      />

      <section className="bg-ink pb-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Channels */}
          <div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-3 text-porcelain transition-colors hover:text-gold"
            >
              <Mail className="h-5 w-5 text-gold" />
              <span className="text-lg underline-offset-8 group-hover:underline">
                {siteConfig.email}
              </span>
            </a>
            <p className="mt-3 text-sm text-fog">
              Every enquiry is read. Considered replies over fast ones.
            </p>

            <div className="mt-12 grid gap-px border border-smoke bg-smoke sm:grid-cols-2">
              {channels.map(({ Icon, title, detail }) => (
                <div key={title} className="bg-ink p-7">
                  <Icon className="h-6 w-6 text-gold" />
                  <h2 className="mt-4 font-display text-lg text-porcelain">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fog">
                    {detail}
                  </p>
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
          <div className="border border-smoke bg-charcoal p-7 sm:p-10">
            <h2 className="font-display text-2xl text-porcelain">
              Tell me what we&apos;re building.
            </h2>
            <p className="mt-2 mb-8 text-sm text-fog">
              A few lines is enough to start.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
