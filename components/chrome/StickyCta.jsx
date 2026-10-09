import { Link, useLocation } from 'react-router-dom';
import { CalendarCheck, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/site';
import { ASSESSMENT_PATH } from '@/components/ui/Button';

// Fixed bottom action bar on small screens only (hidden >=760px via CSS).
// Suppressed on pages where it would be redundant.
const HIDE_ON = ['/talk-to-ignis', '/thank-you'];

export function StickyCta() {
  const { pathname } = useLocation();
  if (HIDE_ON.includes(pathname.replace(/\/+$/, ''))) return null;
  return (
    <div className="sticky-cta" role="region" aria-label="Quick actions">
      <Link className="sticky-cta-btn primary" to={ASSESSMENT_PATH}>
        <CalendarCheck size={18} strokeWidth={1.9} aria-hidden="true" /> Request an Assessment
      </Link>
      <a
        className="sticky-cta-btn"
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={18} strokeWidth={1.9} aria-hidden="true" /> WhatsApp
      </a>
    </div>
  );
}
