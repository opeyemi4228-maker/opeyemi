// One edition of Words on Marble, set as a tablet: veined marble, a fine
// gold inner frame, the line of the day cut large into the stone, and the
// verses beneath with their references. The engraved look is two hairline
// shadows (light below, dark above), the way a carved letter catches light.

import Marble from "@/components/shared/Marble";
import { wordsOnMarble } from "@/data/wordsOnMarble";

const engraved = "[text-shadow:0_1px_0_rgba(255,255,255,0.9),0_-1px_0_rgba(0,0,0,0.14)]";

export default function EditionTablet({ edition = wordsOnMarble.editions[0], seed = 11, className = "", showGreeting = true }) {
  return (
    <Marble
      seed={seed}
      className={`relative isolate overflow-hidden rounded-[28px] p-7 text-ink shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] sm:p-10 lg:p-12 ${className}`}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[20px] border border-gold/50 sm:inset-4" />

      <figure className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-bold tracking-[0.24em] uppercase">
          <span className="text-gold-ink">{wordsOnMarble.name}</span>
          <span className="text-slate">{edition.title}</span>
        </div>

        {showGreeting && (
          <p className="mt-8 text-sm text-graphite">
            {edition.greeting}
            <br />
            {edition.opening}
          </p>
        )}

        <blockquote className="mt-8">
          <p
            className={`font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.025em] text-balance text-ink/90 ${engraved}`}
          >
            {edition.lead}
          </p>
        </blockquote>

        <ul className="mt-8 space-y-4 border-t border-ink/10 pt-6">
          {edition.verses.map((v) => (
            <li key={v.ref} className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
              <span className="text-[15px] leading-relaxed text-graphite">&ldquo;{v.text}&rdquo;</span>
              <span className="text-[11px] font-bold tracking-[0.16em] text-gold-ink uppercase">{v.ref}</span>
            </li>
          ))}
        </ul>

        <figcaption className="mt-8 flex items-center gap-3 text-xs font-semibold text-slate">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          {wordsOnMarble.name} by <span className="text-ink">{wordsOnMarble.author}</span>
        </figcaption>
      </figure>
    </Marble>
  );
}
