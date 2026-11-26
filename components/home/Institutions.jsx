// Institutions. Where the training, the credentials and the mandates
// actually came from, named in full and set as a quiet row of record.
//
// Every entry is drawn from the timeline and certifications data, and each
// carries what the relationship was, so nothing reads as a borrowed logo or
// an implied endorsement. Strength by association has to be checkable.

import ScrollReveal from "@/components/ui/ScrollReveal";

const institutions = [
  { name: "Nigerian Society of Engineers", relation: "Registered engineer", short: "NSE" },
  { name: "Federal University of Technology, Akure", relation: "B.Eng., Mining Engineering", short: "FUTA" },
  { name: "Federal Ministry of Works", relation: "Quality control & geotechnics", short: "FMW" },
  { name: "Nigerian Universities Engineering Students Association", relation: "National Vice President", short: "NUESA" },
  { name: "University of Karnataka", relation: "GIS Professional certification", short: "Karnataka" },
  { name: "National Youth Service Corps", relation: "Completed with distinction", short: "NYSC" },
];

export default function Institutions() {
  return (
    <section className="bg-paper pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <p className="text-[11px] leading-relaxed font-semibold tracking-[0.24em] text-slate uppercase">
            Trained, registered, appointed and elected
          </p>
          <ul className="grid grid-cols-2 border-t border-l border-hairline md:grid-cols-3">
            {institutions.map((inst, i) => (
              <li key={inst.short} className="border-r border-b border-hairline">
                <ScrollReveal delay={i * 0.06} y={14} className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
                  <p className="font-display text-2xl leading-none font-black tracking-[-0.04em] text-ink sm:text-3xl">
                    {inst.short}
                  </p>
                  <div>
                    <p className="text-[13px] leading-snug font-semibold text-ink">{inst.name}</p>
                    <p className="mt-1 text-xs text-gold-ink">{inst.relation}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
