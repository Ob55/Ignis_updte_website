import { SITE } from '@/lib/site';
import { OFFERS } from '@/content/offers';
import { SERVICES } from '@/content/services';
import { audiences } from '@/content/audiences';
import { publishedFieldNotes } from '@/content/field-notes';
import { publishedCaseStudies } from '@/content/case-studies';

// Single source of truth for per-route <head> data. Both the client-side
// useSeo() hook and the build-time prerender step read from here, so the tags a
// crawler sees in raw HTML and the tags React sets after hydration cannot drift.
//
// Copy rule for this site: every description leads on INSTITUTIONAL CLEAN
// COOKING, not on generic "energy services". Keep each 70-160 characters.
export const DEFAULT_OG_IMAGE = '/og-default.png';

const STATIC = {
  '/': {
    // The brand is searched both ways, so the full name carries the title.
    title: 'Ignis Innovation | Clean Cooking for African Institutions',
    description:
      'Ignis helps schools, hospitals and other institutions switch from firewood to clean cooking, financed from the fuel budget they already have.',
  },
  '/what-we-do': {
    title: 'What We Do: Institutional Clean Cooking | Ignis',
    description:
      'Institutional Steam, Electric Cooking and Clean-Cooking Programmes: clean cooking solutions built for the real operating conditions of institutional kitchens.',
  },
  '/financing': {
    title: 'Financing the Clean-Cooking Transition | Ignis',
    description:
      'How Ignis structures financing for institutional clean cooking, repaid over time through a service agreement linked to the energy budget you already carry.',
  },
  '/cleancookiq': {
    title: 'CleanCookIQ: The Data Behind Every Decision | Ignis',
    description:
      'CleanCookIQ is the Ignis platform for collecting, validating and managing institutional clean cooking transition data, from assessment to verified results.',
  },
  '/who-we-work-with': {
    title: 'Who We Work With | Ignis',
    description:
      'Institutions, governments and counties, financiers, technology providers and development partners working on the institutional clean cooking transition.',
  },
  '/where-we-work': {
    title: 'Where We Work | Ignis',
    description:
      'Where Ignis works on institutional clean cooking: built in Kenya and designed for African markets, with the status of each country we work in.',
  },
  '/our-work': {
    title: 'Our Work: Projects, Case Studies, Field Notes | Ignis',
    description:
      'Institutional clean cooking work by Ignis: assessments, county programmes, technology deployment, financing structures and digital infrastructure.',
  },
  '/our-work/projects': {
    title: 'Projects | Ignis',
    description:
      'Institutional clean cooking projects by Ignis, listed as each counterparty approves publication: assessments, programmes and deployments.',
  },
  '/our-work/case-studies': {
    title: 'Case Studies | Ignis',
    description:
      'Institutional clean cooking case studies: where Ignis works, with whom, and what changed, published once each counterparty approves.',
  },
  '/our-work/field-notes': {
    title: 'Field Notes from Live Sites | Ignis',
    description:
      'Field observations, fuel data, engineering lessons and financing insights from institutional clean cooking work in operating kitchens.',
  },
  '/our-work/methodology': {
    title: 'How We Measure | Ignis',
    description:
      'How Ignis defines and verifies each institutional clean cooking figure it publishes, from institutions verified to fuel-cost savings.',
  },
  '/about': {
    title: 'About Ignis Innovation',
    description:
      'Ignis builds the delivery and financing infrastructure for institutional clean cooking, connecting the demand, the economics and the technology.',
    image: '/img/about-nairobi.jpg',
  },
  '/talk-to-ignis': {
    title: 'Talk to Ignis: Request an Assessment | Ignis',
    description:
      'Request an institutional clean cooking assessment, or partner with Ignis as a county, financier, technology provider or development partner.',
  },
  '/privacy': {
    title: 'Privacy Policy | Ignis',
    description:
      'How Ignis Innovation Limited collects, uses and protects the information you share when you enquire about institutional clean cooking services.',
  },
  '/terms': {
    title: 'Terms of Use | Ignis',
    description:
      'The terms on which Ignis Innovation Limited makes this institutional clean cooking website and its enquiry forms available to you.',
  },
  '/credits': {
    title: 'Sources & Credits | Ignis',
    description:
      'Sources behind the institutional clean cooking figures we publish, plus photography and typeface credits for the Ignis website.',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | Ignis',
    description:
      'What cookies this institutional clean cooking site sets, why analytics stay off until you accept them, and how to change your choice at any time.',
  },
  '/thank-you': {
    title: 'Thank You | Ignis',
    description:
      'Thank you for your institutional clean cooking enquiry. The Ignis team will reply within two working days with the recommended next step.',
    noindex: true,
  },
  '/404': {
    title: 'Page Not Found | Ignis',
    description:
      'That page does not exist or has moved. Explore Ignis institutional clean cooking solutions for schools, hospitals and other institutions.',
    noindex: true,
  },
};

// Content-driven routes. Each description is built to stay within 70-160 chars.
const fit = (s) => (s.length > 160 ? s.slice(0, 157).replace(/\s+\S*$/, '') + '…' : s);

const OFFER_SEO = Object.fromEntries(
  OFFERS.map((o) => [`/what-we-do/${o.slug}`, {
    title: `${o.name} | Ignis`,
    description: fit(`${o.name} for institutional clean cooking. ${o.body}`),
  }])
);
const SERVICE_SEO = Object.fromEntries(
  SERVICES.filter((s) => s.to.startsWith('/what-we-do/')).map((s) => [s.to, {
    title: `${s.name} | Ignis`,
    description: fit(`${s.name} for institutional clean cooking. ${s.intro}`),
  }])
);
const AUDIENCE_SEO = Object.fromEntries(
  audiences.map((a) => [`/who-we-work-with/${a.id}`, {
    title: `Clean Cooking for ${a.eyebrow} | Ignis`,
    description: fit(`Institutional clean cooking with Ignis for ${a.eyebrow.toLowerCase()}: ${a.card.charAt(0).toLowerCase()}${a.card.slice(1)}`),
    ...(a.image ? { image: a.image } : {}),
  }])
);
const FIELD_NOTE_SEO = Object.fromEntries(
  publishedFieldNotes.map((n) => [`/our-work/field-notes/${n.slug}`, {
    title: `${n.headline} | Ignis Field Notes`,
    description: fit(`${n.type} from institutional clean cooking work: ${n.headline}. Observations and lessons from operating kitchens.`),
  }])
);
// Only PUBLISHED case studies are routed, prerendered and listed.
const CASE_SEO = Object.fromEntries(
  publishedCaseStudies.map((c) => [`/our-work/case-studies/${c.slug}`, {
    title: `${c.project} | Ignis Case Study`,
    description: fit(`Institutional clean cooking case study: ${c.summary}`),
  }])
);

export const SEO = { ...STATIC, ...OFFER_SEO, ...SERVICE_SEO, ...AUDIENCE_SEO, ...FIELD_NOTE_SEO, ...CASE_SEO };

// Routes the prerender step writes to disk. /404 is emitted separately.
export const PRERENDER_ROUTES = Object.keys(SEO).filter((p) => p !== '/404');

export function seoFor(path) {
  const entry = SEO[path] || SEO['/'];
  return {
    title: entry.title,
    description: entry.description,
    path,
    image: entry.image || DEFAULT_OG_IMAGE,
    noindex: !!entry.noindex,
  };
}

// Absolute URL helper shared by the hook and the prerender step.
export const abs = (p) => (p.startsWith('http') ? p : SITE.url + p);
