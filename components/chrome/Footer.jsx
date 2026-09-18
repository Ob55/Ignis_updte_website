import { Link } from "react-router-dom";
import { SITE } from "@/lib/site";
import { openCookiePreferences } from "@/lib/consent";

const EXPLORE = [
  { to: "/solutions", label: "Solutions" },
  { to: "/who-we-serve", label: "Who we serve" },
  { to: "/cleancookiq", label: "CleanCookIQ" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blogs" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookie-policy", label: "Cookies" }
];

// Sector references. Labels name exactly what each link opens — no placeholders.
const SECTOR = [
  { href: "https://ccak.or.ke", label: "Clean Cooking Association of Kenya" },
  { href: "https://energy.go.ke", label: "Ministry of Energy & Petroleum" },
  { href: "https://www.cleancookingalliance.org", label: "Clean Cooking Alliance" }
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <img
              src="/logo-full.png"
              alt="IGNIS Innovation Africa, Cook Smarter, Live Better."
              className="footer-logo"
            />
            <p className="tag">Energy services for institutions across Africa. Nairobi, Kenya.</p>
          </div>

          <div>
            <h4>Explore</h4>
            {EXPLORE.map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>

          <div>
            <h4>Sector</h4>
            {SECTOR.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            ))}
          </div>

          <div>
            <h4>Connect</h4>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={SITE.social.x} target="_blank" rel="noopener noreferrer">X / @igaborafrica</a>
          </div>
        </div>
      </div>
      <div className="fbot">
        <div className="wrap fbot-row">
          <span>© 2026 {SITE.legalName}</span>
          <button type="button" className="fbot-link" onClick={openCookiePreferences}>
            Cookie preferences
          </button>
        </div>
      </div>
      <div className="terminus" aria-hidden="true" />
    </footer>
  );
}
