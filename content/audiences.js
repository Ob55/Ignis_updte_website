// The four audiences for "Who we serve". Each now has its own page at
// /who-we-serve/<id>; the base /who-we-serve route is a hub that links out.
// Copy rules: no em dashes; bursar-readable everywhere except Financiers, the
// only audience allowed technical financial language (CESA, AssetCo, dMRV).
export const audiences = [
  {
    id: 'institutions',
    eyebrow: 'Institutions',
    // PageHero segments: strings, plus one accented serif fragment.
    segments: ['Clean energy for schools, hospitals,', { text: 'prisons and faith institutions.', className: 'serif grad-flame' }],
    intro:
      'No upfront cost. A fixed monthly fee from your existing fuel budget, less than you pay today. Ownership transfers to you at the end of term.',
    blurb: 'No upfront cost. A fixed monthly fee from the fuel budget you already spend, and the system becomes yours at the end of term.',
    points: [
      { k: 'No upfront cost', p: 'We finance, install and maintain the clean energy system. Your institution pays nothing upfront.' },
      { k: 'Fixed monthly fee', p: 'A predictable service fee from your existing fuel budget, less than you pay today for inefficient fuel.' },
      { k: 'Ownership transfers', p: 'At the end of the contract, the infrastructure transfers to your institution. It is yours to keep.' },
      { k: 'Maintained and monitored', p: 'Every system is maintained and digitally monitored for the full contract term. Performance is verified continuously.' },
    ],
  },
  {
    id: 'industry',
    eyebrow: 'Industry',
    segments: ['Clean energy for industry', { text: 'and commercial operations.', className: 'serif grad-flame' }],
    intro:
      'Clean energy services for industrial and commercial operations with significant thermal energy demand across Africa. This market is opening, and we are looking for early partners with significant thermal loads.',
    blurb: 'The same energy services model extended to facilities with large thermal loads. This market is opening, and we are looking for early partners.',
    points: [
      { k: 'Significant thermal demand', p: 'The same energy services model applies wherever fuel spend is large: your facility already pays for fuel, and the savings service the financing.' },
      { k: 'Early access', p: 'We are extending the institutional model into industrial applications. Early partners help shape the offer as the market opens.' },
    ],
  },
  {
    id: 'financiers',
    eyebrow: 'Financiers',
    segments: ['Structured, verified,', { text: 'portfolio-level assets.', className: 'serif grad-flame' }],
    intro:
      'For banks, DFIs, impact investors and carbon partners: a bankable pipeline delivered to one performance standard and verified from commissioning.',
    blurb: 'A bankable pipeline delivered to one performance standard and verified from commissioning, with the data you need to underwrite.',
    points: [
      { k: 'Bankable pipeline', p: 'Every institution operates under a Clean Energy Service Agreement with a fixed monthly fee, verified payment history and contractual offtake. Standardisation reduces diligence cost and enables portfolio-level underwriting.' },
      { k: 'Verified performance data', p: 'Device-level digital monitoring from commissioning. Real-time utilisation, fuel displacement, uptime and savings at portfolio level. The data you need to underwrite, not the data you hope to collect later.' },
      { k: 'Carbon that improves the return', p: 'dMRV-verified emission reductions documented from commissioning. Carbon revenue supplements project economics; the financials work without it.' },
    ],
  },
  {
    id: 'delivery-partners',
    eyebrow: 'Delivery partners',
    segments: ['OEMs, EPCs, fabricators and O&M,', { text: 'one performance standard.', className: 'serif grad-flame' }],
    intro:
      'Delivering clean energy infrastructure into a growing institutional portfolio.',
    blurb: 'Deliver into a growing institutional portfolio with standardised procurement, volume pricing and one performance standard.',
    points: [
      { k: 'OEMs and equipment manufacturers', p: 'Supply equipment into a growing portfolio with standardised procurement, volume pricing and predictable demand. We coordinate specifications, testing and quality standards.' },
      { k: 'EPCs and installation contractors', p: 'Install and commission institutional energy systems to one performance standard. We provide site assessments, design specifications and commissioning protocols. You deliver the installation.' },
      { k: 'Fabricators', p: 'Manufacture components and assemblies to portfolio-level specifications. Standardised designs mean repeatable production and growing order volumes.' },
      { k: 'O&M providers', p: 'Maintain and service deployed assets over the contract term. Regional service hubs, response SLAs and performance targets.' },
    ],
  },
];

export const getAudience = (id) => audiences.find((a) => a.id === id);
