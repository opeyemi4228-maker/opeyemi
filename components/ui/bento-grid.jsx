// Bento feature grid (JSX port) restyled to the brand language:
// squared corners, charcoal surfaces on pure black, hover-reveal CTA.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ name, className, background, Icon, description, href, cta }) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden",
      "border border-smoke bg-charcoal",
      "transform-gpu [box-shadow:0_-20px_80px_-20px_#ffffff14_inset]",
      className
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-gold transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="font-display text-xl text-porcelain">{name}</h3>
      <p className="max-w-lg text-fog">{description}</p>
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <Link href={href}>
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[.03]" />
  </div>
);

export { BentoCard, BentoGrid };
