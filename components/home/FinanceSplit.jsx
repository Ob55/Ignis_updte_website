import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
export function FinanceSplit() {
  return <section id="finance" className="section"><div className="wrap"><div className="fin-grid"><Reveal><div className="fin-card glass"><span className="ey">For institutions</span><h3>You already have the budget. It&apos;s going up in smoke.</h3><p>
                Every institution on firewood already spends on fuel every month. That existing line
                item is what pays for the steam kitchen, no capital request, no equipment tender, no
                donor.
              </p><p>We install, you cook, and the monthly cost sits below what firewood was costing you. Servicing and fuel supply are inside that figure.</p><a className="lnk" href="/contact">
                Book a kitchen assessment <ArrowUpRight size={14} /></a></div></Reveal><Reveal delay={100}><div className="fin-card glass"><span className="ey">For financiers &amp; partners</span><h3>Defined demand, proven hardware, contracted revenue.</h3><p>
                Kenyan schools alone burn ~1M tonnes of firewood a year, about KES 6B, and the
                National School Meals Programme is expanding. The demand is a recurring bill that
                already exists.
              </p><p>Blended senior debt plus concessional capital; carbon revenue bridges the affordability gap. Pipeline target: 400 institutions by 2027.</p><a className="lnk" href="/contact">
                Request the deployment model <ArrowUpRight size={14} /></a></div></Reveal></div></div></section>;
}
