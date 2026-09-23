// shadcn-style button (JSX port) restyled to the light brand language:
// pill geometry (the current BMW / Mercedes-Benz control shape), uppercase
// tracked labels, solid ink as the primary action. `asChild` renders the
// child element (e.g. a <Link>) with button styling via Radix Slot.

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-ink disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary action. Solid, unambiguous, high contrast.
        default: "bg-ink text-paper hover:bg-graphite",
        // The accent, used sparingly — one per view at most.
        gold: "bg-gold text-ink hover:bg-gold-ink hover:text-paper",
        // Secondary action beside a primary one.
        outline:
          "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
        ghost: "text-slate hover:text-ink",
        link: "text-ink underline-offset-8 hover:underline",
        // ---- On ink. The dark hero, the dark CTA, the dark essay covers.
        // Same two-button grammar as above, inverted: one solid primary,
        // one hairline secondary beside it.
        inverse: "bg-porcelain text-ink hover:bg-gold-soft focus-visible:outline-gold-soft",
        outlineInverse:
          "border border-porcelain/30 bg-transparent text-porcelain hover:border-porcelain hover:bg-porcelain hover:text-ink focus-visible:outline-gold-soft",
        ghostInverse: "text-fog hover:text-porcelain focus-visible:outline-gold-soft",
      },
      size: {
        default: "h-11 px-8",
        sm: "h-9 px-6",
        lg: "h-13 px-10",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
