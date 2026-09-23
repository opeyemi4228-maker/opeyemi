// Social icon row. Reads handles from data/site.js and renders ONLY the
// profiles that have a real URL.
//
// A link that goes nowhere reads as carelessness, which is the opposite of
// the brand this site is building. Rather than shipping five `#` anchors,
// unconfigured profiles are omitted entirely, and if none are set the row
// falls back to the one channel that always works: email — or to whatever
// `fallback` the caller passes, so a surface that already shows the address
// can offer something else instead of repeating it.

import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const icons = [
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "twitter", label: "X (Twitter)", Icon: FaXTwitter },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
];

export default function SocialLinks({ className = "", fallback }) {
  const live = icons.filter(({ key }) => {
    const url = siteConfig.socials[key];
    return typeof url === "string" && url.trim().length > 0;
  });

  if (live.length === 0) {
    if (fallback) return <div className={className}>{fallback}</div>;
    return (
      <a
        href={`mailto:${siteConfig.email}`}
        className={cn(
          "inline-flex items-center gap-2.5 text-sm text-slate transition-colors hover:text-gold-ink",
          className
        )}
      >
        <Mail aria-hidden="true" className="size-4" />
        {siteConfig.email}
      </a>
    );
  }

  return (
    <ul className={cn("flex items-center gap-6", className)}>
      {live.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={siteConfig.socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <Icon aria-hidden="true" className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
