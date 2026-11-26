// A gold band of the practice, running. The one place the accent is used
// as a surface rather than a detail, which is what lets it be quiet
// everywhere else.
//
// The phrases repeat what the page already says, so the band is hidden from
// assistive technology rather than read out twice. The track holds two
// identical copies and slides by exactly one, which makes the loop seamless.

const phrases = [
  "Engineer",
  "CEO",
  "Leader",
  "BitLayerX Technologies",
  "Orangé Finance",
  "JETSUP Community",
  "Words on Marble",
  "Registered with the NSE",
];

function Spark() {
  // Four-point star, drawn rather than typed so it sits on the cap height.
  return (
    <svg viewBox="0 0 24 24" className="size-[0.62em] shrink-0" fill="currentColor">
      <path d="M12 0c.8 6.4 4.6 10.9 12 12-7.4 1.1-11.2 5.6-12 12-.8-6.4-4.6-10.9-12-12C7.4 10.9 11.2 6.4 12 0Z" />
    </svg>
  );
}

export default function Marquee() {
  return (
    <section aria-hidden="true" className="marquee-pause overflow-hidden bg-gold py-4 text-ink sm:py-5">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {phrases.map((p) => (
              <li
                key={p}
                className="flex items-center gap-8 pr-8 font-display text-2xl font-extrabold tracking-[-0.03em] whitespace-nowrap sm:gap-10 sm:pr-10 sm:text-4xl"
              >
                {p}
                <Spark />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
