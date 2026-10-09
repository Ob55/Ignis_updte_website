import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Site-wide scroll motion. After each route change, any block of page content that
// starts BELOW the fold (section heads, cards, panels, figures…) and is not already
// a <Reveal> gets the same fade-rise as <Reveal>, with a short stagger inside grids.
// Content already on screen is never hidden, so nothing flickers on load.
// Respects prefers-reduced-motion (does nothing) and the .js-motion gate in CSS.
const CANDIDATES = [
  "#main .section > .wrap > *",
  "#main .section--tight > .wrap > *",
  "#main .card-grid > *",
  "#main .accordion-list > *",
  "#main .prose > *",
  "#main .numbered-list > li",
  "#main .geo-grid > *",
  "#main .crew-grid > *",
  "#main .serve-more",
].join(",");

export function useAutoReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let io;
    const raf = requestAnimationFrame(() => {
      const fold = window.innerHeight;
      const els = [...document.querySelectorAll(CANDIDATES)].filter(
        (el) =>
          !el.classList.contains("reveal") &&
          !el.closest(".reveal") &&
          !el.querySelector(".reveal") &&
          el.getBoundingClientRect().top > fold
      );
      if (!els.length) return;

      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );

      els.forEach((el) => {
        const i = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
        el.style.transitionDelay = `${Math.min(i, 5) * 160}ms`; // slow, readable cascade
        el.classList.add("reveal", "auto-reveal");
        io.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);
}
