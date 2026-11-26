# Opeyemi T. Ojurongbe — Personal Brand Website

Personal site for Opeyemi T. Ojurongbe — mining engineer, design engineer and
finance engineer; CEO of BitLayerX Technologies and CEO of Orangé Finance —
with a private dashboard for enquiries and newsletter subscribers.

**Stack:** Next.js 16 (App Router, JavaScript) · Tailwind CSS v4 · Prisma 7 + PostgreSQL · Montserrat + Newsreader

## Getting started

```bash
npm install          # also generates the database client
npm run dev          # http://localhost:3000
```

The public site runs with no configuration at all. Without a database the
contact and newsletter forms fall back to opening the visitor's email app.

## Turning on the dashboard (one-time)

1. **Create a Postgres database.** A free Neon database (neon.tech) is plenty.
   Copy its *pooled* connection string.
2. **Configure it.** Copy `.env.example` to `.env.local` and set
   `DATABASE_URL`. Add the same variables in your host's settings (Vercel →
   Project → Settings → Environment Variables).
3. **Create the tables:** `npm run db:migrate`
4. **Create your account:** `npm run admin:create` (asks for name, email, password)
5. Sign in at **`/admin`**.

Forgot the password? Run `npm run admin:create` again with the same email:
it resets the password and signs out every device.

### What the dashboard does

| Page | What it is for |
| --- | --- |
| **Overview** | Unread enquiries, 30-day activity charts, latest messages, popular topics |
| **Messages** | Inbox with Unread / Replied / Archived tabs and search. Open a message to reply by email, mark it replied, archive or delete it |
| **Subscribers** | Newsletter list with search, add-by-hand, unsubscribe, delete, and **Export CSV** for Mailchimp, Buttondown, Resend and similar tools |
| **Account & security** | Change name and password, see every signed-in device, sign others out |

### Optional settings (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your live domain. Used for canonical URLs, the sitemap and social cards |
| `IP_HASH_SECRET` | Random string used to scramble visitor IPs for rate limiting (`openssl rand -base64 32`) |
| `RESEND_API_KEY`, `NOTIFY_EMAIL`, `NOTIFY_FROM` | Email alert for every new enquiry (resend.com) |
| `DATABASE_POOL_MAX` | Connections per server instance; 3 suits serverless |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console ownership token |

## Security, in brief

- Passwords are hashed with scrypt; sessions are random tokens stored only as SHA-256 hashes.
- The session cookie is httpOnly, SameSite=Lax, Secure in production, and scoped to `/admin`.
- Every dashboard page, action and export checks the session itself.
- Sign-in, password change and both public forms are rate limited; the forms also have a bot honeypot.
- `/admin` is `noindex`, `no-store`, and disallowed in `robots.txt`.

## Structure

```
app/
├── layout.jsx          Document shell, fonts, site-wide metadata
├── (site)/             The public website (its layout adds header, footer, schema)
│   └── insights/[slug] Essays — styling intentionally left untouched
├── admin/              Private dashboard (login + (panel) pages + actions.js)
├── opengraph-image.jsx 1200×630 social card · icon.svg / apple-icon.jsx · manifest.js
├── sitemap.js · robots.js
components/
├── layout/             Navbar (sizes documented inline), Footer
├── home/ shared/ ui/   Site sections and primitives; shared/Logo.jsx is the brand mark
└── admin/              Dashboard UI kit, shell, chart, form controls
data/                   All site copy — edit these, not components
lib/
├── seo.js              pageMetadata() — every page's canonical, description and card
├── logo-geometry.js    The brand mark's geometry (one source for every render)
├── db.js · auth/ · ratelimit.js · actions/ · admin/
prisma/                 schema.prisma + migrations
scripts/create-admin.mjs
```

## SEO checklist after deploying

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy.
2. Add the site in Google Search Console, set `GOOGLE_SITE_VERIFICATION`, and submit `/sitemap.xml`.
3. Fill in real profile URLs in `data/site.js` → `socials`. They feed the footer and the search-engine knowledge panel.
