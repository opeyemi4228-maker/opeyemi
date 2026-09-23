import "./globals.css";
import { Archivo, Inter, Newsreader } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomeSplash from "@/components/shared/WelcomeSplash";
import { siteConfig } from "@/data/site";
import { SITE_URL } from "./sitemap";

// Three voices, each with one job.
//
// Archivo (display) — a neo-grotesque with a squared, engineered uppercase.
// It carries the name, every heading, the wordmark and the nav rail. Barlow
// was doing this before; it is softer and reads as a default rather than a
// decision, and it went slack at the 5rem sizes the hero needs.
//
// Inter (body) — drawn for screens, with a tall x-height that holds at the
// 15-17px this site sets paragraphs in. It replaces Montserrat, whose wide
// geometric round letters are handsome in a wordmark and tiring in a
// paragraph.
//
// Newsreader (editorial) — the serif voice, used only where the writing is
// the point: the creed, pull quotes, essay ledes. One serif sentence in a
// grotesque page is what stops the whole thing reading like a dashboard.
//
// All three are variable, latin-only, and self-hosted at build time by
// next/font, so no request reaches Google and there is no layout shift.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
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

export const viewport = { themeColor: "#ffffff" };

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
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${newsreader.variable}`}>
      <body>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
      </body>
    </html>
  );
}
