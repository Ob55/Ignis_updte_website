import { RequestAssessmentButton, PartnerButton } from "@/components/ui/Button";

// Block 1: Hero. One H1, no audience labels, no carousel.
// TODO(content): real Ignis kitchen photo. Interim image is a real Kenyan school
// kitchen in operation (SuSanA Secretariat, CC BY 2.0 — see Credits), not an
// Ignis site. Replace with an Ignis institutional kitchen and update the alt text.
const HERO_IMAGE = "/img/institutions.jpg";

export function Hero() {
  return (
    <section id="top" className="home-hero on-dark">
      <img
        className="home-hero-img"
        src={HERO_IMAGE}
        alt="Cooks at work over large pots in a firewood school kitchen"
        fetchpriority="high"
      />
      <div className="home-hero-scrim" aria-hidden="true" />
      <div className="wrap home-hero-inner">
        <h1 className="home-hero-title">
          Cleaner institutional kitchens, financed from the fuel budget you already have.
        </h1>
        <p className="home-hero-sub">
          Ignis helps schools, hospitals and other institutions switch from firewood to clean,
          efficient cooking. We assess the kitchen, identify the right solution, structure the
          transition and deliver the system, then measure what changes.
        </p>
        <div className="btn-row">
          <RequestAssessmentButton />
          <PartnerButton />
        </div>
      </div>
    </section>
  );
}
