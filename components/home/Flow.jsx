import { Flame, Boxes, Waves, Soup, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
const STAGES = [
  { icon: Flame, h: "Fuel in", p: "One controlled burn point, outside the kitchen, on a measured schedule.", rd: "Briquette / LPG" },
  { icon: Boxes, h: "Boiler", p: "Water becomes steam. The only combustion on site, in an enclosure.", rd: "~4 bar" },
  { icon: Waves, h: "Steam line", p: "Insulated pipe carries heat to each station. No smoke travels with it.", rd: "120 kg/h" },
  { icon: Soup, h: "Jacketed pots", p: "Steam heats the pot's jacket. Food never touches flame, nothing scorches.", rd: "300-1,000 L" },
  { icon: UtensilsCrossed, h: "Meals out", p: "Same menus, faster. Cooks work in clean air instead of smoke.", rd: "Trained on handover" }
];
export function Flow() {
  return <section id="system" className="section"><div className="wrap"><Reveal className="section-head"><span className="eyebrow">The system</span><h2>No fire in the room where the food is cooked.</h2><p>Combustion happens once, in a sealed boiler outside the kitchen. Steam does the cooking.</p></Reveal><Reveal className="flow" delay={120} style={{ marginTop: 60 }}><div className="flow-line" aria-hidden="true" /><div className="flow-nodes">{STAGES.map(({ icon: Icon, h, p, rd }) => <div className="flow-node" key={h}><div className="disc glass"><Icon size={30} strokeWidth={1.5} /></div><h3>{h}</h3><p>{p}</p><div className="rd">{rd}</div></div>)}</div></Reveal></div></section>;
}
