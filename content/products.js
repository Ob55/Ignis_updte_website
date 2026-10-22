// Ignis products. Asili is the Ignis-branded electric pressure cooker shown on
// /what-we-do/electric-cooking and on the homepage Electric Cooking card.
// Copy describes only what the product photos show: the panel labels and the
// rating label on the back are read straight off the unit. No efficiency,
// savings or health claims.
const img = (n, alt) => ({ src: `/img/asili/asili-${n}.jpg`, sm: `/img/asili/asili-${n}-sm.jpg`, alt });

export const ASILI = {
  name: "Asili",
  kind: "Electric pressure cooker",
  tagline: "One-touch programmes for the dishes Kenyan kitchens cook every day, from githeri and uji to rice and stews, under a sealed lid that keeps the heat in the pot.",
  image: img("02", "The Ignis Asili electric pressure cooker, front view showing its control panel"),
  // The panel's 12 one-touch programmes, as printed on the unit.
  programmes: [
    "Rice", "Fish / Samaki", "Poultry / Kuku", "Multigrain / Githeri", "Porridge / Uji", "Meat / Stews",
    "Soup / Broth", "Slow Cook", "Egg", "Cake", "Yogurt", "Sauté",
  ],
  features: [
    {
      title: "Twelve one-touch programmes",
      text: "Githeri, uji, rice, stews, kuku and more each have their own button, labelled in English and Kiswahili. Pick the dish and the cooker sets the time and pressure.",
      image: img("06", "Close view of the Asili control panel with programme buttons including Githeri, Uji, Samaki and Kuku"),
    },
    {
      title: "Sealed, locking lid",
      text: "The lid locks before pressure builds, so heat and steam stay inside the pot instead of escaping into the kitchen.",
      image: img("04", "The Asili pressure cooker with its lid closed and locked"),
    },
    {
      title: "Removable stainless inner pot",
      text: "The cooking pot lifts out for serving and washing, and the outer body stays clean and dry.",
      image: img("03", "The Asili with its lid off, showing the stainless steel inner pot"),
    },
    {
      title: "Set it and walk away",
      text: "Delay Start, Keep Warm, low or high pressure and a Less / Normal / More setting are on the panel, and the digital display counts the cook down.",
      image: img("08", "The Asili with its digital display lit, showing the timer"),
    },
    {
      title: "Opens wide for easy cleaning",
      text: "The lid swings fully open on its hinge, so the pot and seal are easy to reach after a cook.",
      image: img("07", "The Asili with its lid swung open beside the pot"),
    },
    {
      title: "Heating plate at the base",
      text: "Lift the inner pot out and the heating plate sits at the bottom of the housing, so heat goes straight up into the pot rather than out into the room.",
      image: img("09", "Looking into the Asili housing with the inner pot removed, showing the heating plate at the base"),
    },
    {
      title: "Detachable power cord",
      text: "The cord plugs into a socket on the back of the cooker, so it unplugs for carrying, cleaning and storage. The unit runs on a standard 220 V supply.",
      image: img("10", "The back of the Asili showing its rating label and the power cord socket"),
    },
  ],
  // What each part of the panel does, as printed on it.
  controls: [
    { label: "Low / High Pressure", text: "Choose the pressure level; lit indicators on the display show which is set." },
    { label: "Less / Normal / More", text: "Adjust the cook for how soft you want the food." },
    { label: "Delay Start", text: "Set the cook to begin later, so food is ready when it is needed." },
    { label: "Warm / Cancel", text: "Keep food warm after cooking, or stop a programme." },
    { label: "+ / −", text: "Fine-tune the cooking time shown on the display." },
  ],
  // From the rating label on the back of the unit.
  // TODO(confirm): price, and whether Asili is sold to households, institutions or
  // both (decision D5). Specs with a null value are not rendered.
  specs: [
    { label: "Capacity", value: "6 L" },
    { label: "Power", value: "1000 W" },
    { label: "Supply", value: "220 V, 50/60 Hz" },
    { label: "Marks", value: "CE, GS" },
    { label: "Price", value: null },
  ],
};
