// Shared shell for the legal pages, so the three of them stay consistent
// and each page is only its content. Set like a well-kept document: a
// sticky table of contents beside numbered clauses, so a reader can find
// the one paragraph they came for.

import PageHeader from "@/components/shared/PageHeader";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function LegalPage({ eyebrow, title, description, updated, sections }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      <section className="bg-paper pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20 lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="inline-flex rounded-full bg-alabaster px-4 py-2 text-[10px] font-bold whitespace-nowrap uppercase tracking-[0.12em] text-gold-ink">
              Last updated {updated}
            </p>
            <nav aria-label="On this page" className="mt-8 hidden lg:block">
              <ol className="space-y-3 border-l border-hairline">
                {sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slug(section.heading)}`}
                      className="-ml-px flex gap-3 border-l-2 border-transparent pl-4 text-sm text-slate transition-colors hover:border-gold hover:text-ink"
                    >
                      <span className="numeric font-bold text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="max-w-3xl divide-y divide-hairline">
            {sections.map((section, i) => (
              <article key={section.heading} id={slug(section.heading)} className="py-10 first:pt-0">
                <h2 className="flex items-baseline gap-4 font-display text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-3xl">
                  <span className="numeric text-sm font-bold text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                {section.body.map((paragraph, j) => (
                  <p key={j} className="mt-4 leading-[1.85] text-slate">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
