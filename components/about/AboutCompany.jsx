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
                Founded in Kenya to address Africa&apos;s persistent clean cooking crisis, IGNIS
                Innovation Africa is driven by a mission to make clean, safe, and affordable cooking a
                reality for every household and institution. With over 970 million people in Africa
                still relying on polluting fuels, we bridge the energy access gap through innovative
                steam-based technologies, digital transparency, and scalable deployment.
              </p>
              <p className="who-mission">
                Our mission: provide high-impact clean cooking solutions that are user-centric,
                verifiable, and transformative, catalyzing health improvements, gender equity,
                climate action, and sustainable development across the continent.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
