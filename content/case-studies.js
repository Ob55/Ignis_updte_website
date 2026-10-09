// Case studies / programme examples. Reusable template — fields:
//   project, programme, location, client (approved name only), problem, scope (what Ignis
//   did; falls back to `role`), data (falls back to verified `scale`), intervention,
//   result (1–3 verified outcomes), learned, next ({status, text} — "proposed"
//   renders as "Proposed"), journey (steps with status), approvals (internal, never rendered),
//   published (only true once every approval is in).
// Per the SOP, project details publish only with counterparty permission.
// Unpublished entries are not routed, prerendered or listed in the sitemap.
export const caseStudies = [
  {
    slug: "taita-taveta",
    published: false,
    // Everything here stays hidden: SHOW_TAITA_TAVETA = false (content/flags.js) and published: false.
    // TODO(partner-approval): IRENA and partners must approve before naming them (decision D4).
    // Do not publish confidential field findings.
    approvals: { irena: false, gamos: false, ccak: false },
    project: "Programme example: Taita-Taveta County.",
    // TODO(partner-approval): programme description names IRENA and A2CT.
    programme:
      "Institutional clean-cooking verification in Taita-Taveta County, under IRENA's A2CT clean-cooking financing work",
    location: "Taita-Taveta County, Kenya",
    client: null, // TODO(partner-approval): approved client/partner name
    image: null, // TODO(content): county map or programme photo
    imageAlt: "",
    // Default homepage card copy (Block 10, first prompt).
    summary:
      "Working within IRENA's clean-cooking financing programme, Ignis supported field verification of institutional kitchens, examining fuel use, kitchen conditions, data quality and readiness to transition. The work is helping identify what information is reliable, where more validation is needed, and how better evidence can support future financing and transition planning.",
    // Alternative shorter card, used automatically once `scale` is verified.
    // {institutions} is filled from scale.institutions; never rendered with a placeholder.
    summaryVerified:
      "Working within IRENA's clean-cooking financing programme, Ignis verified {institutions} institutional kitchens across Taita-Taveta, checking fuel use, kitchen conditions and readiness to switch. The findings are helping partners target finance where it will work.",
    // TODO(confirm): Ignis's role wording.
    role: "Field verification of institutions, site visits, and analysis of data quality and access issues",
    // TODO(partner-approval): naming GAMOS and CCAK.
    output: "Deep-dive report; findings and recommendations shared with sector partners (GAMOS and CCAK)",
    // TODO(data): "[X] institutions verified across [X] sub-counties". Never render placeholders;
    // the scale line renders only when both numbers are filled and verified.
    scale: { institutions: null, subCounties: null, verified: false },
    stats: [], // TODO(data): three verified numbers
    problem: null, // TODO(content)
    scope: null, // derived from `role` on the page
    data: null, // derived from `scale` on the page
    intervention: null, // TODO(content)
    result: [], // TODO(data): 1–3 verified outcomes
    learned: null, // TODO(content)
    // Must always be presented as PROPOSED, never as completed work.
    next: {
      status: "proposed",
      text: "A CleanCookIQ-led second-round validation of a selected group of institutions",
    },
    // Programme journey (components/ui/ProgrammeJourney.jsx).
    // TODO(confirm): stage status for each step with the team.
    journey: [
      { label: "County mapping", status: "completed" },
      { label: "Field verification", status: "completed" },
      { label: "Findings shared with partners", status: "completed" },
      { label: "CleanCookIQ re-validation", status: "proposed" },
      { label: "Project structuring", status: "future" },
      { label: "Financing & deployment", status: "future" },
      { label: "Monitoring & verification", status: "future" },
    ],
  },
  {
    slug: "naconek-machakos",
    published: false, // TODO(partner-approval): NACONEK — LPO issued; confirm publicity before publishing
    approvals: { naconek: false },
    project: "Institutional kitchen for a national school",
    location: "Machakos, Kenya",
    client: null,
    image: null,
    imageAlt: "",
    summary: "Clean cooking infrastructure for a national school. Design, delivery and monitoring under one agreement.",
    role: null, output: null, stats: [], problem: null, scope: null, data: null,
    intervention: null, result: [], learned: null, next: null, journey: [], scale: null,
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.published);
export const getCaseStudy = (slug) => publishedCaseStudies.find((c) => c.slug === slug);
export const getAnyCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);

// "[X] institutions verified across [X] sub-counties", only when both are verified.
export function scaleLine(c) {
  const sc = c.scale;
  if (!sc || !sc.verified || !(sc.institutions > 0) || !(sc.subCounties > 0)) return null;
  return `${sc.institutions.toLocaleString("en-KE")} institutions verified across ${sc.subCounties} sub-counties`;
}

// Card copy: the verified variant once the institution count is verified, else the default.
export function cardSummary(c) {
  if (c.summaryVerified && c.scale?.verified && c.scale.institutions > 0) {
    return c.summaryVerified.replace("{institutions}", c.scale.institutions.toLocaleString("en-KE"));
  }
  return c.summary;
}
