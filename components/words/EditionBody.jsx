// One Words on Marble edition, set as text to be read: a narrow column,
// scripture as gold-ruled pull quotes with the reference beneath, numbered
// points for the practical part, and the closing line set large, the line
// that is "carved". The signature is added here, so editions never carry
// their own greetings or sign-offs.

import { wordsOnMarble } from "@/data/wordsOnMarble";

function Block({ block }) {
  switch (block.type) {
    case "verse":
      return (
        <figure className="my-10 border-l-2 border-gold pl-6 sm:pl-8">
          <blockquote className="font-display text-[clamp(1.25rem,2.4vw,1.6rem)] leading-snug font-semibold tracking-[-0.015em] text-ink">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-[11px] font-bold tracking-[0.2em] text-gold-ink uppercase">{block.ref}</figcaption>
        </figure>
      );
    case "lines":
      return (
        <p className="my-6 text-[19px] leading-[1.7] font-semibold text-ink">
          {block.lines.map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </p>
      );
    case "list":
      return (
        <div className="my-10">
          {block.intro && <p className="text-[19px] leading-[1.8] text-graphite">{block.intro}</p>}
          <ol className="mt-5 divide-y divide-hairline border-y border-hairline">
            {block.items.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-2 py-6">
                <span className="numeric font-display text-3xl leading-none font-black tracking-tight text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-xl leading-tight font-extrabold tracking-[-0.02em] text-ink">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-[17px] leading-relaxed text-graphite">{item.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "close":
      return (
        <p className="mt-14 border-t-2 border-ink pt-8 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] font-black tracking-[-0.035em] text-ink">
          {block.lines.map((l, i) => (
            <span key={i} className={i === block.lines.length - 1 ? "block text-gold-ink" : "block"}>
              {l}
            </span>
          ))}
        </p>
      );
    default:
      return <p className="my-6 text-[19px] leading-[1.8] text-graphite">{block.text}</p>;
  }
}

export default function EditionBody({ edition }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      {edition.body.map((block, i) => (
        <Block key={i} block={block} />
      ))}
      <p className="mt-12 flex items-center gap-3 text-sm font-semibold text-slate">
        <span aria-hidden="true" className="h-px w-8 bg-gold" />
        <span>
          {wordsOnMarble.name} by <span className="text-ink">{wordsOnMarble.author}</span>
        </span>
      </p>
    </div>
  );
}
