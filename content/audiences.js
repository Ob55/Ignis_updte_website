// The five audiences under "Who We Work With" (/who-we-work-with/<id>).
// This is the ONLY place the stakeholder list is defined; the homepage lists it
// once (Block 11) from `card`.
// Copy rules: plain language for institutions; financier-specific language
// (CESA, portfolio, dMRV) is allowed only on the Financiers page.
import { School, Landmark, Banknote, Cpu, Handshake } from "lucide-react";
import { HERO } from "@/content/hero-images";

export const audiences = [
  {
    id: "institutions",
    eyebrow: "Institutions",
    icon: School,
    image: HERO["institutions-dining"].src,
    imageAlt: HERO["institutions-dining"].alt,
    card: "Understand what you spend, identify a viable transition and move to implementation.",
    segments: ["Clean cooking for schools, hospitals", { text: "and other institutions.", className: "serif grad-flame" }],
    intro: "Understand what you spend, identify a viable transition and move to implementation.",
    points: [
      { k: "Start with your fuel bill", p: "We assess your kitchen, meal volumes and current fuel spend, so the conversation starts from what you already pay." },
      { k: "A service payment, not a fuel scramble", p: "Where financing is structured, a service payment linked to your existing energy budget replaces unpredictable fuel purchasing." },
      { k: "Maintained and monitored", p: "Systems are monitored through CleanCookIQ, so energy use and performance are measured instead of estimated." },
    ],
  },
  {
    id: "governments-counties",
    eyebrow: "Governments & Counties",
    icon: Landmark,
    image: HERO["governments-counties"].src,
    imageAlt: HERO["governments-counties"].alt,
    card: "Map institutional demand, design transition programmes and monitor progress.",
    segments: ["Clean-cooking programmes for", { text: "governments and counties.", className: "serif grad-flame" }],
    intro: "Map institutional demand, design transition programmes and monitor progress.",
    points: [], // TODO(content): Governments & Counties page body
  },
  {
    id: "financiers",
    eyebrow: "Financiers",
    icon: Banknote,
    image: HERO["financiers"].src,
    imageAlt: HERO["financiers"].alt,
    card: "Access structured projects and portfolios with validated data, project economics and performance evidence.",
    segments: ["Structured projects with", { text: "validated data.", className: "serif grad-flame" }],
    intro: "Access structured projects and portfolios with validated data, project economics and performance evidence.",
    points: [
      { k: "Structured projects and portfolios", p: "Institutions transition under a Clean Energy Service Agreement (CESA) linked to their existing energy budget. Standardised structures reduce diligence cost and support portfolio-level assessment." },
      { k: "Validated data and project economics", p: "Demand is assessed and validated before a project is structured, and project economics are modelled from site data held in CleanCookIQ." },
      { k: "Performance evidence", p: "Energy use, system performance, savings and uptime are monitored after deployment, giving financiers evidence rather than estimates." },
    ],
  },
  {
    id: "technology-providers",
    eyebrow: "Technology Providers",
    icon: Cpu,
    image: HERO["clean-cooking-tech"].src,
    imageAlt: HERO["clean-cooking-tech"].alt,
    card: "Connect suitable solutions to qualified institutional demand and structured delivery opportunities.",
    segments: ["Connect your technology to", { text: "institutions ready to switch.", className: "serif grad-flame" }],
    intro: "Connect suitable solutions to qualified institutional demand and structured delivery opportunities.",
    points: [
      { k: "Equipment manufacturers", p: "Supply equipment into structured projects with clear specifications, testing and quality standards." },
      { k: "Installation contractors", p: "Install and commission institutional systems against site assessments, design specifications and commissioning protocols." },
      { k: "Operation and maintenance", p: "Maintain and service deployed systems, with performance tracked through CleanCookIQ." },
    ],
  },
  {
    id: "development-partners",
    eyebrow: "Development Partners",
    icon: Handshake,
    image: HERO["partners-workshop"].src,
    imageAlt: HERO["partners-workshop"].alt,
    card: "Design, implement and measure programmes with field-level evidence and clear transition journeys.",
    segments: ["Programmes with", { text: "field-level evidence.", className: "serif grad-flame" }],
    intro: "Design, implement and measure programmes with field-level evidence and clear transition journeys.",
    points: [], // TODO(content): Development Partners page body
  },
];

export const getAudience = (id) => audiences.find((a) => a.id === id);
