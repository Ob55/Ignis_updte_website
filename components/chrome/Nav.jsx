import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog & Posts' },
  { to: '/contact', label: 'Contact' },
];

// Top bar: standalone logo far-left, a glass pill of route links + flame CTA on
// the right. NavLink adds the active class; real client-side routing.
export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`topbar${solid ? ' solid' : ''}`}>
      <Link to="/" className="brand" aria-label="IGNIS Innovation Africa, home">
        <img src="/logo-flame.png" alt="" className="brand-mark" />
        <span className="brand-word">IGNIS</span>
      </Link>

      <div className="nav-pill glass">
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {l.label}
            </NavLink>
          ))}
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
          <button className="nav-overlay-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={28} />
          </button>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-overlay-link${isActive ? ' active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          <Link className="btn btn-flame" to="/contact" onClick={() => setOpen(false)} style={{ marginTop: 24, alignSelf: 'flex-start' }}>
            Book assessment <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}
