// An organisation's mark wherever it is named. Its real logo when we have
// one (data/organisations.js → `logo`), in colour on light or dark ground
// and in white on its own brand colour; otherwise a dot in its brand colour,
// so every organisation is still recognisable at a glance.

import Image from "next/image";
import { cn } from "@/lib/utils";

export default function OrgMark({ org, variant = "color", className = "size-6" }) {
  if (org.logo) {
    const src = variant === "white" ? org.logo.white : org.logo.color;
    return (
      <span className={cn("relative inline-block shrink-0", className)}>
        <Image src={src} alt="" fill sizes="64px" className="object-contain" />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 rounded-full", variant === "white" ? "bg-current" : "", className)}
      style={variant === "white" ? undefined : { background: org.brand.color }}
    />
  );
}
