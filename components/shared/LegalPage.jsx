// Shared shell for the legal pages, so the three of them stay consistent
// and each individual page is only its content.

import PageHeader from "@/components/shared/PageHeader";

export default function LegalPage({ eyebrow, title, description, updated, sections }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Last updated {updated}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <article key={section.heading}>
                <h2 className="font-display text-xl text-porcelain sm:text-2xl">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="mt-4 leading-[1.85] text-fog">
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
