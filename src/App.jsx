import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from '@/components/chrome/Nav';
import { Footer } from '@/components/chrome/Footer';
import { SkipLink } from '@/components/chrome/SkipLink';
import Home from '@/pages/Home';
import Solutions from '@/pages/Solutions';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';

// Scroll to top on route change (SPA nav otherwise keeps scroll position).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <SkipLink />
      <Nav />
      <ScrollToTop />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
