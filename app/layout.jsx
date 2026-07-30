import "./globals.css";
import { Barlow, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomeSplash from "@/components/shared/WelcomeSplash";
import { siteConfig } from "@/data/site";

// Montserrat (body) · Barlow ≈ Lotus typeface (display/nav).
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

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${montserrat.variable}`}
    >
      <body>
        <WelcomeSplash />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
