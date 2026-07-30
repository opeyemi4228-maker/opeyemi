"use client";

// Feature section (JSX port of ruixen-feature-section) restyled to the brand:
// rotating testimonial card stack + focus-area panel with a gold glow,
// stats row and partner quote below. Copy is placeholder — refine with
// real testimonials/partners when they arrive.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TbHeartPlus } from "react-icons/tb";
import { Rocket, Mountain, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardContent } from "@/components/ui/card";
import { stats } from "@/data/stats";
import { siteConfig } from "@/data/site";

export const Highlight = ({ children, className }) => {
  return (
    <span className={cn("bg-gold/15 px-1 py-0.5 font-medium text-gold", className)}>
      {children}
    </span>
  );
};

// Placeholder testimonials — replace with real quotes when available.
const CARDS = [
  {
    id: 0,
    name: "Adaeze N.",
    designation: "Operations Lead",
    content: (
      <p>
        Working with <Highlight>Opeyemi</Highlight> changed how our team
        executes: clear vision, high standards, and{" "}
        <Highlight>relentless follow through</Highlight> on every commitment.
      </p>
    ),
  },
  {
    id: 1,
    name: "Tunde A.",
    designation: "Cofounder & Venture Partner",
    content: (
      <p>
        His <Highlight>leadership</Highlight> turns ambitious ideas into
        shipped products. Every venture he touches gains{" "}
        <Highlight>momentum and clarity</Highlight>.
      </p>
    ),
  },
  {
    id: 2,
    name: "Grace O.",
    designation: "Brand Strategist",
    content: (
      <p>
        From <Highlight>strategy</Highlight> to storytelling, Opeyemi brings a
        founder&apos;s energy and an operator&apos;s discipline to{" "}
        <Highlight>every engagement</Highlight>.
      </p>
    ),
  },
];

const focusAreas = [
  {
    name: "Design Engineering",
    desc: "Human centred products, full stack delivery, and automation at BitLayerX Technologies",
    icon: Rocket,
  },
  {
    name: "Mining & Geotechnics",
    desc: "Registered engineer (NSE): site investigation, quality control, and operations",
    icon: Mountain,
  },
  {
    name: "Leadership & Mentorship",
    desc: "From national student governance to developing the next generation of engineers",
    icon: Users,
  },
];

export default function RuixenSection() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
      <div className="relative grid grid-cols-1 lg:grid-cols-2">
        {/* Left Block, testimonial card stack */}
        <div className="flex flex-col items-start justify-center border border-smoke p-4 sm:p-6 lg:p-8">
          <div className="relative mb-4 w-full sm:mb-6">
            <div className="absolute inset-x-0 -bottom-2 z-10 h-16 bg-linear-to-t from-ink to-transparent sm:h-20 lg:h-24"></div>
            <CardStack items={CARDS} />
          </div>

          <h3 className="font-display text-xl text-porcelain sm:text-2xl">
            What It&apos;s Like to Work With{" "}
            <span className="text-gold">Opeyemi</span>
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fog sm:text-base">
            Real reflections from teams, partners, and founders across his
            ventures and engagements.
          </p>
        </div>

        {/* Right Block, focus areas with gold glow */}
        <div className="flex flex-col items-start justify-start border border-smoke p-4 sm:p-6 lg:p-8">
          <h3 className="font-display text-xl text-porcelain sm:text-2xl">
            Ventures &amp; Focus Areas{" "}
            <span className="text-gold">Portfolio</span>
          </h3>
          <p className="mt-3 mb-6 max-w-md text-sm leading-relaxed text-fog sm:mb-8 sm:text-base">
            The pillars of an expanding body of work, from companies founded
            to communities built.
          </p>
          <div
            className={cn(
              "group relative mt-auto inline-flex w-full animate-rainbow cursor-pointer items-center justify-center border-0 bg-ink px-4 py-2 font-medium transition-colors sm:px-6 lg:px-8",
              // gold glow strip beneath the panel
              "before:absolute before:bottom-[8%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]"
            )}
          >
            <CardContent className="z-10 w-full space-y-3 border border-smoke bg-charcoal p-3 sm:space-y-4 sm:p-4 lg:p-6">
              {focusAreas.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between border border-smoke p-2 transition hover:bg-white/5 sm:p-3"
                  >
                    <div className="flex flex-1 items-center gap-2 sm:gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center bg-smoke text-gold sm:h-8 sm:w-8">
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-porcelain sm:text-sm">
                          {item.name}
                        </p>
                        <p className="line-clamp-1 text-xs text-fog sm:line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label={`Save ${item.name}`}
                      className="ml-2 flex-shrink-0 border border-smoke p-1.5 text-xs font-semibold text-fog transition-colors hover:text-gold sm:p-2"
                    >
                      <TbHeartPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                );
              })}
            </CardContent>
          </div>
        </div>
      </div>

      {/* Stats and Testimonial Section */}
      <div className="mt-12 grid gap-8 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex items-center p-4 sm:p-6">
          <div className="grid w-full grid-cols-3 gap-6 text-left sm:gap-8 lg:gap-6 xl:gap-8">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="space-y-2 sm:space-y-3">
                <div className="font-display text-2xl text-porcelain sm:text-3xl lg:text-4xl">
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="text-sm text-fog sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <blockquote className="border-l-2 border-gold pl-4 text-fog sm:pl-6 lg:pl-8">
            <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
              Opeyemi pairs bold vision with disciplined execution. Every
              venture we&apos;ve built together started as an idea and became
              something people rely on.
            </p>
            <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
              <cite className="block text-sm font-medium not-italic text-porcelain sm:text-base">
                Client Partner, BitLayerX Technologies
              </cite>
              {/* TODO: partner wordmark/logo from public/images once available */}
            </div>
          </blockquote>
        </div>
      </div>
      </div>
    </section>
  );
}

export const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()); // move the last card to the front
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto my-4 h-48 w-full md:h-48 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute flex h-48 w-full flex-col justify-between border border-white/10 bg-charcoal p-4 shadow-xl md:h-48 md:w-96"
            style={{ transformOrigin: "top center" }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-porcelain/90">{card.content}</div>
            <div>
              <p className="font-medium text-porcelain">{card.name}</p>
              <p className="font-normal text-fog">{card.designation}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
