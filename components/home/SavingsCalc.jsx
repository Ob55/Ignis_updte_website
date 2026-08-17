"use client";
import { useEffect, useRef, useState } from "react";
import { fuelModels } from "@/content/fuel-models";
import { ProgressRing } from "@/components/motion/ProgressRing";
import { Reveal } from "@/components/motion/Reveal";
const fmt = (n) => n.toLocaleString("en-KE");
export function SavingsCalc() {
  const [active, setActive] = useState(0);
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  const m = fuelModels[active];
  const steamPct = Math.round(m.annualSteamKes / m.annualFirewoodKes * 100);
  const savedPct = 100 - steamPct;
  const saved = m.annualFirewoodKes - m.annualSteamKes;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setOn(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const pick = (i) => {
    setActive(i);
    setOn(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
  };
  return <section id="calc" className="section" ref={ref}><div className="wrap"><Reveal className="section-head" style={{ textAlign: "center" }}><h2 style={{ marginLeft: "auto", marginRight: "auto" }}>
            One institution. Twelve months. Two fuel bills.
          </h2></Reveal><Reveal className="calc-card glass-solid glass" delay={120} style={{ marginTop: 44 }}><div className="calc-grid"><div><div className="calc-bars"><div className={`cbar wood`}><div className="cbar-top"><span>Firewood today</span><span>12 months</span></div><div className="track"><div className="fill" style={{ width: on ? "100%" : 0 }} /></div><span className="amt">KES {fmt(m.annualFirewoodKes)}</span></div><div className={`cbar steam`}><div className="cbar-top"><span className="emerald-text">Ignis steam, same meals</span><span>{steamPct}% of the bill</span></div><div className="track"><div className="fill" style={{ width: on ? `${steamPct}%` : 0 }} /></div><span className="amt emerald-text">KES {fmt(m.annualSteamKes)}</span></div></div><div className="calc-chips" role="group" aria-label="Institution type">{fuelModels.map((mod, i) => <button key={mod.id} className="calc-chip" aria-pressed={i === active} onClick={() => pick(i)}>{mod.label}</button>)}</div><p className="calc-note">
                Illustrative, based on a {m.basis}. Your assessment produces your own figures.
              </p></div><div className="calc-side"><div className="ring-wrap"><ProgressRing pct={savedPct} /><div className="ring-center"><span className="big grad-flame">{savedPct}%</span><span className="lbl">Fuel bill cut</span></div></div><div className="calc-saved"><span className="k">Kept every year</span><div className="v">KES {fmt(saved)}</div></div></div></div></Reveal></div></section>;
}
