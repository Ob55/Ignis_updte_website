import { Reveal } from "@/components/motion/Reveal";

// Our Culture, how we work and what defines us.
export function Culture() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="who-grid">
          <Reveal>
            <div>
              <h2 className="who-h">How we work, and what <span className="serif grad-flame">defines us.</span></h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="who-body">
              <p>
                At IGNIS, we thrive on collaboration, innovation, and impact-driven action. Our team
                combines global expertise with deep local insights, working in agile loops of design,
                testing, and deployment. We prioritize field realities, user feedback, and transparent
                data to create solutions that truly work in African contexts.
              </p>
              <p>
                Our culture is defined by relentless problem-solving, respect for communities, and a
                commitment to long-term partnerships, an environment where creativity meets
                accountability to build a cleaner, healthier future.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
