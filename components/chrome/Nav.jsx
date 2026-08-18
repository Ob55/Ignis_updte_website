import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

// Merged information architecture: top-level routes plus a "Who we serve"
// dropdown of the four audiences (backed by /who-we-serve#<id> anchors).
const LINKS = [
  { to: '/solutions', label: 'Solutions' },
  {
    label: 'Who we serve',
    children: [
      { to: '/who-we-serve#institutions', label: 'Institutions' },
      { to: '/who-we-serve#industry', label: 'Industry' },
      { to: '/who-we-serve#financiers', label: 'Financiers' },
      { to: '/who-we-serve#delivery-partners', label: 'Delivery partners' },
    ],
  },
  { to: '/#cleancookiq', label: 'CleanCookIQ' },
  { to: '/#partners', label: 'Projects & Partners' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Insights' },
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
        <Link className="btn btn-flame nav-cta" to="/contact">
          Book assessment <ArrowUpRight size={15} />
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
          <Link className="btn btn-flame" to="/contact" onClick={closeMobile} style={{ marginTop: 24, alignSelf: 'flex-start' }}>
            Book assessment <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}
