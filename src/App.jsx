import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from '@/components/chrome/Nav';
import { Footer } from '@/components/chrome/Footer';
import { SkipLink } from '@/components/chrome/SkipLink';
import Home from '@/pages/Home';
import Solutions from '@/pages/Solutions';
import WhoWeServe from '@/pages/WhoWeServe';
import Audience from '@/pages/Audience';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import ThankYou from '@/pages/ThankYou';
import NotFound from '@/pages/NotFound';
import { StickyCta } from '@/components/chrome/StickyCta';
import { trackPageview } from '@/lib/analytics';

// Scroll on navigation: to a #section when the URL carries a hash, else to top.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // wait a frame so the destination page/section has mounted
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo(0, 0);
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// GA4 pageview on each route change (slight delay so the new title is set).
function Analytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    const t = setTimeout(() => trackPageview(pathname), 80);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <SkipLink />
      <Nav />
      <ScrollToTop />
      <Analytics />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/who-we-serve" element={<WhoWeServe />} />
          <Route path="/who-we-serve/:audience" element={<Audience />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <StickyCta />
      <Footer />
    </>
  );
}
