// Partner logos (public/partners). A logo renders ONLY when `approved: true`.
// TODO(partner-approval): record each partner's written approval to show its
// logo, then set approved: true.
export const PARTNERS = [
  { src: "/partners/partner1.png", name: "National Polytechnic", approved: false },
  { src: "/partners/partner2.png", name: "Kenya Power", approved: false },
  { src: "/partners/partner3.png", name: "Caritas", approved: false },
  { src: "/partners/partner4.png", name: "MECS · UK International Development", approved: false },
  { src: "/partners/partner5.png", name: "Republic of Kenya · NACONEK", approved: false },
  { src: "/partners/partner6.png", name: "KCB Bank", approved: false },
  { src: "/partners/partner7.png", name: "Verst Carbon", approved: false },
];

export const approvedPartners = PARTNERS.filter((p) => p.approved);
