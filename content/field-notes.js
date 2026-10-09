// Field Notes. Story template (props): headline, type, audience, heroImage,
// keyNumber, lesson, serviceLink, body — plus `draftBrief`, an INTERNAL outline
// that is never rendered, and `published`.
// Format every story follows: plain headline · one photo · 300–600 words ·
// one key number · one practical lesson · one link to the relevant service.
// Until `body` is written, the story page shows only its headline, tags and
// service link. Unpublished stories are not routed, listed or prerendered.
// `coverImage` is THEMATIC cover art for the story card only (a credited stock
// photo, not from the story). The story's own photo is `heroImage`, still
// TODO(data) for every story; once set, it replaces the cover on the card too.

// publishSchedule (internal): launch with three stories, then publish monthly.
export const PUBLISH_SCHEDULE = "Launch with three stories, then publish monthly.";

export const FIELD_NOTES = [
  {
    slug: "what-a-1200-learner-kitchen-spends-on-firewood",
    coverImage: "/img/hero/firewood.jpg", coverImageAlt: "Women carrying bundles of firewood along a forest path in Kenya",
    published: true,
    headline: "What a 1,200-learner kitchen really spends on firewood",
    type: "Cost story",
    audience: ["Institutions", "Counties"],
    serviceLink: { to: "/financing", label: "How the transition is financed" },
    heroImage: null, heroImageAlt: "", keyNumber: null, lesson: null, body: null,
    // TODO(data): Ignis's own field figures, photo, key number and lesson.
    draftBrief:
      "Break down one school's fuel bill per term, per meal and per learner, and compare it with the steam scenario. " +
      "Public reporting shows schools spending close to Sh300,000 a term on firewood (Daily Nation, April 2026).",
    // TODO(confirm): the homepage savings example (content/fuel-models.js) reads a Daily Nation
    // Sh300,000 figure as MONTHLY (KES 3.6M/yr); this brief says PER TERM. Reconcile before publishing.
  },
  {
    slug: "wet-wood-late-lunch",
    coverImage: "/img/hero/open-fire-cooking.jpg", coverImageAlt: "Women cooking in pots over open fires outside a home in Kenya",
    published: true,
    headline: "Wet wood, late lunch: how the rains hit firewood kitchens",
    type: "Operations story",
    audience: ["Institutions"],
    serviceLink: { to: "/what-we-do/institutional-steam", label: "Explore Institutional Steam" },
    heroImage: null, heroImageAlt: "", keyNumber: null, lesson: null, body: null,
    // TODO(data): field observations, photo, key number and lesson.
    draftBrief:
      "What happens to meal times and cooks' workload in the rainy season, and how an enclosed system avoids it.",
  },
  {
    slug: "a-day-in-a-steam-kitchen",
    coverImage: "/img/hero/steam-kettle.jpg", coverImageAlt: "A chef cooking in a large steam-jacketed kettle",
    published: true,
    headline: "A day in a steam kitchen",
    type: "People story",
    audience: ["All visitors", "LinkedIn"],
    serviceLink: { to: "/what-we-do/institutional-steam", label: "Explore Institutional Steam" },
    heroImage: null, heroImageAlt: "", keyNumber: null, lesson: null, body: null,
    // TODO(data): school name, cook consent, before/after photos, the cook's own words.
    draftBrief:
      "Follow a head cook from 5 a.m. to the last meal. Include before and after photos of the kitchen and the cook's own words.",
    // TODO(data): sample opening — may render as the intro ONLY once [school] is filled
    // and the cook has consented:
    // "At 5 a.m., the head cook at [school] used to start her day coaxing a fire out of damp
    //  wood. Today she opens a steam valve. Here is what changed in her kitchen, and what it
    //  means for the 1,200 learners she feeds."
  },
  {
    slug: "checking-the-data-twice",
    coverImage: "/img/hero/field-data-kenya.jpg", coverImageAlt: "A field worker in Kenya recording data on a phone",
    published: false,
    // TODO(partner-approval): keep unpublished until IRENA and partners approve.
    headline: "Checking the data twice: lessons from verifying institutional kitchens",
    type: "Data and programme story",
    audience: ["Funders", "Counties", "Partners"],
    serviceLink: { to: "/cleancookiq", label: "Explore CleanCookIQ" },
    heroImage: null, heroImageAlt: "", keyNumber: null, lesson: null, body: null,
    // TODO(data): facts and photos.
    draftBrief:
      "What field verification in Taita-Taveta taught Ignis about data quality and access, and how CleanCookIQ validates field data.",
  },
  {
    slug: "why-steam-the-engineering-in-plain-words",
    coverImage: "/img/solutions-cookers.jpg", coverImageAlt: "Installed cookers in a clean-cooking school kitchen in Kenya",
    published: true,
    headline: "Why steam? The engineering in plain words",
    type: "Explainer",
    audience: ["Financiers", "Technology partners"],
    serviceLink: { to: "/what-we-do#why-steam", label: "Why steam costs less" },
    heroImage: null, heroImageAlt: "", keyNumber: null, lesson: null, body: null,
    // TODO(confirm): Ignis-measured efficiency before any Ignis figure appears.
    draftBrief:
      "The efficiency story, with Ignis's own measured figures. Third-party context (label as third-party, not Ignis " +
      "measurements): open fires delivered on average about 11% of the wood's energy to the pot across 254 field tests " +
      "in Malawi, Ghana and Kenya (Aprovecho Research Center 2026, citing Urban et al.); a well-tended fire reaches " +
      "20–30% (Low-Tech Magazine 2014); an improved institutional stove is claimed at 62% (Shengzhou Stove Manufacturer " +
      "2026, vendor figure). At 11% a kitchen burns about nine times the wood its food needs; at 62%, about 1.6 times.",
  },
];

export const publishedFieldNotes = FIELD_NOTES.filter((s) => s.published);
export const getFieldNote = (slug) => publishedFieldNotes.find((s) => s.slug === slug);
