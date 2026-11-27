// The organisations Opeyemi leads, each answering "What is it?".
//
// Every description is taken from the organisation's own site and
// documents (BitLayerX's site metadata, Orangé Finance's README and FAQ,
// the JETSUP Community Handbook, Edition 1). Do not add claims here that
// those sources do not make: no client counts, no returns, no member
// numbers. Orangé Finance in particular is pre-launch and says so.
//
// `brand` is each organisation's own colour (from its own stylesheet), used
// as an accent so each one is recognisably itself. `ink` is the shade that
// stays legible as small text on white; `on` is the text colour on `color`.
//
// `url` stays empty until the organisation's site is live; the pages then
// show a "Visit" link automatically.

const allOrganisations = [
  {
    slug: "bitlayerx",
    name: "BitLayerX Technologies",
    short: "BitLayerX",
    role: "Founder & CEO",
    founded: "2025",
    base: "Abuja · working globally",
    question: "What is BitLayerX?",
    card: "Strategy, design, engineering, brand, film and growth, delivered by one team.",
    oneLiner: "The products, brands and systems companies run on.",
    summary:
      "BitLayerX Technologies designs and builds the products, brands and systems companies run on. Strategy, design, engineering, brand, film and growth, delivered by one team, in Abuja and working globally.",
    why: "Thousands of capable businesses still run on paper, memory and heroic effort. BitLayerX exists to give them systems that do not depend on anyone having a good day: digitalisation with engineering rigour.",
    offers: [
      { title: "Strategy", body: "Understanding how the business actually runs before anything is built." },
      { title: "Design", body: "UI/UX, wireframing, prototyping and human-centred interfaces." },
      { title: "Engineering", body: "Full-stack development, deployment and business process automation." },
      { title: "Brand, film & growth", body: "Brand strategy, content and the growth work that makes it seen." },
    ],
    status: "Operating",
    leadership:
      "Opeyemi founded BitLayerX in 2025 and leads it as CEO, running end-to-end product delivery across UI/UX design, full-stack development, deployment and business process automation, for organisations across Nigeria and international markets.",
    brand: { color: "#0040FF", ink: "#0033CC", on: "#ffffff" },
    // BitLayerX's own mark (from its app/icon.png), in colour and in white.
    logo: { color: "/images/logos/bitlayerx.png", white: "/images/logos/bitlayerx-white.png" },
    image: "/images/ventures/bitlayerx.jpg",
    imageAlt: "Opeyemi T. Ojurongbe, Founder and CEO of BitLayerX Technologies",
    url: "",
  },
  {
    slug: "orange-finance",
    paused: true,
    name: "Orangé Finance",
    short: "Orangé Finance",
    role: "CEO",
    founded: "",
    base: "Abuja",
    question: "What is Orangé Finance?",
    card: "Rule-based trading across currencies, commodities, stocks and crypto. Client money is never held.",
    oneLiner: "The world's markets, in your own account.",
    summary:
      "Orangé Finance builds non-custodial trading automation. Customers connect their own exchange and broker accounts with keys that cannot withdraw, choose a rule, and the strategy runs there, in their own name. Orangé holds no client money.",
    why: "Most of what goes wrong in this industry starts with a company holding customer money it was never authorised to hold. Orangé is built so that it never holds it at all. The difference is structural, not a promise.",
    offers: [
      { title: "Your account, your name", body: "Strategies run in your own broker or exchange account, through a key that can trade but cannot withdraw." },
      { title: "Five markets", body: "Currency pairs, commodities such as gold and oil, stocks, ETFs and cryptocurrency." },
      { title: "Rules you can read", body: "Every strategy can be described in a sentence. Paper trading first, then live." },
      { title: "No promises of returns", body: "Software that executes rules you choose. Not advice, not discretionary management." },
    ],
    status: "Pre-launch · early access",
    leadership:
      "As CEO, Opeyemi brings an engineer's discipline to money: every strategy a rule that can be stated in a sentence, tested before it runs, inside a structure where client funds are never held.",
    statusNote:
      "The strategies are built and tested. They go live only after the same code passes fourteen unattended days against a live venue. Until then, Orangé is working with a small group of design partners.",
    brand: { color: "#FF5A1F", ink: "#C2410C", on: "#0b0b0b" },
    image: "/images/insights/editorial.jpg",
    imageAlt: "Opeyemi T. Ojurongbe, CEO of Orangé Finance",
    url: "",
  },
  {
    slug: "jetsup",
    paused: true,
    name: "JETSUP Community",
    short: "JetsUp",
    role: "Founder & President",
    founded: "2026",
    base: "Nigeria · across Africa",
    question: "What is JetsUp?",
    card: "A free movement of young innovators aged 7 to 21, in school and community chapters.",
    oneLiner: "Raising Africa's young problem-solvers.",
    summary:
      "JETSUP Community is a free movement of young innovators aged 7 to 21, organised into school and community chapters across Africa. Members meet weekly, learn skills, build solutions to local problems and compete from their community to the African Championship.",
    why: "Brilliant children grow up surrounded by problems they could solve. Most never get the chance to try. What is missing is structure, mentors and a stage, and that is what JETSUP provides.",
    offers: [
      { title: "Discover", body: "Find talent in every school, village and street, including children out of school." },
      { title: "Connect", body: "Link every young builder with trained Champions and with each other." },
      { title: "Equip", body: "Skills, tools, materials and a weekly place to build." },
      { title: "Challenge", body: "Real problems and a ladder of competitions, from community to continent." },
    ],
    promise:
      "No child will be turned away from JETSUP because of where they live, what their parents earn, or whether they are in school.",
    heritage:
      "Carrying forward the Junior Engineers, Technicians and Scientists (JETS) Club, founded in Nigeria in 1982.",
    status: "Founded 2026",
    leadership:
      "Opeyemi founded JETSUP Community and leads it as President: setting the vision and strategy, leading the National Executive Council, and representing JETSUP to partners and government.",
    brand: { color: "#0F6B46", ink: "#0F6B46", on: "#ffffff" },
    image: "/images/ventures/leadership.jpg",
    imageAlt: "Opeyemi T. Ojurongbe, Founder and President of JETSUP Community",
    url: "",
  },
];

// Paused organisations keep their facts here but appear nowhere on the site
// (no cards, no pages, no links) until `paused` is removed.
export const organisations = allOrganisations.filter((o) => !o.paused);

export const organisationBySlug = (slug) => organisations.find((o) => o.slug === slug);
