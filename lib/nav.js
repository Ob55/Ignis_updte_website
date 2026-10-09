// Primary navigation (Content Spec §2):
// Home | What We Do | CleanCookIQ | Who We Work With | Our Work | About | Talk to Ignis
// Shared by the header (desktop + mobile) and the footer.
import { SERVICES } from "@/content/services";
import { audiences } from "@/content/audiences";

export const NAV = [
  { to: "/", label: "Home" },
  {
    to: "/what-we-do",
    label: "What We Do",
    children: SERVICES.map((s) => ({ to: s.to, label: s.name })),
  },
  {
    to: "/cleancookiq",
    label: "CleanCookIQ",
    children: [
      { to: "/cleancookiq#platform", label: "Platform" },
      { to: "/cleancookiq#how-it-works", label: "How It Works" },
      { to: "/cleancookiq#for-institutions", label: "For Institutions" },
      { to: "/cleancookiq#for-financiers", label: "For Financiers" },
      { to: "/cleancookiq#for-governments", label: "For Governments & Partners" },
    ],
  },
  {
    to: "/who-we-work-with",
    label: "Who We Work With",
    children: audiences.map((a) => ({ to: `/who-we-work-with/${a.id}`, label: a.eyebrow })),
  },
  {
    to: "/our-work",
    label: "Our Work",
    children: [
      { to: "/our-work/projects", label: "Projects" },
      { to: "/our-work/case-studies", label: "Case Studies" },
      { to: "/our-work/field-notes", label: "Insights / Field Notes" },
    ],
  },
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/about#who-we-are", label: "Who We Are" },
      { to: "/about#team", label: "Team" },
      { to: "/about#partners", label: "Partners" },
    ],
  },
];

// "Talk to Ignis": the assessment request and role-based enquiries.
export const TALK = { to: "/talk-to-ignis", label: "Talk to Ignis" };
