import "./globals.css";
import { Barlow, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomeSplash from "@/components/shared/WelcomeSplash";
import { siteConfig } from "@/data/site";
import { SITE_URL } from "./sitemap";

// Montserrat (body) · Barlow ≈ Lotus typeface (display/nav).
// next/font self-hosts both at build time, so no request reaches Google and
// there is no layout shift on load.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
});

// The title carries the discipline, not just the name: someone searching a
// topic should be able to find this, not only someone typing the name.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero/hero-3.jpg",
        width: 960,
        height: 1280,
        alt: `${siteConfig.name}, design engineer and registered mining engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/hero/hero-3.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#000000" };

// Person schema. This is how a search engine assembles the panel shown when
// somebody searches the name, and almost nobody in this market bothers.
function personSchema() {
  const sameAs = Object.values(siteConfig.socials).filter(
    (url) => typeof url === "string" && url.trim().length > 0
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero/hero-3.jpg`,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Design Engineer",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    worksFor: { "@type": "Organization", name: "BitLayerX Technologies" },
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
      "Leadership",
    ],
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlow.variable} ${montserrat.variable}`}>
      <body>
        {/* Keyboard and screen-reader users get past the nav in one keystroke. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-gold focus:px-5 focus:py-3 focus:text-xs focus:font-medium focus:uppercase focus:tracking-[0.2em] focus:text-ink"
        >
          Skip to content
        </a>
        <WelcomeSplash />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
      </body>
    </html>
  );
}
