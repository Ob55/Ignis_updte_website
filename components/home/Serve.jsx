import { institutions } from "@/content/institutions";
import { Reveal } from "@/components/motion/Reveal";
const PHOTOS = ["/serve/schools.jpg", "/serve/hospitals.jpg", "/serve/correctional.jpg"];
export function Serve() {
  return <section id="serve" className="section"><div className="wrap"><Reveal className="section-head"><span className="eyebrow">Who we serve</span><h2>The biggest kitchens in the country.</h2><p>Institutions are the largest single firewood consumers, and the least served by household clean-cooking products.</p></Reveal><div className="serve-grid" style={{ marginTop: 48 }}>{institutions.map((inst, i) => <Reveal key={inst.id} delay={i * 100}><article className="serve-card"><img className="serve-photo" src={PHOTOS[i]} alt="" loading="lazy" aria-hidden="true" /><div className="serve-shade" aria-hidden="true" /><div className="serve-content"><span className="k">{inst.meta}</span><h3>{inst.name}</h3><p>{inst.body}</p></div></article></Reveal>)}</div></div></section>;
}
