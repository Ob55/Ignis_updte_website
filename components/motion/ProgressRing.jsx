"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion/useReduced";
export function ProgressRing({ pct, size = 240, stroke = 14 }) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [p, setP] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    if (reduce) {
      setP(pct);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          requestAnimationFrame(() => setP(pct));
        }
      }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pct, reduce]);
  useEffect(() => {
    if (done.current) setP(pct);
  }, [pct]);
  return <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} /><circle
    cx={size / 2}
    cy={size / 2}
    r={r}
    fill="none"
    stroke="url(#ringgrad)"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeDasharray={circ}
    strokeDashoffset={circ - circ * p / 100}
    style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)" }}
  /><defs><linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f7a24e" /><stop offset="100%" stopColor="#e8792b" /></linearGradient></defs></svg>;
}
