import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from '@/components/chrome/Nav';
import { Footer } from '@/components/chrome/Footer';
import { SkipLink } from '@/components/chrome/SkipLink';
import Home from '@/pages/Home';
import WhatWeDo from '@/pages/WhatWeDo';
import ContentPage from '@/pages/ContentPage';
import Financing from '@/pages/Financing';
import CleanCookIQ from '@/pages/CleanCookIQ';
import WhoWeWorkWith from '@/pages/WhoWeWorkWith';
import Audience from '@/pages/Audience';
import WhereWeWork from '@/pages/WhereWeWork';
import OurWork from '@/pages/OurWork';
import Projects from '@/pages/Projects';
import CaseStudies from '@/pages/CaseStudies';
import CaseStudy from '@/pages/CaseStudy';
import FieldNotesIndex from '@/pages/FieldNotesIndex';
import FieldNote from '@/pages/FieldNote';
import Methodology from '@/pages/Methodology';
import About from '@/pages/About';
import TalkToIgnis from '@/pages/TalkToIgnis';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import CookiePolicy from '@/pages/CookiePolicy';
import Credits from '@/pages/Credits';
import ThankYou from '@/pages/ThankYou';
import NotFound from '@/pages/NotFound';
import { StickyCta } from '@/components/chrome/StickyCta';
import { CookieConsent } from '@/components/chrome/CookieConsent';
import { trackPageview } from '@/lib/analytics';
import { useAutoReveal } from '@/lib/useAutoReveal';

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
  useAutoReveal();
  return (
    <>
      <SkipLink />
      <Nav />
      <ScrollToTop />
      <Analytics />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/what-we-do/:slug" element={<ContentPage />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/cleancookiq" element={<CleanCookIQ />} />
          <Route path="/who-we-work-with" element={<WhoWeWorkWith />} />
          <Route path="/who-we-work-with/:audience" element={<Audience />} />
          <Route path="/where-we-work" element={<WhereWeWork />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/our-work/projects" element={<Projects />} />
          <Route path="/our-work/case-studies" element={<CaseStudies />} />
          <Route path="/our-work/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/our-work/field-notes" element={<FieldNotesIndex />} />
          <Route path="/our-work/field-notes/:slug" element={<FieldNote />} />
          <Route path="/our-work/methodology" element={<Methodology />} />
          <Route path="/about" element={<About />} />
          <Route path="/talk-to-ignis" element={<TalkToIgnis />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <StickyCta />
      <Footer />
      <CookieConsent />
    </>
  );
}
