import { Reveal } from "@/components/motion/Reveal";

// Who We Are, company intro.
export function WhoWeAre() {
  return (
    <section id="who" className="section">
      <div className="wrap">
        <div className="who-grid">
          <Reveal>
            <div>
              <span className="eyebrow">Who we are</span>
              <h2 className="who-h">
                Transforming how <span className="serif grad-flame">Africa cooks.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="who-body">
              Ignis Innovation is an energy services company working across East Africa.
              Ignis manages and implements clean cooking and clean energy programmes for
              institutions, replacing charcoal and biomass with efficient, sustainable
              infrastructure. Institutions pay from their existing fuel budgets, with no
              upfront capital and ownership transferring at the end of term.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
