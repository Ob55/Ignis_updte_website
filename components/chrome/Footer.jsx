import { Link } from "react-router-dom";
import { SITE } from "@/lib/site";
import { NAV, TALK } from "@/lib/nav";
import { FOOTER_PHONE } from "@/content/flags";
import { openCookiePreferences } from "@/lib/consent";

const EXPLORE = [...NAV.filter((l) => l.to !== "/"), TALK, { to: "/financing", label: "Financing" }];

const LEGAL = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookie-policy", label: "Cookies" },
  { to: "/credits", label: "Credits" },
];

// Copyright years: "2025" in the first year, then a range ("2025–2026", …).
const startYear = 2025;
const currentYear = new Date().getFullYear();
const yearText = currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`;

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link to="/" className="footer-brand" aria-label="Ignis, home">
              <img src="/logo-flame.png" alt="" className="footer-mark" />
              <span>
                <span className="footer-word">IGNIS</span>
                <span className="footer-tagline">{SITE.tagline}</span>
              </span>
            </Link>
            <address className="footer-address">
              <strong>{SITE.legalName}</strong>
              <span>The Pavilion, Lower Kabete Rd, Nairobi</span>
              <span>{SITE.address.poBox}</span>
              {/* TODO(data): phone number. Hidden until FOOTER_PHONE is set in content/flags.js. */}
              {FOOTER_PHONE && (
                <a href={`tel:${FOOTER_PHONE.replace(/\s/g, "")}`}>{FOOTER_PHONE}</a>
              )}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </address>
          </div>

          <div>
            <h2 className="footer-h">Explore</h2>
            {EXPLORE.map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>

          <div>
            <h2 className="footer-h">Connect</h2>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>

          <div>
            <h2 className="footer-h">Legal</h2>
            {LEGAL.map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="fbot">
        <div className="wrap fbot-row">
          <p className="fbot-copy">
            © {yearText} {SITE.legalName} · <span className="nowrap">Reg. No. {SITE.regNo}</span>
          </p>
          <button type="button" className="fbot-link" onClick={openCookiePreferences}>
            Cookie preferences
          </button>
        </div>
      </div>
      <div className="terminus" aria-hidden="true" />
    </footer>
  );
}
