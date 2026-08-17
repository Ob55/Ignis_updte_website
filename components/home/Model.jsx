import { Reveal } from "@/components/motion/Reveal";
const STEPS = [
  { n: "01", h: "Design", p: "We survey the kitchen, count real meal volumes across a term, and size the system to the peak \u2014 not the average.", m: "14-day survey" },
  { n: "02", h: "Finance", p: "Blended senior debt plus concessional capital. The institution pays out of fuel savings, not its capital budget.", m: "0 upfront capex" },
  { n: "03", h: "Deploy", p: "Fabrication, install, cook training and commissioning \u2014 scheduled inside a school holiday or ward rotation.", m: "6\u201310 weeks" },
  { n: "04", h: "Operate", p: "Servicing, fuel supply, monitored uptime. If the kitchen goes down, that is our problem to fix.", m: "Monthly service" }
];
export function Model() {
  return <section id="model" className="section"><div className="wrap"><Reveal className="section-head"><span className="eyebrow">The model</span><h2>We don&apos;t sell a stove. We run the kitchen&apos;s energy.</h2></Reveal><div className="model-grid" style={{ marginTop: 48 }}>{STEPS.map((s, i) => <Reveal key={s.n} delay={i * 90}><div className="model-card glass"><span className="n">{s.n}</span><h3>{s.h}</h3><p>{s.p}</p><span className="m">{s.m}</span></div></Reveal>)}</div><Reveal><p className="model-kicker">
            We don&apos;t sell you a stove and leave. We <span className="serif grad-flame">own the outcome.</span></p></Reveal></div></section>;
}
