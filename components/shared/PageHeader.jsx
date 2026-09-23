// Reusable inner-page opening — eyebrow label, display title, short
// description, ruled off at the base. Every page starts the same way, which
// is what makes the differences between them legible.

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="bg-paper px-6 pt-28 pb-14 sm:pt-32 md:pt-40 md:pb-20">
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold-ink" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">
              {eyebrow}
            </p>
          </div>
        )}
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,7vw,3rem)] font-semibold leading-[1.02] text-balance text-ink md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-slate md:text-lg">
            {description}
          </p>
        )}
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-b border-hairline md:mt-16" />
    </section>
  );
}
