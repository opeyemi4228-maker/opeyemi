# Opeyemi T. Ojurongbe — Personal Brand Website

Cinematic personal brand site. Content structure inspired by tonyelumelu.com;
visual language inspired by lotuscars.com (Eletre) and bmwgroup.com.

**Stack:** Next.js (App Router, JavaScript/.jsx) · Tailwind CSS v4 · lucide-react · react-icons

## Getting started

```bash
npm install
npm run dev
```

## Structure

```
app/                    Routes (App Router)
├── layout.jsx          Root layout — Navbar + Footer + metadata
├── page.jsx            Home (Hero → About → Stats → Ventures → Quote → Insights → CTA)
├── about/              Biography, timeline, recognition
├── ventures/           Portfolio of companies & initiatives
├── insights/           Articles index + [slug] detail pages
├── media/              Press, interviews, gallery
└── contact/            Enquiry form + channels

components/
├── layout/             Navbar, MobileNav, Footer
├── home/               One component per home-page section
├── shared/             PageHeader, SectionHeading, Newsletter, SocialLinks
└── ui/                 Button, ScrollReveal, AnimatedCounter

data/                   All content lives here — edit these, not components
├── site.js             Name, tagline, email, socials (single source of truth)
├── navigation.js       Nav links
├── ventures.js         Venture entries
├── insights.js         Articles
├── stats.js            Impact numbers
└── timeline.js         Career milestones

hooks/                  useInView (scroll reveals), useScrolled (navbar state)
lib/                    utils.js — cn(), formatDate()
public/images/          hero/ about/ ventures/ insights/ media/
```

## Design tokens

Defined in `app/globals.css` (`@theme`): near-black `ink`, elevated `charcoal`,
muted `fog`, light `porcelain`, and a signature `gold` accent.

## Status

Skeleton complete — sections marked `TODO` await real content (bio, ventures,
photos, socials) before full build-out.
