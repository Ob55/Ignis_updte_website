# IGNIS Innovation Africa — Website

Marketing site for **IGNIS Innovation Africa** — a Kenyan clean-energy company building
steam-based cooking systems, LPG infrastructure and energy solutions for institutions across
Africa. Dark, cinematic, motion-rich single-page app.

> **Cook Smarter, Live Better.**

---

## Tech stack

Plain, lightweight, fast:

- **React 18** (JSX — no TypeScript)
- **Vite 5** — dev server + build
- **react-router-dom 7** — client-side routing, prerendered to static HTML at build
- **lucide-react** — icons
- Plain **CSS** (custom design system, no Tailwind)
- Headings in Times New Roman, body in the system UI stack, self-hosted IBM Plex Mono for small labels

No framework heaviness — `npm run dev` is ready in ~1–2s.

---

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build → dist/
npm run preview  # serve the production build locally → http://localhost:3000
```

**Tip:** don't delete the `.vite` cache between runs — warm restarts are faster. To just *view*
the finished site fast, use `npm run preview` (serves the static build; loads instantly).

---

## Project structure

```
ignis_Website/
├─ index.html               # HTML shell: meta tags, favicon, Organization JSON-LD, noscript fallback
├─ vite.config.js           # Vite config ( @ → project root alias )
├─ src/
│  ├─ main.jsx              # entry — mounts <App> in BrowserRouter, imports global CSS
│  └─ App.jsx               # routes + shared chrome (Nav, Footer, SkipLink)
├─ pages/                   # one file per route (see Routes below)
├─ components/
│  ├─ ui/                   # Button (primary/secondary), Stepper, Accordion, Cards
│  ├─ chrome/               # Nav, Footer, StickyCta, Breadcrumbs, PageHero, CookieConsent
│  ├─ home/                 # the 15 homepage blocks (see pages/Home.jsx)
│  ├─ about/                # AboutCompany, MissionVision, CoreValues, Culture, AboutPartners
│  ├─ team/                 # Crew (team roster)
│  ├─ contact/              # EnquiryForms (assessment + partner), Channels, MapDirections, Faq
│  └─ motion/               # Ambient, BlurText, Reveal
├─ lib/                     # site.js (constants), nav.js (menu), seo-data.js (per-route head + prerender list)
├─ content/                 # all copy-bearing data + content gates (flags.js) — see "Content gates"
├─ styles/
│  ├─ tokens.css            # design tokens (colours, spacing, fonts)
│  ├─ fonts.css             # @font-face declarations
│  ├─ globals.css           # base styles, buttons, glass, animations
│  └─ components.css        # all section/component styles
└─ public/                  # static assets served at site root
   ├─ fonts/                # woff2 files
   ├─ partners/             # partner logos (partner1–7.png)
   ├─ logo-flame.png        # nav mark
   ├─ logo-full.png         # footer logo
   └─ favicon.ico, icon.svg, og-default.png, manifest.webmanifest, ...
```

---

## Routes

Every route must also have an entry in `lib/seo-data.js` (title + 70–160 char
description); that registry drives prerendering and the sitemap.

| Path | Page |
|---|---|
| `/` | Home — 15 blocks per the Content Spec (30 Sept 2026) |
| `/what-we-do`, `/what-we-do/:slug` | Offers + service lines (`content/offers.js`, `content/services.js`) |
| `/financing` | Financing the transition (CESA flow) |
| `/cleancookiq` | Platform, How It Works, For Institutions / Financiers / Governments |
| `/who-we-work-with`, `/who-we-work-with/:audience` | Five audiences (`content/audiences.js`) |
| `/where-we-work` | Countries with status labels |
| `/our-work`, `/our-work/projects`, `/our-work/case-studies[/:slug]`, `/our-work/field-notes[/:slug]` | Our Work |
| `/about` | Who We Are, Team, Partners |
| `/talk-to-ignis` | `#assessment` and `#partner` forms → `api/assessment.js` |

Old URLs (`/services`, `/platform`, `/scoping-call`, `/blog`, `/where-we-work/:audience`, …)
301 to the new ones in `vercel.json`.

## Content gates

Nothing unverified renders. Gated items live in code comments tagged
`TODO(content)`, `TODO(data)`, `TODO(confirm)` or `TODO(partner-approval)`
(`grep -rn "TODO(" components pages content lib api`). Switches in `content/flags.js`:
`SHOW_PROOF_STRIP`, `SHOW_TAITA_TAVETA`, `FOOTER_PHONE`. Case studies and partner logos
render only when `published` / `approved` is true.

---

## Design system

Defined once in `styles/tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--emerald` | `#00712D` | primary: text, links, primary buttons (white on emerald 6.2:1) |
| `--orange` | `#F58220` | icons, decoration, dark-text badges only — never text on light, never white text on it |
| `--green-light` | `#E6F0E9` | cards and callouts (dark text 12.8:1) |
| `--on-orange` | `#14140f` | the only text colour allowed on orange |

Buttons: one `Button` component, `primary` (filled emerald) or `secondary` (outlined
emerald), at most two per section. Site-wide actions: **Request an Assessment** and
**Partner with Ignis**.

Motion (all CSS / small hooks, respects `prefers-reduced-motion`): word-by-word blur reveals
on page heroes, fade-rise on scroll, and rising ember particles.

---

## Editing content

- **Copy & data** live in the component files under `components/` and in `content/*.js`.
- **Site-wide details** (email, phone, WhatsApp, social links, tagline) → `lib/site.js`.
- **Fuel savings figures** (the calculator) → `content/fuel-models.js`.
- **Partner logos** → drop images in `public/partners/` and update the list in
  `components/home/Partners.jsx`.

### ⚠️ Placeholders to replace before launch

- **Phone / WhatsApp number** in `lib/site.js` (currently `+254XXXXXXXXX`).
- **Team members + photos** in `components/team/Crew.jsx` (currently "Name Surname" placeholders).
- **Asili product photo** in `components/home/Products.jsx` (currently a styled placeholder).
- **Savings figures** in `content/fuel-models.js` are illustrative — replace with real assessment data.
- Field Log posts in `components/home/LogTeaser.jsx` are sample entries.

---

## Deployment

`npm run build` outputs a fully static `dist/` — host it on any static host
(Vercel, Netlify, Cloudflare Pages, S3, etc.).

**Important:** because routing is client-side (BrowserRouter), configure a **SPA fallback** so all
paths serve `index.html`:

- **Netlify** — add `_redirects` with: `/*  /index.html  200`
- **Vercel** — add a rewrite: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Cloudflare Pages / Nginx** — enable single-page-app / `try_files ... /index.html`.

---

## License

© 2026 IGNIS Innovation Africa. All rights reserved.
# Ignis_updte_website
