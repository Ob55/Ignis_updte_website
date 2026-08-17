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
- **react-router-dom 6** — client-side routing
- **lucide-react** — icons
- Plain **CSS** (custom design system, no Tailwind)
- Self-hosted fonts (Archivo, IBM Plex Sans/Mono, Instrument Serif)

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
├─ pages/                   # one file per route
│  ├─ Home.jsx              # /
│  ├─ Solutions.jsx         # /solutions
│  ├─ About.jsx             # /about   (About Us)
│  ├─ Blog.jsx              # /blog     (Field Log)
│  └─ Contact.jsx           # /contact
├─ components/
│  ├─ chrome/               # Nav, Footer, SkipLink, PageHero
│  ├─ home/                 # Hero, WhoWeAre, Highlights, Services, Products,
│  │                        #   SavingsCalc, StatBar (impact), Geography, Partners, AssessmentCta
│  ├─ about/                # AboutCompany, MissionVision, CoreValues, Culture
│  ├─ team/                 # Crew (team roster)
│  ├─ contact/              # Channels, Faq
│  └─ motion/               # Ambient, BlurText, Reveal, CountUp, ProgressRing, Manifesto, Marquee
├─ lib/                     # site.js (site-wide constants), useTitle.js
├─ content/                 # data: fuel-models.js, institutions.js, sources.js
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

| Path         | Page       | Contents |
|--------------|------------|----------|
| `/`          | Home       | Hero · Who We Are · Highlights · Services · Products · Savings calculator · Impact numbers · Geography · Partners |
| `/solutions` | Solutions  | System flow · Who we serve · Model · Comparison · Financing |
| `/about`     | About Us   | Company · Mission & Vision · Core Values · Culture · Team |
| `/blog`      | Blog & Posts | Field Log entries |
| `/contact`   | Contact    | Channels · Assessment request form · FAQ |

The "Book a kitchen assessment" form lives on **About Us** and **Contact** only.

---

## Design system

Defined once in `styles/tokens.css`. Theme = **dark cinematic green-black + emerald + orange flame**.

| Token           | Value       | Use |
|-----------------|-------------|-----|
| `--bg`          | `#06120b`   | page background |
| `--emerald`     | `#00712d`   | brand green |
| `--emerald-lite`| `#21b45a`   | accents on dark |
| `--flame`       | `#e8792b`   | fire / orange accent |
| `--text`        | `#eef4ee`   | body text |

Fonts: **Archivo** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (labels/numbers),
**Instrument Serif** (the italic accent word in headlines).

Motion (all CSS / small hooks, respects `prefers-reduced-motion`): word-by-word blur reveals,
fade-rise on scroll, count-up numbers, a flame progress ring, rising ember particles, and the
partner logo marquee.

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
