import { ArrowUpRight, ArrowDown } from "lucide-react";
import { BlurText } from "@/components/motion/BlurText";

// Acreage-style cinematic hero: full-bleed looping video, dark-green scrim,
// giant serif headline, editorial two-column copy. Video is a free Pixabay
// asset (swap for local clean-cooking footage in public/ any time).
const HERO_VIDEO = "https://cdn.pixabay.com/video/2025/01/22/254016_large.mp4";

export function Hero() {
  return (
    <section id="top" className="hero hero--video">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/serve/schools.jpg"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="hero-scrim" aria-hidden="true" />

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
            <a className="btn btn-flame" href="/contact">
              Book a kitchen assessment <ArrowUpRight size={16} />
            </a>
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
