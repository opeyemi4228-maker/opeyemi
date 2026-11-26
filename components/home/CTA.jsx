// Closing call to action, shared by every page: a rounded black panel with
// a gold glow rising from one corner and the strata lines from the logo
// running behind it. The headline in two voices (porcelain, then gold), the
// offer in a sentence, and two ways in.
//
// The default primary is a visible email address, because senior people
// generally will not fill in a form, and they are the most valuable visitor
// this site gets. Pages pass their own words; the shape never changes.

import PillLink from "@/components/ui/PillLink";
import SplitReveal from "@/components/ui/SplitReveal";
import { siteConfig } from "@/data/site";

export default function CTA({
  title = "Let's build",
  accent = "something that lasts.",
  body = "A product to launch. A partnership to explore. A team that needs a second opinion. The door is open, and a conversation costs nothing.",
  primary = { label: "Email me directly", href: `mailto:${siteConfig.email}` },
  secondary = { label: "Other enquiries", href: "/contact" },
  showEmail = true,
  tone = "dark",
}) {
  const light = tone === "light";
  return (
    <section className="bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div
        className={
          light
            ? "relative isolate mx-auto max-w-304 overflow-hidden rounded-[28px] border border-hairline bg-alabaster px-6 py-14 text-ink sm:px-12 sm:py-20 lg:px-16"
            : "relative isolate mx-auto max-w-304 overflow-hidden rounded-[28px] bg-ink px-6 py-14 text-porcelain sm:px-12 sm:py-20 lg:px-16"
        }
      >
        <div
          aria-hidden="true"
          className={`absolute -right-32 -bottom-48 -z-10 size-144 rounded-full blur-[120px] ${light ? "bg-gold/25" : "bg-gold/30"}`}
        />
        {/* Strata: the logo's gold ground lines, ruled across the panel. */}
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 right-0 -z-10 hidden w-1/2 ${light ? "" : "md:block"} bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_27px,rgba(201,162,75,0.12)_27px,rgba(201,162,75,0.12)_28px)] mask-[linear-gradient(to_left,black,transparent)]`}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <SplitReveal className="font-display text-[clamp(2.4rem,5.6vw,4.5rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance">
            {title}
            <br />
            <span className={light ? "text-gold-ink" : "text-gold"}>{accent}</span>
          </SplitReveal>

          <div>
            <p className={`max-w-md text-base leading-relaxed sm:text-lg ${light ? "text-slate" : "text-porcelain/70"}`}>{body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {primary && (
                <PillLink href={primary.href} tone={light ? "dark" : "gold"} size="lg">
                  {primary.label}
                </PillLink>
              )}
              {secondary && (
                <PillLink href={secondary.href} tone={light ? "outline" : "light"} size="lg">
                  {secondary.label}
                </PillLink>
              )}
            </div>
            {showEmail && (
              <p className={`mt-6 text-sm ${light ? "text-slate" : "text-fog"}`}>
                Or write to{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={`underline underline-offset-4 transition-colors ${light ? "text-ink decoration-ink/30 hover:text-gold-ink" : "text-porcelain decoration-porcelain/30 hover:text-gold"}`}
                >
                  {siteConfig.email}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
