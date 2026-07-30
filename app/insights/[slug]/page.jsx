// Insight detail — single essay page rendered from data/insights.js by slug.
// Structure: cover hero → category/date → title → body paragraphs →
// signature rule → related essays.

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { insights } from "@/data/insights";
import { siteConfig } from "@/data/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  return post
    ? { title: post.title, description: post.excerpt }
    : { title: "Insight" };
}

export default async function InsightDetailPage({ params }) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = insights.filter((p) => p.slug !== slug).slice(0, 2);
  const paragraphs = post.body.split("\n\n");

  return (
    <>
      {/* Cover */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink pt-32">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/95" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em]">
            <span className="border border-gold/50 px-3 py-1 text-gold">
              {post.category}
            </span>
            <time dateTime={post.date} className="text-fog">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="mt-6 font-display text-4xl leading-tight text-balance text-porcelain md:text-6xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <article className="bg-ink">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="border-l-2 border-gold pl-5 text-lg italic leading-relaxed text-porcelain/90">
            {post.excerpt}
          </p>
          <div className="mt-12 space-y-7">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-[17px] leading-[1.85] text-fog">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-16 flex items-center gap-5 border-t border-smoke pt-10">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p className="text-sm uppercase tracking-[0.3em] text-porcelain">
              {siteConfig.name}
            </p>
          </div>

          <Link
            href="/insights"
            className="mt-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-fog transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> All insights
          </Link>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-smoke bg-charcoal py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">
            Keep Reading
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/insights/${p.slug}`}
                className="group flex items-center justify-between gap-6 border border-smoke bg-ink p-7"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                    {p.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-porcelain text-balance transition-colors group-hover:text-gold">
                    {p.title}
                  </h3>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-fog transition-all group-hover:translate-x-1 group-hover:text-gold" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
