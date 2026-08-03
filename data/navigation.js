// Primary navigation, shared by Navbar and Footer.
//
// Every href below resolves to a real page. Nothing points at "#": a link
// that goes nowhere reads as carelessness, and four of them in a footer
// undermines a site whose entire argument is about standards.

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Insights", href: "/insights" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

// Footer link columns. Each intent gets its own destination rather than
// funnelling every visitor into the same enquiry form.
export const footerColumns = [
  {
    heading: "Explore",
    links: [...navLinks, { label: "Now", href: "/now" }],
  },
  {
    heading: "Work",
    links: [
      { label: "BitLayerX Technologies", href: "/ventures" },
      { label: "Engineering Practice", href: "/ventures" },
      { label: "Leadership & Mentorship", href: "/ventures" },
      { label: "Speaker Kit", href: "/speaking" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Get in Touch", href: "/contact" },
      { label: "Book a Talk", href: "/speaking" },
      { label: "Press & Media", href: "/media" },
      { label: "Newsletter", href: "/insights#newsletter" },
    ],
  },
];

// Bottom legal strip. All three are real pages; the sitemap is generated.
export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Legal Disclaimer", href: "/legal" },
  { label: "Cookies", href: "/cookies" },
  { label: "Sitemap", href: "/sitemap.xml" },
];
