"use client";
import { useEffect, useRef } from "react";
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  style
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("in");
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          show();
          io.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    io.observe(el);
    const t = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) show();
    }, 1200);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return <Tag
    ref={ref}
    className={["reveal", className].filter(Boolean).join(" ")}
    style={{ ...style || {}, ...delay ? { transitionDelay: `${delay}ms` } : {} }}
  >{children}</Tag>;
}
