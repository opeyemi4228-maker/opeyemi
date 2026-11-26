"use client";

// Small interactive pieces for the dashboard: submit buttons that show a
// pending state and (optionally) ask for confirmation, and the forms that
// report a result inline via useActionState.

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Copy, Eye, EyeOff, Loader2 } from "lucide-react";
import { addSubscriber, changePassword, updateProfile } from "@/app/admin/actions";
import { buttonStyles, inputStyles, labelStyles } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

/** A submit button for a server-action form. `confirm` asks first. */
export function SubmitButton({ children, variant = "secondary", confirm, className, pendingLabel, ...props }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className={cn(buttonStyles[variant], className)}
      {...props}
    >
      {pending && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}

function Result({ state }) {
  if (!state?.message) return null;
  return (
    <p
      role={state.status === "error" ? "alert" : "status"}
      className={cn("text-sm", state.status === "error" ? "text-red-700" : "text-emerald-800")}
    >
      {state.message}
    </p>
  );
}

export function AddSubscriberForm() {
  const [state, action] = useActionState(addSubscriber, null);
  const formRef = useRef(null);
  useEffect(() => {
    if (state?.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="add-subscriber" className="sr-only">
          Email address
        </label>
        <input
          id="add-subscriber"
          name="email"
          type="email"
          required
          placeholder="name@example.com"
          className={cn(inputStyles, "h-10 rounded-full")}
        />
        <SubmitButton variant="primary" pendingLabel="Adding">
          Add subscriber
        </SubmitButton>
      </div>
      <Result state={state} />
    </form>
  );
}

export function ProfileForm({ name }) {
  const [state, action] = useActionState(updateProfile, null);
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="profile-name" className={labelStyles}>
          Display name
        </label>
        <input id="profile-name" name="name" defaultValue={name} required className={inputStyles} />
      </div>
      <div className="flex items-center gap-4">
        <SubmitButton variant="primary" pendingLabel="Saving">
          Save
        </SubmitButton>
        <Result state={state} />
      </div>
    </form>
  );
}

export function PasswordForm() {
  const [state, action] = useActionState(changePassword, null);
  const [show, setShow] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    if (state?.status === "success") formRef.current?.reset();
  }, [state]);

  const field = (id, name, label, autoComplete, hint) => (
    <div>
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        required
        autoComplete={autoComplete}
        className={inputStyles}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate">
          {hint}
        </p>
      )}
    </div>
  );

  return (
    <form ref={formRef} action={action} className="space-y-4">
      {field("pw-current", "current", "Current password", "current-password")}
      <div className="grid gap-4 sm:grid-cols-2">
        {field("pw-next", "next", "New password", "new-password", "At least 12 characters. A short sentence works well.")}
        {field("pw-confirm", "confirm", "Repeat new password", "new-password")}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton variant="primary" pendingLabel="Updating">
          Change password
        </SubmitButton>
        <button type="button" onClick={() => setShow((v) => !v)} className={buttonStyles.quiet}>
          {show ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}
          {show ? "Hide" : "Show"} passwords
        </button>
        <Result state={state} />
      </div>
    </form>
  );
}

export function CopyText({ text, label = "Copy", copiedLabel = "Copied" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard blocked; nothing to do */
        }
      }}
      className={buttonStyles.secondary}
    >
      {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
