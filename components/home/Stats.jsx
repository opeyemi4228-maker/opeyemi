// Credentials strip. The only place figures appear on the homepage, in one
// format, each with a line of substantiation underneath so a reader never
// has to guess what the number counts.
//
// Set as a spec sheet rather than four cards: a rule above each figure,
// nothing boxed. A spec sheet is the right register for claims that are
// meant to be checked.

import { stats } from "@/data/stats";

export default function Stats() {
  return (
    <section className="border-y border-hairline bg-alabaster py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t-2 border-ink pt-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="numeric font-display text-4xl font-semibold leading-none tracking-[-0.02em] text-ink sm:text-5xl">
                  {stat.value}
                  <span className="text-gold-ink">{stat.suffix}</span>
                </p>
                <p className="mt-4 text-[15px] font-medium text-ink">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {stat.detail}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
