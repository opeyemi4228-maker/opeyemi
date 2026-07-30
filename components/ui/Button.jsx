// shadcn-style button (JSX port) restyled to the brand language:
// squared corners, uppercase tracked labels. `asChild` renders the
// child element (e.g. a <Link>) with button styling via Radix Slot.

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-xs font-medium uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-porcelain text-ink hover:bg-gold",
        gold: "bg-gold text-ink hover:bg-gold-soft",
        outline:
          "border border-porcelain/30 bg-transparent text-porcelain hover:border-gold hover:text-gold",
        ghost: "text-fog hover:text-porcelain",
        link: "text-porcelain underline-offset-8 hover:underline",
      },
      size: {
        default: "h-11 px-8",
        sm: "h-9 px-5",
        lg: "h-13 px-10",
        icon: "h-10 w-10",
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
