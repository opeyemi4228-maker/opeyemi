// Inner-page opening. A label with a gold dot, a heavy display title ending
// in a gold full stop, a short description, and an optional fact rail ruled
// off underneath: three or four checkable facts set as a spec sheet, so
// every page starts on evidence. Without facts it closes on a hairline.

import ScrollReveal from "@/components/ui/ScrollReveal";
import SplitReveal from "@/components/ui/SplitReveal";

export default function PageHeader({ eyebrow, title, description, facts, mark = "." }) {
  return (
    <section className="bg-paper px-4 pt-28 pb-10 sm:px-6 md:pt-36 md:pb-12 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-304">
        {eyebrow && (
          <ScrollReveal y={12}>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-gold" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate">
                {eyebrow}
              </p>
            </div>
          </ScrollReveal>
        )}
        <SplitReveal
          as="h1"
          immediate
          delay={0.1}
          className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance text-ink"
        >
          {title}
          <span className="text-gold">{mark}</span>
        </SplitReveal>
        {description && (
          <ScrollReveal y={16} delay={0.35}>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-slate md:text-lg">
              {description}
            </p>
          </ScrollReveal>
        )}
      </div>

      {facts?.length ? (
        <dl className="mx-auto mt-10 grid max-w-304 border-y border-hairline sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={[
                "border-hairline py-5 sm:px-6 lg:py-6",
                i > 0 ? "border-t sm:border-t-0" : "",
                i % 2 === 1 ? "sm:border-l" : "",
                i >= 2 ? "sm:border-t lg:border-t-0" : "",
                i === 2 ? "lg:border-l" : "",
                i % 2 === 0 ? "sm:pl-0" : "",
                i === 2 ? "lg:pl-6" : "",
              ].join(" ")}
            >
              <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate">
                {f.label}
              </dt>
              <dd className="mt-2 text-[15px] font-semibold text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="mx-auto mt-10 max-w-304 border-b border-hairline md:mt-12" />
      )}
    </section>
  );
}
