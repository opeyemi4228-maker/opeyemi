// Public site chrome: skip link, welcome splash, header, footer, and the
// structured data that tells search engines who this site is about.

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomeSplash from "@/components/shared/WelcomeSplash";
import { siteConfig } from "@/data/site";
import { SITE_URL, jsonLd } from "@/lib/seo";

// Person + WebSite schema. Person is how a search engine assembles the panel
// shown when somebody searches the name; WebSite ties this domain to it.
function structuredData() {
  const sameAs = Object.values(siteConfig.socials).filter(
    (url) => typeof url === "string" && url.trim().length > 0
  );

  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: siteConfig.name,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero/hero-3.jpg`,
    email: `mailto:${siteConfig.email}`,
    jobTitle: ["Mining Engineer", "Design Engineer", "Finance Engineer"],
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    worksFor: [
      { "@type": "Organization", name: "BitLayerX Technologies" },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Federal University of Technology, Akure",
    },
    memberOf: {
      "@type": "Organization",
      name: "Nigerian Society of Engineers",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional registration",
      name: "Registered Mining Engineer",
      recognizedBy: {
        "@type": "Organization",
        name: "Nigerian Society of Engineers",
      },
    },
    knowsAbout: [
      "Design engineering",
      "Product design",
      "Mining engineering",
      "Geotechnical investigation",
      "System design",
      "Business digitalisation",
      "Financial engineering",
      "Corporate finance",
      "Leadership",
    ],
    ...(sameAs.length > 0 && { sameAs }),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  return { "@context": "https://schema.org", "@graph": [person, website] };
}

export default function SiteLayout({ children }) {
  return (
    <>
      {/* Keyboard and screen-reader users get past the nav in one keystroke. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:text-[11px] focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-paper"
      >
        Skip to content
      </a>
      <WelcomeSplash />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <script {...jsonLd(structuredData())} />
    </>
  );
}
