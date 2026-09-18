"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns during SSR (it cannot run there). The arming below is a
// browser-only concern, so fall back to useEffect on the server and keep the
// pre-paint timing in the browser, where it is what prevents a flash.
const useArmEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Scroll-in wrapper. Since every route is prerendered, the hidden state must NOT
// be the default: if it were, the static HTML would paint invisible text and a
// visitor who never scrolls (or whose JS fails) would see a blank page. That is
// exactly what happened on the legal pages, whose whole body sits below the fold.
//
// So content ships visible, and this effect "arms" the animation on mount.
// useLayoutEffect runs before paint, so above-the-fold elements are armed and
// shown in the same frame, with no flash.
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
    el.classList.add("reveal-armed");

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
