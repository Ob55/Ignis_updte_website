import { Reveal } from "@/components/motion/Reveal";

// Our Company + mission.
export function AboutCompany() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="who-grid">
          <Reveal>
            <div>
              <h2 className="who-h">
                Closing Africa&apos;s <span className="serif grad-flame">clean cooking gap.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="who-body">
              <p>
                Founded in Kenya to close Africa&apos;s institutional clean cooking gap, IGNIS
                Innovation Africa is an energy services company. Institutional energy transition
                already has the demand, the economics, and the technology. What it lacked was the
                delivery and financing infrastructure to connect them. We build it, funded from
                the fuel budgets institutions already spend.
              </p>
              <p className="who-mission">
                Our mission: manage and implement clean energy programmes that are user-centric,
                verifiable, and transformative, so the savings build the system and the health,
                equity, and climate gains follow across the continent.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
