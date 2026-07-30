// Social icon row (react-icons, BMW footer order) — reads handles from
// data/site.js; empty handles fall back to "#" until real links arrive.

import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const icons = [
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
  { key: "twitter", label: "X (Twitter)", Icon: FaXTwitter },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
];

export default function SocialLinks({ className = "" }) {
  return (
    <ul className={cn("flex items-center gap-7", className)}>
      {icons.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={siteConfig.socials[key] || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-porcelain transition-colors hover:text-gold"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
