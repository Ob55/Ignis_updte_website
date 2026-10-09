// The three Ignis offers. Names must be identical on cards, buttons and pages:
// "Institutional Steam", "Electric Cooking", "Clean-Cooking Programmes".
export const OFFERS = [
  {
    slug: "institutional-steam",
    hero: "steam-kettle",
    name: "Institutional Steam",
    body: "For high-volume kitchens in schools, hospitals, correctional facilities and other institutions where steam generation is an appropriate transition pathway. We assess actual meal volumes and kitchen conditions, size the system, coordinate deployment and support ongoing performance.",
  },
  {
    slug: "electric-cooking",
    hero: "electric-cooktop",
    name: "Electric Cooking",
    // TODO(confirm): Electric Cooking audience, institutional or household (decision D5).
    // Suggested if institutional: "Efficient electric cooking for smaller institutional
    // kitchens and staff facilities, using the grid connection many schools already have."
    body: "Efficient electric cooking for applications where grid access, cooking demand and operating economics make it the right fit.",
  },
  {
    slug: "clean-cooking-programmes",
    hero: "doho-school",
    name: "Clean-Cooking Programmes",
    body: "For counties, governments and development partners seeking coordinated transition across multiple institutions, from demand mapping and validation through financing, deployment and monitoring.",
  },
];

export const getOffer = (slug) => OFFERS.find((o) => o.slug === slug);
