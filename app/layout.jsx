import "./globals.css";
import { Montserrat } from "next/font/google";
import { siteConfig } from "@/data/site";
import { SITE_URL } from "@/lib/seo";

// One voice: Montserrat, for everything. The name, every heading, the nav,
// the body copy and the quotes. Its geometric capitals carry both the heavy
// display settings (800 to 900, tight) and the wide-tracked uppercase labels,
// so a single family covers the whole range without a second face competing.
//
// Loaded as a variable font so one latin-only file covers 100 to 900, and
// self-hosted at build time by next/font: no request reaches Google and
// there is no layout shift.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Site-wide defaults only. Anything page-specific — canonical URL, social
// card, description — is set per page through pageMetadata() in lib/seo.js,
// because metadata set here is inherited by every route that does not
// override it (a root-level canonical once pointed every page at home).
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport = { themeColor: "#ffffff" };

// The document shell. The public site's chrome (header, footer, welcome
// splash, structured data) lives in app/(site)/layout.jsx; the dashboard
// under /admin has its own, so neither leaks into the other.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
