import { Reveal } from '@/components/motion/Reveal';

const STATS = [
  { n: '11+', l: 'Sites commissioned' },
  { n: '4', l: 'Disciplines in-house' },
  { n: '2023', l: 'First deployment' },
  { n: 'Nairobi', l: 'Base of operations' },
];

// Founding story, includes the failure on purpose (a story with no failure
// reads as marketing; one with a specific failure reads as engineering).
export function Origin() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="origin-grid">
          <Reveal>
            <div>
              <span className="eyebrow">Why we started here</span>
              <h2 className="origin-h">We started with the biggest kitchens.</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="origin-body">
              <p>
                Institutions were the largest single firewood consumers in the country, and the
                least served by household clean-cooking products. A boarding school can burn through
                more wood in a term than a village does in a year, so that is where the savings, and
                the emissions, actually are.
              </p>
              <p>
                Our first site did not go to plan. We sized the boiler for the average week and it
                fell short during exam term, when meal volumes spike. We re-sized for the peak, not
                the average, and that rule now shapes every survey we run.
              </p>
              <p>
                What we sell is not a stove. It is uptime, the confidence that the kitchen produces
                every meal, every day, on a fuel bill the institution can afford.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="origin-stats" delay={80}>
          {STATS.map((s) => (
            <div className="origin-stat" key={s.l}>
              <div className="n">{s.n}</div>
              <span className="l">{s.l}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
