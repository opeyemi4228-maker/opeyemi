// Words on Marble: Opeyemi's twice-weekly newsletter, with videos and
// posts on every social platform.
//
// To finish setting it up:
//   - whatsapp: the WhatsApp channel or group invite link. While it is empty
//     the "Join on WhatsApp" button opens an email asking to be added, so it
//     still works.
//   - Social links live in data/site.js (siteConfig.socials); every platform
//     with a URL there shows up on the Words on Marble page automatically.
//   - editions: add new ones to the top. The newest is featured.

import { siteConfig } from "@/data/site";

export const wordsOnMarble = {
  name: "Words on Marble",
  author: "Opeyemi T. Ojurongbe",
  cadence: "Twice a week",
  tagline: "Words worth carving.",
  summary:
    "A short note, twice a week, on excellence, competence, wisdom and work. Delivered by email and on WhatsApp, with videos and posts on YouTube, Instagram, TikTok and LinkedIn.",
  why: "Marble is what people carve when they mean for words to last. Each note is written to that standard: brief enough to read in a minute, true enough to keep.",
  formats: [
    { title: "The newsletter", body: "Twice a week, by email and on WhatsApp. One idea, set down plainly." },
    { title: "Videos", body: "The same ideas, spoken. On YouTube, Instagram, TikTok and LinkedIn." },
    { title: "Posts", body: "Short pieces across every platform, for the days between editions." },
  ],
  whatsapp: "",
  platforms: ["youtube", "instagram", "tiktok", "linkedin"],
  editions: [
    {
      title: "Competence sets you apart",
      greeting: "Good Morning Everyone,",
      opening: "Trust we all had a great night rest.",
      lead: "Be so good at what you do, you cannot be ignored; competence sets you apart.",
      verses: [
        { text: "Daniel was excellent in spirit, knowledge and understanding.", ref: "Daniel 5:12" },
        { text: "Joseph was discerning and wise.", ref: "Genesis 41:39" },
        { text: "Do you see a man who excels in his work? He will stand before kings.", ref: "Proverbs 22:29" },
      ],
    },
  ],
};

// Where "Join on WhatsApp" goes: the invite link once it is set, otherwise
// an email asking to be added, so the button always does something real.
export function whatsappHref() {
  return (
    wordsOnMarble.whatsapp ||
    `mailto:${siteConfig.email}?subject=${encodeURIComponent("Words on Marble on WhatsApp")}&body=${encodeURIComponent("Please add my number to Words on Marble on WhatsApp: ")}`
  );
}
