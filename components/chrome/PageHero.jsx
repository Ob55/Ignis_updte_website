import { Ambient } from "@/components/motion/Ambient";
import { BlurText } from "@/components/motion/BlurText";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
export function PageHero({
  eyebrow,
  segments,
  sub
}) {
  return <section className="pagehero"><Ambient specks={false} /><div className="hero-glow" aria-hidden="true" /><div className="wrap" style={{ position: "relative", zIndex: 2 }}><Breadcrumbs /><span className="eyebrow">{eyebrow}</span><BlurText as="h1" segments={segments} className="pagehero-h1" stagger={0.07} delay={0.1} /><p className="pagehero-sub">{sub}</p></div></section>;
}
