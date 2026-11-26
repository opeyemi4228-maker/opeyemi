// 03 · What is Words on Marble? Answered on black, so the marble tablet of
// the latest edition sits on the page like a stone under a spotlight. The
// left column says what it is, how often, and in which forms; the two ways
// to receive it sit right there.

import { FaWhatsapp } from "react-icons/fa6";
import { SectionLabel } from "@/components/shared/SectionHeading";
import SplitReveal from "@/components/ui/SplitReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PillLink from "@/components/ui/PillLink";
import EditionTablet from "@/components/shared/EditionTablet";
import { wordsOnMarble, whatsappHref } from "@/data/wordsOnMarble";

export default function WordsOnMarbleFeature() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-porcelain sm:py-16 md:py-20">
      <div aria-hidden="true" className="absolute top-1/3 -right-40 -z-10 size-160 rounded-full bg-gold/15 blur-[140px]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionLabel index="02" tone="dark">
            What is Words on Marble?
          </SectionLabel>
          <SplitReveal className="mt-6 font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            Words worth
            <br />
            <span className="text-gold">carving.</span>
          </SplitReveal>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-porcelain/75">
            {wordsOnMarble.summary}
          </p>


          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <PillLink href="/words-on-marble#subscribe" tone="gold" size="lg">
              Subscribe
            </PillLink>
            <a
              href={whatsappHref()}
              {...(wordsOnMarble.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 border-b border-porcelain/30 pb-1 text-sm font-semibold text-porcelain transition-colors hover:border-gold hover:text-gold"
            >
              <FaWhatsapp aria-hidden="true" className="size-4 text-[#25D366]" />
              Or join on WhatsApp
            </a>
          </div>
        </div>

        <ScrollReveal delay={0.1}>
          <EditionTablet showGreeting={false} />
        </ScrollReveal>
      </div>
    </section>
  );
}
