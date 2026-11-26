"use client";

// Words on Marble signup: the twice-weekly note, by email or on WhatsApp.
// The email form saves the address for the dashboard's subscriber list and
// falls back to an email to the owner if the database is unreachable. The
// WhatsApp button uses the invite link in data/wordsOnMarble.js, or, until
// one is set, opens an email asking to be added.

import { useActionState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { subscribe } from "@/lib/actions/public";
import { siteConfig } from "@/data/site";
import { wordsOnMarble, whatsappHref } from "@/data/wordsOnMarble";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const [state, action, pending] = useActionState(subscribe, null);
  const pathname = usePathname();

  useEffect(() => {
    if (state?.status === "unavailable" && state.values?.email) {
      const subject = encodeURIComponent("Words on Marble signup");
      const body = encodeURIComponent(`Please add ${state.values.email} to Words on Marble.`);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    }
  }, [state]);

  const done = state?.status === "success";
  const whatsapp = whatsappHref();

  return (
    <div id="newsletter" className="relative isolate scroll-mt-28 overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-porcelain sm:px-12 sm:py-16">
      <div aria-hidden="true" className="absolute -top-40 -right-40 -z-10 size-120 rounded-full bg-gold/20 blur-[120px]" />
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-gold">
              Words on Marble · {wordsOnMarble.cadence}
            </p>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em]">
            Words worth <span className="text-gold">carving.</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fog">
            A short note twice a week on excellence, competence, wisdom and
            work. By email or on WhatsApp. One idea, set down plainly.
          </p>
        </div>

        <div>
          {done ? (
            <p role="status" className="flex items-center gap-3 text-[15px] text-porcelain">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-ink">
                <Check aria-hidden="true" className="h-4 w-4" />
              </span>
              {state.message}
            </p>
          ) : (
            <form action={action} noValidate className="flex flex-col gap-3 sm:flex-row">
              <input type="hidden" name="source" value={pathname} />
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <input name="company" tabIndex={-1} autoComplete="off" />
              </div>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                key={state?.values?.email ?? "fresh"}
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                defaultValue={state?.values?.email}
                placeholder="you@example.com"
                aria-invalid={state?.status === "error"}
                aria-describedby="newsletter-status"
                className="h-14 w-full rounded-full border border-porcelain/20 bg-porcelain/5 px-6 text-[15px] text-porcelain placeholder:text-fog/70 focus:border-gold focus:outline-none aria-[invalid=true]:border-red-400"
              />
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-8 text-sm font-bold text-ink transition-colors hover:bg-gold-soft disabled:cursor-wait disabled:opacity-70"
              >
                {pending ? "Joining" : "Subscribe"}
                {pending ? (
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                )}
              </button>
            </form>
          )}
          <p
            id="newsletter-status"
            aria-live="polite"
            className={cn("mt-3 min-h-5 text-sm", state?.status === "error" ? "text-red-300" : "text-fog")}
          >
            {state && !done ? state.message : null}
          </p>
          <a
            href={whatsapp}
            {...(wordsOnMarble.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-2 inline-flex h-12 items-center gap-3 rounded-full border border-porcelain/20 pr-5 pl-2 text-sm font-semibold text-porcelain transition-colors hover:border-porcelain"
          >
            <span className="grid size-8 place-items-center rounded-full bg-[#25D366] text-ink">
              <FaWhatsapp aria-hidden="true" className="size-4" />
            </span>
            Or join on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
