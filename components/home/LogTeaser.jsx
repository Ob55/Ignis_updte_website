import { Reveal } from "@/components/motion/Reveal";
const POSTS = [
  { d: "Jul 2026 \xB7 Commissioning", h: "Sizing for exam term, not the average week", halo: "radial-gradient(70% 70% at 60% 35%, rgba(232,121,43,0.4), transparent 65%)" },
  { d: "Jun 2026 \xB7 Fuel data", h: "Six months of briquette consumption at a 1,400-bed school", halo: "radial-gradient(70% 70% at 45% 40%, rgba(33,180,90,0.4), transparent 65%)" },
  { d: "May 2026 \xB7 Engineering", h: "Why we changed the boiler spec after site three", halo: "radial-gradient(70% 70% at 55% 30%, rgba(232,121,43,0.35), transparent 65%)" }
];
export function LogTeaser() {
  return <section id="log" className="section"><div className="wrap"><Reveal className="section-head"><span className="eyebrow">Field log</span><h2>Commissioning notes, fuel logs, and what breaks in month eight.</h2><p>Written by the people who install the systems, the data a financier actually reads.</p></Reveal><div className="log-grid" style={{ marginTop: 44 }}>{POSTS.map((p, i) => <Reveal key={p.h} delay={i * 90}><a className="log-card glass" href="#"><div className="thumb" style={{ background: "linear-gradient(180deg,#1f3b28,#12261a)" }}><div className="halo" style={{ background: p.halo }} aria-hidden="true" /></div><div className="body"><span className="d">{p.d}</span><h3>{p.h}</h3></div></a></Reveal>)}</div></div></section>;
}
