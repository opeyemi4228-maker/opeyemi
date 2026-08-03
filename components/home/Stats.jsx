// Credentials strip. The only place figures appear on the homepage, in one
// format, each with a line of substantiation underneath so a reader never
// has to guess what the number counts.

import { stats } from "@/data/stats";

export default function Stats() {
  return (
    <section className="border-y border-smoke bg-charcoal py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-display text-3xl text-gold sm:text-4xl">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm font-medium text-porcelain sm:text-[15px]">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-fog">
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
