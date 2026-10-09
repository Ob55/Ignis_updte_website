// The four "What We Do" service lines (nav sub-items). "Financing & Portfolio
// Development" lives at /financing; the rest are stub pages at /what-we-do/<slug>.
export const SERVICES = [
  {
    slug: "institutional-energy-transition",
    hero: "institutional-stoves",
    to: "/what-we-do/institutional-energy-transition",
    name: "Institutional Energy Transition",
    intro: "Moving institutional kitchens from firewood to clean, efficient cooking: assessment, system design, deployment and ongoing performance.",
    // TODO(content): Institutional Energy Transition page body
  },
  {
    slug: "programme-development",
    hero: "programme-map",
    to: "/what-we-do/programme-development",
    name: "Programme Development & Implementation",
    intro: "Coordinated transition across multiple institutions, from demand mapping and validation through financing, deployment and monitoring.",
    // TODO(content): Programme Development & Implementation page body
  },
  {
    slug: "financing",
    to: "/financing",
    name: "Financing & Portfolio Development",
  },
  {
    slug: "monitoring-data-verification",
    hero: "field-data-kenya",
    to: "/what-we-do/monitoring-data-verification",
    name: "Monitoring, Data & Verification",
    intro: "Tracking energy use, system performance, savings and uptime through CleanCookIQ, and producing evidence partners can use.",
    // TODO(content): Monitoring, Data & Verification page body
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug && s.to.startsWith("/what-we-do/"));
