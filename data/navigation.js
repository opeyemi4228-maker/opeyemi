// Primary navigation — shared by Navbar and Footer.

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Insights", href: "/insights" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

// Footer link columns (BMW Group layout).
export const footerColumns = [
  {
    heading: "Explore",
    links: navLinks,
  },
  {
    heading: "Work",
    links: [
      { label: "BitLayerX Technologies", href: "/ventures" },
      { label: "Engineering Practice", href: "/ventures" },
      { label: "Leadership & Mentorship", href: "/ventures" },
      { label: "Speaking", href: "/contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Get in Touch", href: "/contact" },
      { label: "Newsletter", href: "/contact" },
      { label: "Press Enquiries", href: "/contact" },
    ],
  },
];

// Bottom legal strip (BMW-style) — point to real pages later.
export const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Legal Disclaimer", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "Sitemap", href: "#" },
];
