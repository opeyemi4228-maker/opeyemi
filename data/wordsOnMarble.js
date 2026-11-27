// Words on Marble: Opeyemi's twice-weekly note, with videos and posts on
// YouTube, Instagram, TikTok and LinkedIn.
//
// To finish setting it up:
//   - whatsapp: the WhatsApp channel or group invite link. While it is empty
//     the "Join on WhatsApp" button opens an email asking to be added, so it
//     still works.
//   - Social links live in data/site.js (siteConfig.socials); every platform
//     with a URL there shows up on the Words on Marble page automatically.
//
// Adding an edition: put it at the TOP of `editions` (the first is the
// latest). Leave out greetings and sign-offs ("Good morning", "Have a
// blessed day"); the page adds its own signature. The body is a list of
// blocks, each one of:
//   { type: "p", text }                 a paragraph
//   { type: "verse", text, ref }        scripture, set as a pull quote
//   { type: "lines", lines: [] }        short lines read as one beat
//   { type: "list", intro, items: [{ title, body }] }   numbered points
//   { type: "close", lines: [] }        the closing line, set large

import { siteConfig } from "@/data/site";

export const wordsOnMarble = {
  name: "Words on Marble",
  author: "Opeyemi T. Ojurongbe",
  cadence: "Twice a week",
  tagline: "Words worth carving.",
  summary:
    "A short note, twice a week, on excellence, faith, wisdom and work. Delivered by email and on WhatsApp, with videos and posts on YouTube, Instagram, TikTok and LinkedIn.",
  why: "Marble is what people carve when they mean for words to last. Each note is written to that standard: brief enough to read in a minute, true enough to keep.",

  // The page's own explanation, in the questions a new reader asks.
  faq: [
    {
      q: "What is Words on Marble?",
      a: "A short written note from Opeyemi T. Ojurongbe, published twice a week. Each edition takes one principle, grounds it in scripture, and turns it into something you can act on the same day.",
    },
    {
      q: "What is in each edition?",
      a: "A title that names the principle, the scripture it stands on, a short reflection in plain words, and a closing line worth remembering. It takes about a minute to read.",
    },
    {
      q: "Who is it for?",
      a: "Anyone building something: a career, a business, a family, a calling. Students, professionals and founders read it for the same reason, to start the day with one clear thought.",
    },
    {
      q: "How do I receive it?",
      a: "By email or on WhatsApp, twice a week. The same ideas are also spoken as short videos and shared as posts on YouTube, Instagram, TikTok and LinkedIn.",
    },
    {
      q: "Why “marble”?",
      a: "Marble is what people carve when they mean for words to last. Every note is held to that standard: few words, each one chosen to be kept.",
    },
  ],

  whatsapp: "",
  platforms: ["youtube", "instagram", "tiktok", "linkedin"],

  editions: [
    {
      slug: "the-rest-principle",
      date: "2026-11-27",
      title: "The Rest Principle",
      summary: "Rest is not stopping. Rest is trusting: do your part, then trust God with the rest.",
      body: [
        { type: "verse", text: "And on the seventh day God ended His work… and He rested.", ref: "Genesis 2:2" },
        { type: "verse", text: "Come to Me… and I will give you rest.", ref: "Matthew 11:28" },
        { type: "verse", text: "He restores my soul.", ref: "Psalm 23:3" },
        { type: "p", text: "Rest is putting your trust in God." },
        { type: "p", text: "It is saying, “Lord, I have done my part, I trust You with the rest.”" },
        { type: "lines", lines: ["This weekend, take the weekend off.", "Pause. Breathe. Refuel."] },
        {
          type: "p",
          text: "Don’t carry the worry into the new week. Rest now, so you can start Monday fully recharged and fully energised.",
        },
        { type: "close", lines: ["Rest is not stopping.", "Rest is trusting."] },
      ],
    },
    {
      slug: "the-zacchaeus-principle",
      date: "2026-11-26",
      title: "The Zacchaeus Principle",
      reading: "Luke 19:1–10",
      summary: "Don’t complain about where you started. Build a platform, or stand on another’s, and position yourself to be seen.",
      body: [
        { type: "p", text: "Zacchaeus was short, and the crowd was large. He didn’t complain about his height; he climbed a tree." },
        { type: "p", text: "That tree was his platform. A platform so high that Jesus had to stop and see him." },
        { type: "verse", text: "Zacchaeus, come down, for today I must stay at your house.", ref: "Luke 19:5" },
        { type: "p", text: "Don’t complain about your background, your origin, your locality." },
        {
          type: "list",
          intro: "You have two options:",
          items: [
            { title: "Build your own platform", body: "Learn, grow, show up, be consistent." },
            { title: "Leverage another’s platform", body: "Serve, connect, collaborate, partner." },
          ],
        },
        { type: "p", text: "Either way, position yourself to be seen." },
        { type: "p", text: "Because when your platform is high enough, Heaven will stop for you." },
        {
          type: "verse",
          text: "For the eyes of the Lord run to and fro throughout the whole earth, to show Himself strong on behalf of those whose heart is loyal to Him.",
          ref: "2 Chronicles 16:9",
        },
        { type: "close", lines: ["You will be seen.", "You will be called.", "You will be chosen."] },
      ],
    },
    {
      slug: "competence-sets-you-apart",
      date: "2026-11-25",
      title: "Competence Sets You Apart",
      summary: "Be so good at what you do, you cannot be ignored.",
      body: [
        { type: "p", text: "Be so good at what you do, you cannot be ignored; competence sets you apart." },
        { type: "verse", text: "Daniel was excellent in spirit, knowledge and understanding.", ref: "Daniel 5:12" },
        { type: "verse", text: "Joseph was discerning and wise.", ref: "Genesis 41:39" },
        { type: "verse", text: "Do you see a man who excels in his work? He will stand before kings.", ref: "Proverbs 22:29" },
        { type: "close", lines: ["Competence sets you apart."] },
      ],
    },
  ],
};

export const editionBySlug = (slug) => wordsOnMarble.editions.find((e) => e.slug === slug);

// "27 November 2026", or "" for an undated edition.
export function editionDate(edition) {
  if (!edition?.date) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${edition.date}T00:00:00Z`),
  );
}

// Every scripture reference in an edition, in order: "Luke 19:5 · 2 Chronicles 16:9".
export function editionRefs(edition) {
  const refs = edition.body.filter((b) => b.type === "verse").map((b) => b.ref);
  return edition.reading ? [edition.reading, ...refs.filter((r) => !r.startsWith(edition.reading.split(":")[0]))] : refs;
}

// Where "Join on WhatsApp" goes: the invite link once it is set, otherwise
// an email asking to be added, so the button always does something real.
export function whatsappHref() {
  return (
    wordsOnMarble.whatsapp ||
    `mailto:${siteConfig.email}?subject=${encodeURIComponent("Words on Marble on WhatsApp")}&body=${encodeURIComponent("Please add my number to Words on Marble on WhatsApp: ")}`
  );
}
