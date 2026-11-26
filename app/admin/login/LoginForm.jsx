"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "@/app/admin/actions";
import { inputStyles, labelStyles } from "@/components/admin/ui";

export default function LoginForm({ next }) {
  const [state, action] = useActionState(signIn, null);
  const [show, setShow] = useState(false);

  return (
    <form action={action} className="mt-8 space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="login-email" className={labelStyles}>
          Email
        </label>
        <input
          key={state?.email ?? "fresh"}
          id="login-email"
          name="email"
          type="email"
          required
          autoFocus
          autoComplete="username"
          defaultValue={state?.email}
          className={inputStyles}
        />
      </div>
      <div>
        <label htmlFor="login-password" className={labelStyles}>
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={show ? "text" : "password"}
            required
            autoComplete="current-password"
            className={`${inputStyles} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate hover:text-ink"
          >
            {show ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {state?.error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper transition-colors hover:bg-graphite disabled:opacity-70"
    >
      {pending ? "Signing in" : "Sign in"}
      {pending ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <ArrowRight aria-hidden="true" className="h-4 w-4" />}
    </button>
  );
}
