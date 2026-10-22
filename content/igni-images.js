import { HERO } from "./hero-images.js";
import { ASILI } from "./products.js";

// Pictures Igni may show in chat. 640px copies live in public/img/igni/ (the
// Asili ones reuse public/img/asili/*-sm.jpg). Both the local answers and the
// AI can only show images from this list: api/chat.js gives the AI the ids and
// descriptions, and the chat renderer drops any image path not listed here.
// `about` tells the AI when the picture is relevant; `alt` is what it shows.
const asili = (i) => ASILI.features[i].image;

export const IGNI_IMAGES = [
  { id: "asili-front", src: ASILI.image.sm ?? "/img/asili/asili-02-sm.jpg", alt: ASILI.image.alt, about: "Asili electric pressure cooker, front view with the control panel" },
  { id: "asili-panel", src: asili(0).sm, alt: asili(0).alt, about: "Asili control panel close-up: one-touch programmes in English and Kiswahili" },
  { id: "asili-inner-pot", src: asili(2).sm, alt: asili(2).alt, about: "Asili with the lid off, showing the removable stainless steel inner pot" },
  { id: "asili-lid-open", src: asili(4).sm, alt: asili(4).alt, about: "Asili with its lid swung open for cleaning" },
  { id: "steam-kitchen", src: "/img/igni/steam-kitchen.jpg", alt: HERO["steam-kettle"].alt, about: "Institutional steam: a chef cooking beans in a steam-jacketed kettle" },
  { id: "clean-burners", src: "/img/igni/clean-burners.jpg", alt: HERO["clean-cooking-tech"].alt, about: "Clean-fuel burners in a Kenyan school kitchen" },
  { id: "open-fire", src: "/img/igni/open-fire.jpg", alt: HERO["open-fire-cooking"].alt, about: "The problem: cooking over open fires with firewood" },
  { id: "firewood", src: "/img/igni/firewood.jpg", alt: HERO["firewood"].alt, about: "The problem: women carrying firewood" },
  { id: "school-meal", src: "/img/igni/school-meal.jpg", alt: HERO["school-meal"].alt, about: "Pupils eating a school meal: the institutions Ignis serves" },
  { id: "dining-hall", src: "/img/igni/dining-hall.jpg", alt: HERO["institutions-dining"].alt, about: "A secondary-school dining hall in Kenya" },
  { id: "partners-workshop", src: "/img/igni/partners-workshop.jpg", alt: HERO["partners-workshop"].alt, about: "Clean-cooking programmes: partners planning together in Kenya" },
  { id: "cciq-map", src: "/img/igni/cciq-map.jpg", alt: "CleanCookIQ National Institution Map of Kenya with institution markers", about: "CleanCookIQ national institution map" },
  { id: "cciq-intelligence", src: "/img/igni/cciq-intelligence.jpg", alt: "CleanCookIQ dashboard with institutions by primary cooking fuel", about: "CleanCookIQ fuel and institution data dashboard" },
  { id: "cciq-counties", src: "/img/igni/cciq-counties.jpg", alt: "CleanCookIQ County Intelligence page with county profiles", about: "CleanCookIQ county profiles for Kenya's 47 counties" },
  { id: "kisumu", src: "/img/igni/kisumu.jpg", alt: HERO["kisumu"].alt, about: "Kenya, where Ignis works today" },
];

export const IGNI_IMAGE_SRCS = new Set(IGNI_IMAGES.map((i) => i.src));
export const igniImage = (id) => IGNI_IMAGES.find((i) => i.id === id);
