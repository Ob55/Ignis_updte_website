// Public, citable sources behind the figures shown on the site. Each entry has a
// stable numeric id referenced from content/fuel-models.js (sourceIds) and rendered
// as a footnote in components/home/SavingsCalc.jsx. Where a figure is an internal
// Ignis assessment estimate rather than a third-party number, we say so plainly.
export const sources = [
  {
    id: 1,
    label:
      'Daily Nation — "How a school ditched a Sh300,000 firewood bill for cheaper clean energy" (2025)',
    short: "Daily Nation, 2025",
    url: "https://nation.africa/kenya/climate/-how-a-school-ditched-a-sh300-000-firewood-bill-for-cheaper-clean-energy-5430204",
  },
  {
    id: 2,
    label:
      'Clean Cooking Alliance — "Kenya Makes the Business Case for Institutional Clean Cooking" (~1M tonnes firewood/yr, ~KES 6B school fuel bill; cooking ≈ up to 40% of a school meal\'s cost)',
    short: "Clean Cooking Alliance, 2026",
    url: "https://cleancooking.org/news/kenya-makes-the-business-case-for-institutional-clean-cooking/",
  },
  {
    id: 3,
    label:
      'Daily Nation — "Five clean cooking energy firms seek Sh5.5bn funding amid Koko collapse" (up to 60% fuel savings; 400 institutions targeted by 2027)',
    short: "Daily Nation, Apr 2026",
    url: "https://nation.africa/kenya/business/five-clean-cooking-energy-firms-seek-sh5-5bn-funding-amid-koko-collapse-5436044",
  },
  {
    id: 4,
    label:
      "Ignis internal site-assessment estimate — scaled from the reported school benchmark; verified per site during commissioning, not a third-party published figure.",
    short: "Ignis site assessment",
    url: null,
  },
  // Third-party efficiency figures for the "Share of fuel energy reaching the pot"
  // chart (What We Do page) — NOT Ignis measurements.
  // TODO(content): add the publication URLs for ids 5–7 (not supplied in the brief).
  {
    id: 5,
    label:
      "Aprovecho Research Center (2026), citing Urban et al.: 11.3% average across 254 field tests of open fires in Malawi, Ghana and Kenya.",
    short: "Aprovecho Research Center, 2026",
    url: null,
  },
  {
    id: 6,
    label: "Low-Tech Magazine (2014): well-tended open fires reach 20–30%.",
    short: "Low-Tech Magazine, 2014",
    url: null,
  },
  {
    id: 7,
    label: "Shengzhou Stove Manufacturer (2026): 62% for an improved institutional stove. Vendor figure.",
    short: "Shengzhou Stove Manufacturer, 2026",
    url: null,
  },
];

export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]));
