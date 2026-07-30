// Reusable inner-page hero — eyebrow label, display title, short
// description. Keeps every page opening consistent.

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="bg-ink px-6 pt-44 pb-24">
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <p className="text-sm tracking-[0.3em] uppercase text-gold">{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-5xl text-balance md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-fog">{description}</p>
        )}
      </div>
    </section>
  );
}
