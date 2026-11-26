// Sign-in. Doubles as the setup guide: if the database or the owner account
// does not exist yet, it says exactly which command to run instead of failing.

import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Logo, { LogoMark } from "@/components/shared/Logo";
import LoginForm from "./LoginForm";
import { isDatabaseConfigured } from "@/lib/db";
import { getAdmin } from "@/lib/auth/session";
import { countAdmins } from "@/lib/admin/queries";

export const metadata = { title: "Sign in" };

async function setupState() {
  if (!isDatabaseConfigured()) return "no-database";
  try {
    if ((await countAdmins()) === 0) return "no-admin";
  } catch (error) {
    console.error("[admin] database check failed", error);
    return "unreachable";
  }
  return "ready";
}

export default async function LoginPage({ searchParams }) {
  const state = await setupState();
  if (state === "ready" && (await getAdmin())) redirect("/admin");
  const { next } = await searchParams;

  return (
    <main id="main" className="grid min-h-dvh lg:grid-cols-[1fr_1.1fr]">
      {/* Brand panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-porcelain lg:flex">
        <Logo inverse subline markClassName="h-14 w-14" nameClassName="text-lg" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Private dashboard</p>
          <p className="mt-5 max-w-md text-3xl leading-snug font-bold tracking-[-0.03em] text-porcelain">
            Every enquiry is read. Considered replies over fast ones.
          </p>
        </div>
        <p className="text-xs text-porcelain/50">Opeyemi T. Ojurongbe</p>
      </section>

      {/* Form panel */}
      <section className="flex flex-col bg-paper px-6 py-10 sm:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start text-sm text-slate transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to the website
        </Link>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <LogoMark className="mb-8 h-14 w-14 text-ink lg:hidden" />
          <h1 className="font-display text-3xl font-semibold text-ink">
            {state === "ready" ? "Sign in" : "Set up the dashboard"}
          </h1>

          {state === "ready" && (
            <>
              <p className="mt-2 text-sm text-slate">Messages, subscribers and account settings.</p>
              <LoginForm next={typeof next === "string" ? next : ""} />
            </>
          )}
          {state === "no-database" && <NoDatabase />}
          {state === "no-admin" && <NoAdmin />}
          {state === "unreachable" && <Unreachable />}
        </div>
      </section>
    </main>
  );
}

function Steps({ children }) {
  return <ol className="mt-6 space-y-5 text-sm leading-relaxed text-graphite">{children}</ol>;
}

function Step({ n, title, children }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-paper">{n}</span>
      <div className="min-w-0">
        <p className="font-medium text-ink">{title}</p>
        <div className="mt-1 text-slate">{children}</div>
      </div>
    </li>
  );
}

function Code({ children }) {
  return (
    <code className="mt-2 block overflow-x-auto rounded-lg bg-alabaster px-3 py-2 font-mono text-[13px] text-ink">
      {children}
    </code>
  );
}

function NoDatabase() {
  return (
    <>
      <p className="mt-2 text-sm text-slate">
        The website works without this, but enquiries and subscribers need somewhere to be stored. Three steps:
      </p>
      <Steps>
        <Step n={1} title="Create a Postgres database">
          A free one from Neon (neon.tech) is plenty. Copy its pooled connection string.
        </Step>
        <Step n={2} title="Add it to the environment">
          Locally in <span className="font-mono">.env.local</span>, and in your host&apos;s environment settings:
          <Code>DATABASE_URL=&quot;postgresql://…&quot;</Code>
        </Step>
        <Step n={3} title="Create the tables and your account">
          <Code>npm run db:migrate</Code>
          <Code>npm run admin:create</Code>
        </Step>
      </Steps>
    </>
  );
}

function NoAdmin() {
  return (
    <>
      <p className="mt-2 text-sm text-slate">The database is connected. One step left: create your owner account.</p>
      <Steps>
        <Step n={1} title="Run this in the project folder">
          <Code>npm run admin:create</Code>
          It asks for your name, email and a password, then you can sign in here.
        </Step>
      </Steps>
    </>
  );
}

function Unreachable() {
  return (
    <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800">
      The database is configured but could not be reached, or its tables do not exist yet. Check that
      DATABASE_URL is correct, then run <span className="font-mono">npm run db:migrate</span>.
    </p>
  );
}
