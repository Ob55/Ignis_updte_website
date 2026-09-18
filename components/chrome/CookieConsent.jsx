import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { acceptCookies, declineCookies, initConsent, onConsentChange, getConsent } from "@/lib/consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    setChoice(getConsent());
    setOpen(initConsent());
    return onConsentChange((e) => {
      if (e.detail === "reopen") {
        setChoice(getConsent());
        setOpen(true);
      } else {
        setChoice(e.detail);
        setOpen(false);
      }
    });
  }, []);

  if (!open) return null;

  return (
    <div className="cookie-bar" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <div className="cookie-icon" aria-hidden="true">
        <Cookie size={22} strokeWidth={1.7} />
      </div>
      <div className="cookie-copy">
        <h2 id="cookie-title">Cookies on this site</h2>
        <p>
          We use one essential cookie to remember this choice. We would also like analytics cookies
          to see which pages are useful &mdash; nothing loads unless you agree, and declining changes
          nothing about how the site works. Read our{" "}
          <Link to="/cookie-policy">cookie policy</Link>.
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn" onClick={declineCookies}>
          {choice === "granted" ? "Withdraw consent" : "Decline"}
        </button>
        <button type="button" className="cookie-btn primary" onClick={acceptCookies}>
          Accept analytics
        </button>
      </div>
    </div>
  );
}
