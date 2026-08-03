// Legal disclaimer. Matters more than usual here, because the site is
// written by a registered engineer and discusses engineering judgement.

import LegalPage from "@/components/shared/LegalPage";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Legal Disclaimer",
  description:
    "Terms on which the content of this personal website is published.",
};

const sections = [
  {
    heading: "A personal site",
    body: [
      `This is the personal website of ${siteConfig.name}. Opinions expressed here are his own. They are not the positions of any employer, client, professional body, or organisation he is associated with, past or present.`,
    ],
  },
  {
    heading: "Not professional engineering advice",
    body: [
      "Writing on this site about engineering, geotechnics, system design, or business is general commentary. It is not professional advice and must not be relied on as such.",
      "Engineering decisions depend on site specific investigation, applicable standards, and the judgement of a qualified engineer engaged for that particular project. Nothing published here substitutes for that. No liability is accepted for any action taken on the basis of this content alone.",
    ],
  },
  {
    heading: "No professional relationship",
    body: [
      "Reading this site, subscribing to updates, or sending an email does not create a consultant, engineering, or advisory relationship. Such a relationship begins only under a written agreement signed by both parties.",
    ],
  },
  {
    heading: "Accuracy and external links",
    body: [
      "Content is accurate to the best of the author's knowledge at the time of writing, and is not systematically revised afterwards. Dates are shown so you can judge how current a piece is.",
      "Links to external websites are provided for convenience. They are not endorsements, and no responsibility is taken for content hosted elsewhere.",
    ],
  },
  {
    heading: "Copyright",
    body: [
      `Text and photographs on this site belong to ${siteConfig.name} unless stated otherwise. Short quotations with attribution and a link are welcome. For republication of a full piece, or for use of the photography beyond the speaker kit, write to ${siteConfig.email}.`,
    ],
  },
];

export default function LegalDisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Legal Disclaimer"
      description="The terms on which this content is published, including where engineering judgement is concerned."
      updated="July 2026"
      sections={sections}
    />
  );
}
