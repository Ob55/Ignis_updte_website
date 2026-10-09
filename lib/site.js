export const SITE = {
  // "Ignis" in running text; the legal name only in footer/legal lines.
  name: "Ignis",
  legalName: "Ignis Innovation Limited",
  alternateName: ["Ignis Innovation", "IGNIS Innovation Africa", "IGNIS"],
  regNo: "PVT-RXUMG2GY",
  url: "https://ignis-innovation.com",
  tagline: "Cook Smarter, Live Better.",
  description: "Ignis helps schools, hospitals and other institutions switch from firewood to clean, efficient cooking, financed from the fuel budget they already have.",
  locality: "Nairobi",
  country: "KE",
  email: "info@ignis-innovation.com",
  phone: "+254 724 326256",
  // Shown on the contact page. The footer phone line is gated separately by
  // FOOTER_PHONE in content/flags.js (TODO(data)).
  // tel: hrefs must not contain spaces — some dialers drop the call otherwise.
  phoneHref: "+254724326256",
  whatsapp: "254724326256",
  // Single source of truth for the office address; consumed by the contact
  // channels block, the map aside, and the JSON-LD in index.html.
  address: {
    short: "Lower Kabete Rd, Nairobi",
    street: "The Pavilion, Lower Kabete Road",
    poBox: "P.O. Box 65603-00607, Kamiti, Nairobi",
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
