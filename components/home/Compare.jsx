import { Reveal } from "@/components/motion/Reveal";
const ROWS = [
  ["Fuel cost", "Rising with scarcity", "Up to 60% lower"],
  ["Kitchen air", "Smoke, at eye level, all day", "No combustion in the space"],
  ["Cook time, 100 kg maize", "From commissioning data", "From commissioning data"],
  ["Staff burns & injuries", "Open flame, open pots", "Sealed vessels, no flame contact"],
  ["Maintenance", "Ad hoc, unbudgeted", "Ignis-operated, monitored"]
];
export function Compare() {
  return <section className="section"><div className="wrap"><Reveal className="section-head"><span className="eyebrow">Firewood vs steam</span><h2>What changes the day the boiler comes on.</h2></Reveal><Reveal className="compare glass" delay={120} style={{ marginTop: 40 }}><div className="crow head"><span className="rk">&nbsp;</span><span className="wood">Three-stone / firewood</span><span className="steam">Ignis steam</span></div>{ROWS.map(([k, a, b]) => <div className="crow" key={k}><span className="rk">{k}</span><span className="wood">{a}</span><span className="steam">{b}</span></div>)}</Reveal></div></section>;
}
