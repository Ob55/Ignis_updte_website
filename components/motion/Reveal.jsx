"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns during SSR (it cannot run there). The arming below is a
// browser-only concern, so fall back to useEffect on the server and keep the
// pre-paint timing in the browser, where it is what prevents a flash.
const useArmEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Scroll-in wrapper.
//
// The hidden state lives in CSS behind `.js-motion`, which an inline <head>
// script sets before first paint. This component therefore only ever ADDS the
// `in` class -- it never hides anything itself. That ordering matters: hiding
// from JS after hydration made prerendered copy paint and then disappear.
//
// Long-form pages (privacy, terms, cookie policy) deliberately do not use this
// wrapper at all, because their whole body is one block below the fold.
export function Reveal({ children, className, as: Tag = "div", delay = 0, style }) {
  const ref = useRef(null);

  useArmEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // leave it visible, never animate

    const show = () => el.classList.add("in");

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show();
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    io.observe(el);

    // Belt and braces: if the observer never fires, reveal anyway rather than
    // leaving the text invisible.
    const t = setTimeout(show, 1200);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ ...(style || {}), ...(delay ? { transitionDelay: `${delay}ms` } : {}) }}
    >
      {children}
    </Tag>
  );
}
