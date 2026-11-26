"use client";

// 03 · The record. Nine years, read sideways.
//
// On a desktop the section pins to the viewport and vertical scrolling
// drives the cards horizontally, so the career reads like a strip of film
// passing under the heading. The pinned stretch is exactly as tall as the
// track is wide, so one notch of the wheel moves the strip about one notch.
//
// Phones and tablets get the same cards as a native swipe rail with snap
// points, which is what a thumb expects; pinning there fights the browser
// chrome. Reduced motion gets the rail too, at every width.

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import PillLink from "@/components/ui/PillLink";
import { timeline } from "@/data/timeline";

function Card({ item, i }) {
  return (
    <article className="group relative flex h-[26rem] w-[19rem] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-porcelain/10 bg-smoke p-7 transition-colors duration-500 hover:border-gold/40 sm:w-[22rem] lg:h-[29rem] lg:w-[25rem] lg:p-8">
      {/* Glow that follows the accent in on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-gold/0 blur-3xl transition-colors duration-700 group-hover:bg-gold/15"
      />
      <div className="flex items-start justify-between">
        <p className="numeric font-display text-[4.5rem] leading-none font-extralight tracking-tighter text-gold lg:text-[5.5rem]">
          {item.year}
        </p>
        <span className="numeric mt-2 text-[10px] font-semibold tracking-[0.14em] text-fog">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-auto">
        <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-porcelain lg:text-2xl">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-fog">{item.description}</p>
      </div>
    </article>
  );
}

function Heading() {
  return (
    <SectionHeading
      index="04"
      eyebrow="The record"
      tone="dark"
      title="Nine years."
      accent="One direction."
      intro="From the mining faculty at FUTA to two companies and a registered engineering practice. Every step is dated and checkable."
      action={
        <PillLink href="/about" tone="light">
          The full journey
        </PillLink>
      }
      className="mb-10 md:mb-12"
    />
  );
}

function Closing() {
  return (
    <Link
      href="/about"
      className="group flex h-[26rem] w-[19rem] shrink-0 snap-start flex-col justify-between rounded-3xl bg-gold p-7 text-ink sm:w-[22rem] lg:h-[29rem] lg:w-[25rem] lg:p-8"
    >
      <span className="grid size-12 place-items-center rounded-full bg-ink text-gold">
        <ArrowUpRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:rotate-45" />
      </span>
      <div>
        <p className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] lg:text-4xl">
          The rest is still being built.
        </p>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em]">Read the full story</p>
      </div>
    </Link>
  );
}

export default function Record() {
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (desktop && !reduce) return <PinnedRecord />;

  return (
    <section className="overflow-hidden bg-ink py-24 text-porcelain sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading />
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:px-8">
        {timeline.map((item, i) => (
          <Card key={item.year} item={item} i={i} />
        ))}
        <Closing />
      </div>
    </section>
  );
}

function PinnedRecord() {
  const sectionRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const [distance, setDistance] = React.useState(0);

  // How far the track must travel: its own width, less the viewport, plus
  // the page gutter so the last card lands with the same margin as the
  // first. Re-measured on resize, since both sides of that sum change.
  React.useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-porcelain"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="mx-auto w-full max-w-7xl px-8">
          <Heading />
        </div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-5 px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {timeline.map((item, i) => (
            <Card key={item.year} item={item} i={i} />
          ))}
          <Closing />
        </motion.div>
        <div className="mx-auto mt-10 w-full max-w-7xl px-8">
          <div className="h-px w-full bg-porcelain/10">
            <motion.div style={{ width: bar }} className="h-px bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
