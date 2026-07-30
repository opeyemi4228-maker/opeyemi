// 404 — keeps the brand voice even on error pages.

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink text-center">
      <p className="text-sm tracking-[0.3em] uppercase text-gold">404</p>
      <h1 className="font-display text-4xl md:text-6xl">Page not found</h1>
      <Link href="/" className="text-fog underline underline-offset-4 hover:text-porcelain">
        Return home
      </Link>
    </section>
  );
}
