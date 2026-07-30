// Impact-in-numbers band — animated counters (years, ventures, people
// impacted, countries). Driven by data/stats.js.

import { stats } from "@/data/stats";

export default function Stats() {
  return (
    <section className="border-y border-smoke bg-charcoal py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            {/* TODO: <AnimatedCounter value={stat.value} /> */}
            <p className="font-display text-4xl text-gold">{stat.value}</p>
            <p className="mt-2 text-sm text-fog">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
