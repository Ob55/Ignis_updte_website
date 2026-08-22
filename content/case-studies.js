// Case studies. Per the SOP, project details publish only with counterparty
// permission: keep `published: false` until confirmed, then flip to true.
// Format: where, with whom, what IGNIS does, one metric. No adjectives.
export const caseStudies = [
  {
    id: "national-survey",
    published: true,
    eyebrow: "Kenya · National survey",
    title: "300+ institutions assessed across Kenya",
    body: "A nationwide assessment of institutional cooking: meal volumes, fuel spend and site conditions across schools, hospitals and correctional facilities. The data behind every system we size and every savings figure we quote.",
    metric: "300+ institutions",
  },
  {
    id: "taita-taveta",
    published: false, // IRENA/Gamos/CCAK/MECS — signed; awaiting logo/name permission
    eyebrow: "Taita Taveta · Market strengthening",
    title: "Institutional clean cooking market strengthening",
    body: "Cooking and cost data from schools and businesses, financial-case analysis and financial-institution engagement, with consortium partners. IGNIS leads data, verification and finance engagement.",
    metric: "Consortium programme",
  },
  {
    id: "naconek-machakos",
    published: false, // NACONEK — LPO issued; confirm publicity before publishing
    eyebrow: "Machakos · National school",
    title: "Institutional kitchen for a national school",
    body: "Clean cooking infrastructure delivered for a national school, the first engagement of its kind. Design, delivery and monitoring under one agreement.",
    metric: "First of programme",
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.published);
