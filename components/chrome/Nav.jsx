import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

// Merged information architecture: top-level routes plus a "Where we work"
// dropdown of the four audiences (each its own /where-we-work/<id> page).
const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Solutions' },
  {
    label: 'Where we work',
    children: [
      { to: '/where-we-work/institutions', label: 'Institutions' },
      { to: '/where-we-work/industry', label: 'Industry' },
      { to: '/where-we-work/financiers', label: 'Financiers' },
      { to: '/where-we-work/delivery-partners', label: 'Delivery partners' },
    ],
  },
  { to: '/platform', label: 'CleanCookIQ' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blogs' },
];

// Top bar: standalone logo far-left, a glass pill of route links + flame CTA on
// the right. NavLink adds the active class; real client-side routing.
export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [openGroup, setOpenGroup] = useState(null); // mobile: expanded dropdown

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

  return (
    <header className={`topbar${solid ? ' solid' : ''}`}>
      <Link to="/" className="brand" aria-label="IGNIS Innovation Africa, home">
        <img src="/logo-flame.png" alt="" className="brand-mark" />
        <span className="brand-word">IGNIS</span>
      </Link>

      <div className="nav-pill glass">
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) =>
            l.children ? (
              <div className="nav-dd" key={l.label}>
                <button type="button" className="nav-dd-btn" aria-haspopup="true">
                  {l.label} <ChevronDown size={13} strokeWidth={2.2} />
                </button>
                <div className="nav-menu glass" role="menu">
                  {l.children.map((c) => (
                    <Link key={c.label} to={c.to} role="menuitem">
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : l.to.includes('#') ? (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {l.label}
              </NavLink>
            )
          )}
        </nav>
      </div>

      <div className="nav-right">
        <Link className="btn btn-flame nav-cta" to="/scoping-call">
          Get in touch <ArrowUpRight size={15} />
        </Link>

        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="nav-overlay" role="dialog" aria-label="Menu">
          <button className="nav-overlay-close" onClick={closeMobile} aria-label="Close menu">
            <X size={28} />
          </button>
          {LINKS.map((l) =>
            l.children ? (
              <div className="nav-overlay-group" key={l.label}>
                <button
                  type="button"
                  className={`nav-overlay-link nav-overlay-toggle${openGroup === l.label ? ' open' : ''}`}
                  aria-expanded={openGroup === l.label}
                  onClick={() => setOpenGroup((g) => (g === l.label ? null : l.label))}
                >
                  {l.label} <ChevronDown size={22} strokeWidth={2.2} />
                </button>
                {openGroup === l.label &&
                  l.children.map((c) => (
                    <Link
                      key={c.label}
                      to={c.to}
                      onClick={closeMobile}
                      className="nav-overlay-sublink"
                    >
                      {c.label}
                    </Link>
                  ))}
              </div>
            ) : l.to.includes('#') ? (
              <Link key={l.to} to={l.to} onClick={closeMobile} className="nav-overlay-link">
                {l.label}
              </Link>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={closeMobile}
                className={({ isActive }) => `nav-overlay-link${isActive ? ' active' : ''}`}
              >
                {l.label}
              </NavLink>
            )
          )}
          <Link className="btn btn-flame" to="/scoping-call" onClick={closeMobile} style={{ marginTop: 24, alignSelf: 'flex-start' }}>
            Get in touch <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}
