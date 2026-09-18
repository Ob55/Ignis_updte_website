export const SITE = {
  name: "IGNIS Innovation Africa",
  // One legal name string, used identically everywhere (PRD §8.3).
  legalName: "IGNIS Innovation Africa",
  alternateName: ["Ignis Innovations", "IGNIS"],
  url: "https://ignis-innovation.com",
  tagline: "Cook Smarter, Live Better.",
  description: "Ignis Innovation Africa is an energy services company that manages and implements clean energy programmes for institutions across Africa, turning existing fuel budgets into modern cooking infrastructure with no upfront capital.",
  locality: "Nairobi",
  country: "KE",
  email: "info@ignis-innovation.com",
  phone: "+254 724 326256",
  // tel: hrefs must not contain spaces — some dialers drop the call otherwise.
  phoneHref: "+254724326256",
  whatsapp: "254724326256",
  // Single source of truth for the office address; consumed by the contact
  // channels block, the map aside, and the JSON-LD in index.html.
  address: {
    short: "Lower Kabete Rd, Nairobi",
    street: "The Pavilion, Lower Kabete Road",
    poBox: "P.O. Box 65603-00607",
    plusCode: "PQWX+232 Nairobi"
  },
  social: {
    linkedin: "https://www.linkedin.com/company/ignis-innovation-africa",
    instagram: "https://www.instagram.com/ignis_innovation_africa/",
    x: "https://x.com/igaborafrica"
  }
};

const PLUS = encodeURIComponent(SITE.address.plusCode);
export const MAPS_EMBED = `https://www.google.com/maps?q=${PLUS}&output=embed`;
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${PLUS}`;
