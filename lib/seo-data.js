import { SITE } from '@/lib/site';

// Single source of truth for per-route <head> data. Both the client-side
// useSeo() hook and the build-time prerender step read from here, so the tags a
// crawler sees in raw HTML and the tags React sets after hydration cannot drift.
//
// Copy rule for this site: every description leads on INSTITUTIONAL CLEAN
// COOKING, not on generic "energy services". Keep each 70-160 characters.
export const DEFAULT_OG_IMAGE = '/og-default.png';

export const SEO = {
  '/': {
    // The brand is searched both ways, so the full name carries the title and
    // leads the description, with the short name used naturally alongside it.
    title: 'Ignis Innovation | Clean Cooking for African Institutions',
    description:
      'Ignis Innovation delivers clean cooking and clean energy for institutions across East Africa. Ignis runs the system and you pay from your existing fuel budget.',
  },
  '/services': {
    title: 'Clean Cooking Solutions & Financing | IGNIS',
    description:
      'Institutional clean cooking delivered end to end: design, financing, installation, maintenance and monitoring under one agreement, with no upfront capital.',
  },
  '/where-we-work': {
    title: 'Where We Work | IGNIS',
    description:
      'Schools, hospitals, prisons, industry, financiers and delivery partners, connected by one institutional clean cooking model funded from existing fuel budgets.',
  },
  '/where-we-work/institutions': {
    title: 'Clean Cooking for Institutions | IGNIS',
    description:
      'Clean cooking for schools, hospitals, prisons and faith institutions. No upfront cost, a fixed fee below your current fuel bill, and ownership at end of term.',
  },
  '/where-we-work/industry': {
    title: 'Clean Energy for Industry | IGNIS',
    description:
      'Institutional and industrial clean cooking for operations with large thermal loads across Africa. The same model, the same financing, no upfront capital.',
  },
  '/where-we-work/financiers': {
    title: 'For Financiers & Investors | IGNIS',
    description:
      'Contracted revenue from institutional clean cooking: defined demand, proven hardware and dMRV-verified savings across a growing African project pipeline.',
  },
  '/where-we-work/delivery-partners': {
    title: 'For Delivery Partners | IGNIS',
    description:
      'Partner with IGNIS to install and service institutional clean cooking systems across African markets, with training, monitoring and a steady project pipeline.',
  },
  '/about': {
    title: 'About IGNIS Innovation Africa',
    description:
      'IGNIS Innovation Africa builds the delivery and financing infrastructure for institutional clean cooking, Kenya-proven and working across the continent.',
    image: '/img/about.jpg',
  },
  '/blog': {
    title: 'Field Notes & Fuel Data | IGNIS',
    description:
      'Commissioning reports, fuel consumption data and case studies from live institutional clean cooking sites run by IGNIS across Africa.',
  },
  '/platform': {
    title: 'CleanCookIQ: Measured & Verified | IGNIS',
    description:
      'CleanCookIQ is the IGNIS digital platform that measures, reports and verifies fuel savings across every institutional clean cooking site we run.',
  },
  '/scoping-call': {
    title: 'Request a Kitchen Assessment | IGNIS',
    description:
      'Request an institutional clean cooking assessment. Send your name, email and phone, and we reply with a system design and a savings figure for your kitchen.',
  },
  '/privacy': {
    title: 'Privacy Policy | IGNIS',
    description:
      'How IGNIS Innovation Africa collects, uses and protects the information you share when you enquire about institutional clean cooking services.',
  },
  '/terms': {
    title: 'Terms of Use | IGNIS',
    description:
      'The terms on which IGNIS Innovation Africa makes this institutional clean cooking website and its assessment request service available to you.',
  },
  '/credits': {
    title: 'Sources & Credits | IGNIS',
    description:
      'Sources behind the institutional clean cooking figures we publish, plus photography and typeface credits for the IGNIS Innovation Africa website.',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | IGNIS',
    description:
      'What cookies this site sets, why analytics cookies stay off until you accept them, and how to change your choice at any time. IGNIS Innovation Africa.',
  },
  '/thank-you': {
    title: 'Thank You | IGNIS',
    description:
      'Thank you for your institutional clean cooking enquiry. The IGNIS team will reply within two working days with a system design and a savings figure.',
    noindex: true,
  },
  '/404': {
    title: 'Page Not Found | IGNIS',
    description:
      'That page does not exist or has moved. Explore IGNIS institutional clean cooking services for schools, hospitals and industry across Africa.',
    noindex: true,
  },
};

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
