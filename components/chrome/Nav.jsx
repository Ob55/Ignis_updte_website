import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/site';
import { NAV, TALK } from '@/lib/nav';
import { Button } from '@/components/ui/Button';

// Header: logo + "Cook Smarter, Live Better." at left, a pill of the primary
// links in the middle (each parent is a real page; its sub-items open on hover
// or keyboard focus), and "Talk to Ignis" as the primary action at right.
export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [openGroup, setOpenGroup] = useState(null); // mobile: expanded group

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => {
    setOpen(false);
    setOpenGroup(null);
  };

  // While the mobile menu is open: lock page scroll behind it and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') closeMobile(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const activeCls = ({ isActive }) => (isActive ? 'active' : undefined);

  return (
    <header className={`topbar${solid ? ' solid' : ''}`}>
      <Link to="/" className="brand" aria-label="Ignis, home">
        <img src="/logo-flame.png" alt="" className="brand-mark" />
        <span className="brand-text">
          <span className="brand-word">IGNIS</span>
          <span className="brand-tagline">{SITE.tagline}</span>
        </span>
      </Link>

      <div className="nav-pill glass">
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((l) =>
            l.children ? (
              <div className="nav-dd" key={l.label}>
                <NavLink to={l.to} className={activeCls}>
                  {l.label} <ChevronDown size={13} strokeWidth={2.2} aria-hidden="true" />
                </NavLink>
                <ul className="nav-menu glass">
                  {l.children.map((c) => (
                    <li key={c.to}>
                      <Link to={c.to}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={activeCls}>
                {l.label}
              </NavLink>
            )
          )}
        </nav>
      </div>

      <div className="nav-right">
        <Button to={TALK.to} variant="primary" className="nav-cta">
          {TALK.label}
        </Button>
        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Portalled to <body>: the header is its own stacking context (and gains a
          backdrop-filter when scrolled, which would trap a fixed child inside it),
          so the menu must live outside it to cover the sticky CTA and cookie card. */}
      {open && createPortal(
        <div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="nav-overlay-head">
            <Link to="/" className="brand" aria-label="Ignis, home" onClick={closeMobile}>
              <img src="/logo-flame.png" alt="" className="brand-mark" />
              <span className="brand-text">
                <span className="brand-word">IGNIS</span>
                <span className="brand-tagline">{SITE.tagline}</span>
              </span>
            </Link>
            <button className="nav-overlay-close" onClick={closeMobile} aria-label="Close menu">
              <X size={26} />
            </button>
          </div>

          <nav aria-label="Primary" className="nav-overlay-nav">
            <ul className="nav-overlay-list">
              {NAV.map((l) => {
                const expanded = openGroup === l.label;
                const subId = `mnav-${l.to.replace(/\W/g, '') || 'home'}`;
                return (
                  <li key={l.label} className="nav-overlay-item">
                    <div className="nav-overlay-row">
                      <NavLink
                        to={l.to}
                        end={l.to === '/'}
                        onClick={closeMobile}
                        className={({ isActive }) => `nav-overlay-link${isActive ? ' active' : ''}`}
                      >
                        {l.label}
                      </NavLink>
                      {l.children && (
                        <button
                          type="button"
                          className={`nav-overlay-toggle${expanded ? ' open' : ''}`}
                          aria-expanded={expanded}
                          aria-controls={subId}
                          aria-label={`${expanded ? 'Hide' : 'Show'} ${l.label} pages`}
                          onClick={() => setOpenGroup((g) => (g === l.label ? null : l.label))}
                        >
                          <ChevronDown size={22} strokeWidth={2.2} />
                        </button>
                      )}
                    </div>
                    {l.children && expanded && (
                      <ul className="nav-overlay-sub" id={subId}>
                        {l.children.map((c) => (
                          <li key={c.to}>
                            <Link to={c.to} onClick={closeMobile} className="nav-overlay-sublink">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="nav-overlay-foot">
            <Button to={TALK.to} variant="primary" onClick={closeMobile} className="nav-overlay-cta">
              {TALK.label}
            </Button>
            <a className="nav-overlay-wa" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp us
            </a>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
