import { Link } from "react-router-dom";
import { Flame, Building2, Workflow, Landmark, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
const CARDS = [
  { icon: Flame, k: "The system", h: "No fire in the room", p: "A sealed boiler outside the kitchen. Steam does the cooking \u2014 no smoke where the food is." },
  { icon: Building2, k: "Who we serve", h: "The biggest kitchens", p: "Schools, hospitals and correctional facilities \u2014 the largest single firewood consumers." },
  { icon: Workflow, k: "The model", h: "We run the energy", p: "Design, finance, deploy, operate. You pay from fuel savings, not a capital budget." },
  { icon: Landmark, k: "Financing", h: "Contracted demand", p: "Blended debt plus concessional capital and carbon revenue. 400 institutions by 2027." }
];
export function SolutionsTeaser() {
  return <section className="section"><div className="wrap"><Reveal className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}><div><span className="eyebrow">What we do</span><h2>Steam kitchens, end to end.</h2></div><Link className="btn btn-glass glass" to="/solutions">
            Explore solutions <ArrowUpRight size={15} /></Link></Reveal><div className="teaser-grid" style={{ marginTop: 44 }}>{CARDS.map(({ icon: Icon, k, h, p }, i) => <Reveal key={k} delay={i * 80}><Link to="/solutions" className="teaser-card glass"><div className="disc glass" aria-hidden="true"><Icon size={24} strokeWidth={1.6} /></div><span className="k">{k}</span><h3>{h}</h3><p>{p}</p></Link></Reveal>)}</div></div></section>;
}
