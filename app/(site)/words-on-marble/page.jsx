// Words on Marble: what it is, the latest edition, the three forms it
// takes, where to find it, and how to receive it (email or WhatsApp).
// Content lives in data/wordsOnMarble.js; social links in data/site.js.

import { FaYoutube, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa6";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading, { SectionLabel } from "@/components/shared/SectionHeading";
import EditionTablet from "@/components/shared/EditionTablet";
import Newsletter from "@/components/shared/Newsletter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTA from "@/components/home/CTA";
import { wordsOnMarble } from "@/data/wordsOnMarble";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Words on Marble",
  description:
    "Words on Marble is Opeyemi T. Ojurongbe's twice-weekly note on excellence, competence, wisdom and work: a newsletter by email and WhatsApp, with videos and posts on YouTube, Instagram, TikTok and LinkedIn.",
  path: "/words-on-marble",
});

const platformMeta = {
  youtube: { label: "YouTube", Icon: FaYoutube, what: "Videos" },
  instagram: { label: "Instagram", Icon: FaInstagram, what: "Reels and posts" },
  tiktok: { label: "TikTok", Icon: FaTiktok, what: "Short videos" },
  linkedin: { label: "LinkedIn", Icon: FaLinkedinIn, what: "Posts and videos" },
};

export default function WordsOnMarblePage() {
  const platforms = wordsOnMarble.platforms.map((key) => ({
    key,
    ...platformMeta[key],
    url: siteConfig.socials[key] || "",
  }));

  return (
    <>
      <PageHeader
        eyebrow={`Newsletter · ${wordsOnMarble.cadence}`}
        title="Words on Marble"
        description={wordsOnMarble.summary}
        facts={[
          { label: "How often", value: wordsOnMarble.cadence },
          { label: "Forms", value: "Newsletter · Videos · Posts" },
          { label: "Delivered by", value: "Email & WhatsApp" },
          { label: "Written by", value: wordsOnMarble.author },
        ]}
      />

      {/* ---- The latest edition ---- */}
      <section className="bg-paper pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <SectionLabel index="01">Why marble</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-ink">
              Words worth <span className="text-gold-ink">carving.</span>
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-graphite">{wordsOnMarble.why}</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate">
              Here is a recent edition.
            </p>
          </div>
          <ScrollReveal>
            <EditionTablet />
          </ScrollReveal>
        </div>
      </section>

      {/* ---- Three forms ---- */}
      <section className="border-y border-hairline bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading index="02" eyebrow="Three forms" title="One idea," accent="three ways in." />
          <div className="grid gap-5 md:grid-cols-3">
            {wordsOnMarble.formats.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.07} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-hairline bg-paper p-7">
                  <span className="numeric font-display text-5xl leading-none font-extralight tracking-tighter text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 font-display text-xl font-extrabold tracking-[-0.02em] text-ink">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{f.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Where to find it ---- */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="03"
            eyebrow="On every platform"
            title="Videos and posts,"
            accent="everywhere you are."
            intro="The newsletter arrives in your inbox or on WhatsApp. The videos and posts go out across every social platform."
          />
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map(({ key, label, Icon, what, url }) => {
              const body = (
                <>
                  <span className="grid size-12 place-items-center rounded-full bg-ink text-porcelain transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="mt-6 block font-display text-lg font-extrabold text-ink">{label}</span>
                  <span className="mt-1 block text-sm text-slate">{what}</span>
                </>
              );
              return (
                <li key={key} className="bg-paper">
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="group block p-7 transition-colors hover:bg-alabaster">
                      {body}
                    </a>
                  ) : (
                    <div className="group block p-7">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---- Subscribe ---- */}
      <section id="subscribe" className="scroll-mt-24 bg-paper px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-304">
          <Newsletter />
        </div>
      </section>

      <CTA
        title="Share a word,"
        accent="or start a conversation."
        body="Write in with a question for a future edition, a story of excellence worth telling, or an invitation to speak."
        primary={{ label: "Write to Opeyemi", href: "/contact" }}
        secondary={{ label: "Who is Opeyemi?", href: "/about" }}
      />
    </>
  );
}
