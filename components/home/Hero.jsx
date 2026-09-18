import { ArrowUpRight, ArrowDown } from "lucide-react";
import { BlurText } from "@/components/motion/BlurText";
import { Link } from "react-router-dom";
import { Ambient } from "@/components/motion/Ambient";

// Acreage-style cinematic hero: full-bleed looping video, dark-green scrim,
// giant serif headline, editorial two-column copy. 27s cinematic forest drone
// flythrough (Pixabay, free license), self-hosted and compressed to 1080p/~5MB
// so it starts fast; the poster still paints instantly while it buffers.
const HERO_VIDEO = "/hero.mp4";
const HERO_POSTER = "/hero-poster.jpg";

export function Hero() {
  return (
    <section id="top" className="hero hero--video">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="hero-scrim" aria-hidden="true" />
      <Ambient />

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <BlurText
            as="h1"
            className="hero-title"
            delay={0.3}
            stagger={0.08}
            segments={[
              "Africa's energy services",
              "platform for institutions",
              { text: "and industry.", className: "hero-accent" }
            ]}
          />
        </div>

        <div className="hero-side">
          <p className="hero-desc fade-up" style={{ animationDelay: "0.6s" }}>
            The upgrade hiding in your fuel bill. We manage and implement clean energy
            programmes that turn institutional fuel waste into modern infrastructure, paid
            for from existing budgets with no upfront capital.
          </p>
          <div className="hero-pills fade-up" style={{ animationDelay: "0.75s" }}>
            <span className="pill pill--gold">Cook smarter</span>
            <span className="pill pill--glass">Measured &amp; verified</span>
          </div>
          <div className="hero-btns fade-up" style={{ animationDelay: "0.9s" }}>
            <Link className="btn btn-flame" to="/contact">
              Get in touch <ArrowUpRight size={16} />
            </Link>
            <a className="btn btn-glass-d" href="#calc">
              See the savings <ArrowDown size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scrollline" aria-hidden="true" />
    </section>
  );
}
