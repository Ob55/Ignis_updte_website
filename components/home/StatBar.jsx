import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

// Impact numbers, a snapshot of scale and outcomes across our operations.
export function StatBar() {
  return (
    <section id="impact" className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="section-head" style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="eyebrow" style={{ margin: "0 auto" }}>Impact numbers</span>
          <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>Scale and outcomes across our operations.</h2>
        </Reveal>
        <Reveal className="stats">
          <div className="stats-card glass">
            <div className="stat">
              <div className="n"><CountUp to={300} format suffix="+" /></div>
              <span className="l">Institutions assessed</span>
            </div>
            <div className="stat">
              <div className="n"><CountUp to={10000} format suffix="+ t" /></div>
              <span className="l">Tonnes CO2 reduced</span>
            </div>
            <div className="stat">
              <div className="n"><CountUp to={5} /></div>
              <span className="l">Markets active</span>
            </div>
            <div className="stat">
              <div className="n"><CountUp to={500000} format suffix="+" /></div>
              <span className="l">Meals cooked daily</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
