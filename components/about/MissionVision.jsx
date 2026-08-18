import { Reveal } from "@/components/motion/Reveal";

// Mission & Vision, what we build and why.
export function MissionVision() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>What we build, and why we build it.</h2>
          <p>Designed for institutions and households across Africa.</p>
        </Reveal>

        <div className="fin-grid" style={{ marginTop: 44 }}>
          <Reveal>
            <div className="fin-card glass">
              <span className="ey">Vision</span>
              <h3>A cleaner, healthier, and more equitable Africa.</h3>
              <p>
                Powered by sustainable, efficient, and dignified cooking solutions, for every
                kitchen, in every community.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="fin-card glass">
              <span className="ey">Mission</span>
              <h3>Help Africa cook smarter, cleaner, and with dignity.</h3>
              <p>
                We manage and implement clean energy programmes for institutions and households,
                blending finance and delivery to make the transition real.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
