import { SITE } from "../lib/site.js";
import { ASILI } from "./products.js";
import { OFFERS } from "./offers.js";

// Igni's hand-written answers: short facts the site states in scattered places
// (contact details, Asili specs) and the conversational basics. Matched in the
// browser by lib/igni/localAnswer.js before anything reaches the AI.
// `keywords` are plain words; the matcher stems them. Only facts already
// published on the site belong here. `images` are ids from content/igni-images.js.
const spec = (label) => ASILI.specs.find((s) => s.label === label)?.value;
const offer = (slug) => OFFERS.find((o) => o.slug === slug);

export const LINKS = {
  assessment: { label: "Request an Assessment", to: "/talk-to-ignis#assessment" },
  partner: { label: "Partner with Ignis", to: "/talk-to-ignis#partner" },
  talk: { label: "Talk to Ignis", to: "/talk-to-ignis" },
  whatsapp: { label: "WhatsApp us", to: `https://wa.me/${SITE.whatsapp}` },
  asili: { label: "See Asili", to: "/what-we-do/electric-cooking" },
};

export const INTENTS = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "habari", "jambo", "hujambo", "mambo", "morning", "afternoon", "evening"],
    small: true,
    text: "Hello, I'm Igni, the Ignis assistant. Ask me about our clean-cooking solutions, the Asili cooker, financing or how to get started.",
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank", "asante", "great", "ok", "okay", "cool", "bye", "goodbye", "kwaheri"],
    small: true,
    text: "You're welcome. If you'd like to talk to the team, the links below are the quickest way.",
    links: [LINKS.assessment, LINKS.whatsapp],
  },
  {
    id: "human",
    keywords: ["human", "person", "someone", "agent", "call", "speak", "talk", "contact", "reach", "team", "sales", "representative"],
    text: `You can reach the Ignis team on WhatsApp or by phone on ${SITE.phone}, by email at ${SITE.email}, or through the forms on our contact page.`,
    links: [LINKS.whatsapp, LINKS.talk],
  },
  {
    id: "location",
    keywords: ["where", "office", "located", "location", "address", "find", "visit", "map", "directions", "nairobi"],
    text: `Our office is at ${SITE.address.street}, Nairobi (${SITE.address.poBox}). Directions are on the Talk to Ignis page.`,
    links: [{ label: "Directions", to: "/talk-to-ignis" }],
  },
  {
    id: "email",
    keywords: ["email", "mail", "address", "write"],
    text: `Email us at ${SITE.email}.`,
    links: [{ label: SITE.email, to: `mailto:${SITE.email}` }],
  },
  {
    id: "phone",
    keywords: ["phone", "number", "call", "whatsapp", "telephone", "mobile", "simu"],
    text: `Call or WhatsApp the team on ${SITE.phone}.`,
    links: [LINKS.whatsapp],
  },
  {
    id: "asili",
    images: ["asili-front"],
    keywords: ["asili", "cooker", "electric", "pressure", "product", "epc"],
    text: `Asili is the Ignis electric pressure cooker: a ${spec("Capacity")} pot, ${spec("Power")}, a sealed locking lid and twelve one-touch programmes, including githeri, uji, rice, stews and kuku, labelled in English and Kiswahili.`,
    links: [LINKS.asili],
    source: { url: "/what-we-do/electric-cooking", title: "Electric Cooking" },
  },
  {
    id: "asili-specs",
    keywords: ["asili", "capacity", "litre", "liter", "size", "big", "power", "watt", "watts", "voltage", "volt", "spec", "specs", "specification"],
    text: `Asili specs from its rating label: capacity ${spec("Capacity")}, power ${spec("Power")}, supply ${spec("Supply")}, marked ${spec("Marks")}.`,
    links: [LINKS.asili],
    source: { url: "/what-we-do/electric-cooking", title: "Electric Cooking" },
  },
  {
    id: "asili-programmes",
    images: ["asili-panel"],
    keywords: ["asili", "programme", "program", "button", "cook", "dish", "githeri", "uji", "rice", "menu", "mode"],
    text: `Asili has ${ASILI.programmes.length} one-touch programmes: ${ASILI.programmes.join(", ")}. The panel also has Low/High Pressure, Less/Normal/More, Delay Start and Warm/Cancel.`,
    links: [LINKS.asili],
    source: { url: "/what-we-do/electric-cooking", title: "Electric Cooking" },
  },
  {
    id: "asili-price",
    keywords: ["asili", "price", "cost", "much", "buy", "purchase", "order", "bei"],
    text: "We haven't published an Asili price yet. Send us a message and the team will share current pricing and availability.",
    links: [LINKS.whatsapp, LINKS.talk],
  },
  {
    id: "about",
    images: ["school-meal"],
    keywords: ["company", "about", "business", "mission"],
    phrases: [/\bwhat (do|does) (you|ignis) do\b/i, /\bwho (are|is) (you|ignis)\b/i, /\babout ignis\b/i],
    text: `${SITE.description} We assess real demand, structure projects, connect the right technology and finance, deliver the transition and measure what happens.`,
    links: [{ label: "About Ignis", to: "/about" }, { label: "What We Do", to: "/what-we-do" }],
    source: { url: "/about", title: "About" },
  },
  {
    id: "steam",
    images: ["steam-kitchen"],
    keywords: ["steam", "institutional", "kettle", "jacketed", "generator", "boiler"],
    text: `Institutional Steam: ${offer("institutional-steam").body}`,
    links: [{ label: "Explore Institutional Steam", to: "/what-we-do/institutional-steam" }],
    source: { url: "/what-we-do/institutional-steam", title: "Institutional Steam" },
  },
  {
    id: "programmes",
    images: ["partners-workshop"],
    keywords: ["programme", "programmes", "county", "counties", "government", "multiple", "clean-cooking"],
    text: `Clean-Cooking Programmes: ${offer("clean-cooking-programmes").body}`,
    links: [{ label: "Explore Clean-Cooking Programmes", to: "/what-we-do/clean-cooking-programmes" }],
    source: { url: "/what-we-do/clean-cooking-programmes", title: "Clean-Cooking Programmes" },
  },
  {
    id: "cleancookiq",
    images: ["cciq-map"],
    keywords: ["cleancookiq", "clean", "cook", "iq", "platform", "data", "dashboard", "monitoring"],
    text: "CleanCookIQ is Ignis's digital infrastructure for collecting, validating, analysing and managing institutional clean-cooking transition data: a national institution map, fuel and county intelligence, and tracking from assessment to monitoring.",
    links: [{ label: "About CleanCookIQ", to: "/cleancookiq" }, { label: "Visit cleancookiq.com", to: "https://cleancookiq.com/" }],
    source: { url: "/cleancookiq", title: "CleanCookIQ" },
  },
  {
    id: "audiences",
    keywords: ["serve", "clients", "customers", "audience"],
    phrases: [/\bwho (do|does) (you|ignis) (work|partner) with\b/i, /\bwho (do|does) (you|ignis) serve\b/i, /\bwho are your (clients|customers|partners)\b/i],
    text: "We work with institutions (schools, hospitals, correctional facilities), governments and counties, financiers, technology providers and development partners.",
    links: [{ label: "Who We Work With", to: "/who-we-work-with" }],
    source: { url: "/who-we-work-with", title: "Who We Work With" },
  },
  {
    // Keep in step with the country list in components/home/Geography.jsx.
    id: "where-we-work",
    images: ["kisumu"],
    keywords: ["countries", "country", "operate", "uganda", "ethiopia", "mozambique", "sierra", "leone", "africa"],
    phrases: [/\bwhere (do|does) (you|ignis) (work|operate)\b/i, /\bwhich countries\b/i],
    text: "Our active work is in Kenya. We are in market development in Ethiopia, Sierra Leone, Mozambique and Uganda, building from Kenyan delivery experience towards a model that can work across African markets.",
    links: [{ label: "Where We Work", to: "/where-we-work" }],
    source: { url: "/where-we-work", title: "Where We Work" },
  },
  {
    id: "assessment",
    keywords: ["start", "begin", "assessment", "apply", "sign", "register", "next", "step", "started"],
    text: "The first step is a kitchen assessment: we look at your meal volumes, fuel use and kitchen conditions, then size the right solution. Request one on the Talk to Ignis page.",
    links: [LINKS.assessment],
  },
];
