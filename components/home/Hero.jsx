import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Ambient } from "@/components/motion/Ambient";
import { BlurText } from "@/components/motion/BlurText";

export function Hero() {
  return (
    <section id="top" className="hero">
      <Ambient />
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap">
        <span className="badge glass fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="dot" /> Clean cooking for Africa&apos;s institutions
        </span>
        <BlurText
          as="h1"
          delay={0.25}
          stagger={0.08}
          segments={[
            "Powering",
            "Africa's",
            "Clean",
            "Cooking",
            { text: "Transition.", className: "serif grad-flame" }
          ]}
        />
        <p className="sub fade-up" style={{ animationDelay: "0.8s" }}>
          Steam-based systems, LPG infrastructure, and sustainable energy solutions for
          institutions across Africa, replacing charcoal and biomass with efficient, dignified
          cooking.
        </p>
        <div className="hero-btns fade-up" style={{ animationDelay: "1.0s" }}>
          <a className="btn btn-flame" href="/contact">
            Book a kitchen assessment <ArrowUpRight size={16} />
          </a>
          <a className="btn btn-glass glass" href="#calc">
            See the savings <ArrowDown size={15} />
          </a>
        </div>
      </div>
      <a className="scrollcue" href="#who" aria-label="Scroll down">
        <span className="mono">Scroll</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
