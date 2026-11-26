"use client";

// Enquiry form. Posts to a server action that stores the message for the
// dashboard (and, if configured, emails an alert). If the database is not
// reachable it falls back to opening the visitor's own email app with the
// message already written, so an enquiry is never lost to an outage.

import { useActionState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/lib/actions/public";
import { TOPICS } from "@/lib/validate";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-2xl border border-hairline bg-paper px-5 py-4 text-[15px] text-ink placeholder:text-slate/70 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-red-700";

const labelClasses = "mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-ink";

function mailtoFor(values) {
  const subject = encodeURIComponent(`${values.topic} enquiry, ${values.name}`);
  const body = encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\nTopic: ${values.topic}\n\n${values.body}`
  );
  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitEnquiry, null);
  const pathname = usePathname();
  const statusRef = useRef(null);

  // No backend available: hand the written message to the email app.
  useEffect(() => {
    if (state?.status === "unavailable" && state.values) {
      window.location.href = mailtoFor(state.values);
    }
    if (state?.status === "success") statusRef.current?.focus();
  }, [state]);

  if (state?.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-4 rounded-3xl border border-hairline bg-paper p-8 focus:outline-none"
      >
        <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-gold-ink" />
        <p className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink">Message received.</p>
        <p className="text-[15px] leading-relaxed text-slate">{state.message}</p>
      </div>
    );
  }

  const errors = state?.errors ?? {};
  const v = state?.values ?? {};
  // Re-key on each response so defaultValue re-applies what was typed.
  const formKey = state ? JSON.stringify(v) : "fresh";

  return (
    <form key={formKey} action={action} noValidate className="space-y-5">
      <input type="hidden" name="source" value={pathname} />
      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Your name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            defaultValue={v.name}
            placeholder="Ada Lovelace"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClasses}
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            defaultValue={v.email}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClasses}
          />
        </Field>
      </div>

      <Field id="contact-topic" label="What is it about?">
        <select id="contact-topic" name="topic" defaultValue={v.topic ?? TOPICS[0]} className={fieldClasses}>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </Field>

      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          defaultValue={v.body}
          placeholder="What are we building?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(fieldClasses, "resize-y")}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-14 items-center justify-center gap-4 rounded-full bg-ink pr-2 pl-7 text-[15px] font-semibold text-paper transition-colors hover:bg-graphite disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending" : "Send enquiry"}
          <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-paper text-ink">
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </span>
        </button>
        <p aria-live="polite" className={cn("text-sm", state?.status === "error" ? "text-red-700" : "text-slate")}>
          {state && state.status !== "success" ? state.message : null}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
