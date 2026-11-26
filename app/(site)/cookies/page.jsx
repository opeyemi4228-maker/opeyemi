// Cookie policy. Accurate and short, because this site sets none.

import LegalPage from "@/components/shared/LegalPage";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookies",
  description:
    "This website sets no cookies on visitors. What your browser may store, and why there is no consent banner.",
  path: "/cookies",
});

const sections = [
  {
    heading: "This site sets no cookies",
    body: [
      "There are no analytics cookies, no advertising cookies, and no third party embeds placing cookies on your device. That is why you have not been shown a consent banner: there is nothing to consent to.",
      "The one cookie this site can set belongs to its private dashboard. It is created only when the site owner signs in, is strictly necessary for keeping that sign-in secure, and is never sent to or set for visitors.",
    ],
  },
  {
    heading: "What your browser may still store",
    body: [
      "Your browser will normally cache static files such as images, stylesheets, and fonts so that pages load faster on a return visit. This is ordinary browser caching rather than a cookie, it holds no information about you, and clearing your browser cache removes it entirely.",
      "The welcome screen remembers the date it last greeted you, in your browser's local storage, so it appears at most once a day. That value never leaves your device.",
    ],
  },
  {
    heading: "If this changes",
    body: [
      `If cookies or analytics are ever introduced, this page will be updated before they are switched on, and consent will be requested where the law requires it. Questions can go to ${siteConfig.email}.`,
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookies"
      description="A short page, because there is very little to report."
      updated="November 2026"
      sections={sections}
    />
  );
}
