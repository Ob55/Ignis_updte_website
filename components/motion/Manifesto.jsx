"use client";
import { useEffect, useRef } from "react";
export function Manifesto({ words, flame = [] }) {
  const ref = useRef(null);
  const flameSet = new Set(flame);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll(".w"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => s.classList.add("lit"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (vh * 0.55)));
      const n = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle("lit", i < n));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <p ref={ref} className="lines">{words.map((w, i) => <span key={i} className={`w${flameSet.has(i) ? " fl" : ""}`}>{w}{" "}</span>)}</p>;
}
