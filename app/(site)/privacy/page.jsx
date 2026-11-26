// Privacy policy. Written to describe what this site actually does: no
// analytics or visitor cookies; the two forms store what is typed into them.
// If what the forms collect changes, this page must change with it.

import LegalPage from "@/components/shared/LegalPage";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How this website handles personal data: what the contact and newsletter forms store, why, for how long, and how to have it deleted.",
  path: "/privacy",
});

const sections = [
  {
    heading: "The short version",
    body: [
      "This website collects only what you choose to send it: an enquiry through the contact form, or an email address through the newsletter field. It runs no analytics, sets no cookies on visitors, and has no advertising or tracking scripts of any kind.",
    ],
  },
  {
    heading: "The contact form",
    body: [
      "When you send an enquiry, your name, email address, chosen topic, message, and the page you sent it from are stored in this site's database so they can be read and answered. Nothing else about you is attached to it.",
      "Enquiries are read only by Opeyemi T. Ojurongbe. They are not added to a marketing list, sold, or shared with anyone. If an email alert service is used to announce a new enquiry, your message passes through it solely to deliver that alert.",
    ],
  },
  {
    heading: "The newsletter",
    body: [
      "Subscribing stores your email address and the date you joined, for the single purpose of sending Words on Marble, the twice-weekly note. Every issue carries a way to leave, and you can also ask to be removed by email at any time.",
    ],
  },
  {
    heading: "Protection against abuse",
    body: [
      "To stop automated spam, the forms count how often they are used from each network address. The address itself is never stored: it is replaced with a one-way scrambled code that cannot be turned back into it, and the count resets within the hour.",
    ],
  },
  {
    heading: "Hosting and server logs",
    body: [
      "This site is served by a commercial hosting provider and its database by a managed database provider. Like nearly all such services, they may keep short-lived technical logs, such as IP addresses and browser types, for security and reliability. Those logs are not used to build any profile of you.",
    ],
  },
  {
    heading: "Fonts and images",
    body: [
      "Typefaces are served from this site's own domain rather than a third party, so loading a page does not report your visit to an external font service. Images are likewise served directly from this site.",
    ],
  },
  {
    heading: "Keeping and deleting your data",
    body: [
      "Enquiries are kept for as long as the conversation is useful and are then archived or deleted. Newsletter addresses are kept until you unsubscribe.",
      `To see, correct, or delete anything you have sent through this site, write to ${siteConfig.email}. It will be done promptly, and you will be told when it has been.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="What this site keeps, why, and how to have it removed. In short: only what you choose to send."
      updated="November 2026"
      sections={sections}
    />
  );
}
