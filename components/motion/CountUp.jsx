"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion/useReduced";
export function CountUp({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  format = false
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.current) return;
          done.current = true;
          let start = null;
          const tick = (t) => {
            if (start === null) start = t;
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, reduce]);
  const shown = format ? Math.round(val).toLocaleString("en-KE") : val.toFixed(decimals);
  return <span ref={ref} className="tabular-nums">{prefix}{shown}<span className="u">{suffix}</span></span>;
}
