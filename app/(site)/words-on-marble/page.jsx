// Words on Marble, explained and read on the page itself: the latest
// edition in full, as text; what Words on Marble is, in the questions a new
// reader asks; every edition so far; where the videos and posts are; and
// how to receive it (email or WhatsApp).
// Content lives in data/wordsOnMarble.js; social links in data/site.js.

import { FaYoutube, FaInstagram, FaTiktok, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading, { SectionLabel } from "@/components/shared/SectionHeading";
import Newsletter from "@/components/shared/Newsletter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PillLink from "@/components/ui/PillLink";
import CTA from "@/components/home/CTA";
import EditionBody from "@/components/words/EditionBody";
import EditionList from "@/components/words/EditionList";
import { wordsOnMarble, editionDate, editionRefs, whatsappHref } from "@/data/wordsOnMarble";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Words on Marble",
  description:
    "Words on Marble is Opeyemi T. Ojurongbe's twice-weekly note on excellence, faith, wisdom and work: one principle, grounded in scripture, delivered by email and WhatsApp, with videos and posts on YouTube, Instagram, TikTok and LinkedIn.",
  path: "/words-on-marble",
});

const platformMeta = {
  youtube: { label: "YouTube", Icon: FaYoutube, what: "Videos" },
  instagram: { label: "Instagram", Icon: FaInstagram, what: "Reels and posts" },
  tiktok: { label: "TikTok", Icon: FaTiktok, what: "Short videos" },
  linkedin: { label: "LinkedIn", Icon: FaLinkedinIn, what: "Posts and videos" },
};

export default function WordsOnMarblePage() {
  const [latest, ...earlier] = wordsOnMarble.editions;
  const platforms = wordsOnMarble.platforms.map((key) => ({
    key,
    ...platformMeta[key],
    url: siteConfig.socials[key] || "",
  }));

  return (
    <>
      <PageHeader
        eyebrow={`${wordsOnMarble.cadence} · by ${wordsOnMarble.author}`}
        title="Words on Marble"
        description={wordsOnMarble.summary}
        facts={[
          { label: "How often", value: wordsOnMarble.cadence },
          { label: "Each edition", value: "One principle, about a minute" },
          { label: "Delivered by", value: "Email & WhatsApp" },
          { label: "Also on", value: "YouTube · Instagram · TikTok · LinkedIn" },
        ]}
      />

      {/* ---- 01 The latest edition, in full ---- */}
      <section className="bg-paper pb-16 sm:pb-20 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:px-8">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel index="01">Latest edition</SectionLabel>
            <dl className="mt-8 hidden space-y-5 lg:block">
              {editionDate(latest) && (
                <div>
                  <dt className="text-[10px] font-bold tracking-[0.22em] text-slate uppercase">Published</dt>
                  <dd className="mt-1.5 text-[15px] font-semibold text-ink">{editionDate(latest)}</dd>
                </div>
              )}
              <div>
                <dt className="text-[10px] font-bold tracking-[0.22em] text-slate uppercase">Scripture</dt>
                <dd className="mt-1.5 space-y-1 text-[15px] font-semibold text-ink">
                  {editionRefs(latest).map((r) => (
                    <span key={r} className="block">
                      {r}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="mt-10 hidden flex-col items-start gap-4 lg:flex">
              <PillLink href="#subscribe" tone="gold">
                Receive it twice a week
              </PillLink>
              <a
                href={whatsappHref()}
                {...(wordsOnMarble.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-sm font-semibold text-ink transition-colors hover:border-gold-ink hover:text-gold-ink"
              >
                <FaWhatsapp aria-hidden="true" className="size-4 text-[#25D366]" />
                Or join on WhatsApp
              </a>
            </div>
          </aside>

          <article className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.2em] text-gold-ink uppercase lg:hidden">
              {[editionDate(latest), ...editionRefs(latest)].filter(Boolean).join(" · ")}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.98] font-black tracking-[-0.045em] text-ink lg:mt-0">
              {latest.title}
            </h2>
            <div className="mt-10">
              <EditionBody edition={latest} />
            </div>
            <div className="mt-10 flex flex-wrap gap-3 lg:hidden">
              <PillLink href="#subscribe" tone="gold">
                Receive it twice a week
              </PillLink>
            </div>
          </article>
        </div>
      </section>

      {/* ---- 02 What it is ---- */}
      <section className="border-y border-hairline bg-alabaster py-16 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:px-8">
          <div>
            <SectionLabel index="02">About Words on Marble</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-ink">
              What it is, <span className="text-gold-ink">and why.</span>
            </h2>
          </div>
          <dl className="divide-y divide-hairline border-y border-hairline">
            {wordsOnMarble.faq.map((item, i) => (
              <ScrollReveal key={item.q} delay={i * 0.04}>
                <div className="grid gap-2 py-7 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
                  <dt className="font-display text-lg leading-snug font-extrabold tracking-[-0.02em] text-ink">{item.q}</dt>
                  <dd className="text-[16px] leading-relaxed text-graphite">{item.a}</dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- 03 Every edition ---- */}
      {earlier.length > 0 && (
        <section className="bg-paper py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading index="03" eyebrow="The archive" title="Earlier" accent="editions." />
            <EditionList editions={earlier} />
          </div>
        </section>
      )}

      {/* ---- 04 Videos and posts ---- */}
      <section className={`bg-paper pb-16 sm:pb-20 ${earlier.length > 0 ? "" : "pt-16 sm:pt-20"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="04"
            eyebrow="Videos and posts"
            title="The same ideas,"
            accent="spoken."
            intro="Each principle is also published as a short video and a post, so it reaches you wherever you are."
          />
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline grid-cols-2 lg:grid-cols-4">
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
                    <a href={url} target="_blank" rel="noopener noreferrer" className="group block p-6 transition-colors hover:bg-alabaster sm:p-7">
                      {body}
                    </a>
                  ) : (
                    <div className="group block p-6 sm:p-7">{body}</div>
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
        tone="light"
        showEmail={false}
      />
    </>
  );
}

