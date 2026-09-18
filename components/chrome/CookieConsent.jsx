import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initGA, GA_ID } from "@/lib/analytics";

const KEY = "ignis-cookie-consent"; // "granted" | "denied"

export function readConsent() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

function writeConsent(value) {
  try { localStorage.setItem(KEY, value); } catch { /* private mode — ask again next visit */ }
}

// Analytics cookies are non-essential, so nothing loads until the visitor says
// yes. Declining is one click, same as accepting.
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Nothing to consent to if analytics was never configured.
    if (!GA_ID) return;
    const stored = readConsent();
    if (stored === "granted") initGA();
    else if (stored !== "denied") setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => { writeConsent("granted"); initGA(); setVisible(false); };
  const decline = () => { writeConsent("denied"); setVisible(false); };

  return (
    <div className="cookie-bar" role="dialog" aria-label="Cookie choices">
      <p>
        We would like to use analytics cookies to see which pages are useful. Nothing loads
        unless you agree. See our <Link to="/privacy">privacy policy</Link>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn" onClick={decline}>Decline</button>
        <button type="button" className="cookie-btn primary" onClick={accept}>Accept</button>
      </div>
    </div>
  );
}
