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
              IGNIS Innovation Africa is a Kenyan-based clean energy company transforming how Africa
              cooks. We design, manufacture, and deploy clean cooking technologies that replace
              polluting fuels like charcoal and biomass with efficient, sustainable alternatives ,
              built for the demands of institutional kitchens.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
