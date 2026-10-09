import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

// Block 8: CleanCookIQ, short. Text on the left; a real screenshot of the live
// platform (National Institution Map, cleancookiq.com) on the right, framed as a
// browser window. The platform step sequence lives on /cleancookiq only.
export function CleanCookIQ() {
  return (
    <section id="cleancookiq" className="section">
      <div className="wrap">
        <Reveal className="callout-panel callout-panel--split">
          <div className="callout-copy">
            <h2>CleanCookIQ: the data behind every decision.</h2>
            <p>
              CleanCookIQ is Ignis&apos;s digital infrastructure for collecting, validating, analysing
              and managing institutional clean-cooking transition data. For institutions, it supports
              a clear, costed transition pathway. For financiers and programme partners, it provides
              structured information, project economics and performance evidence. For governments,
              it gives portfolio-level visibility of demand and transition progress.
            </p>
            <div className="btn-row">
              <Button to="/cleancookiq" variant="primary">Explore CleanCookIQ</Button>
            </div>
          </div>

          <figure className="browser-frame">
            <div className="browser-bar" aria-hidden="true">
              <span className="browser-dots"><i /><i /><i /></span>
              <span className="browser-url">cleancookiq.com/map</span>
            </div>
            <a href="https://cleancookiq.com/map" target="_blank" rel="noopener noreferrer" aria-label="Open the CleanCookIQ National Institution Map">
              <img
                src="/img/cleancookiq/map.jpg"
                alt="CleanCookIQ National Institution Map: a map of Kenya with clusters of institutions and filters by type, county and stage"
                loading="lazy"
                width="1200"
                height="750"
              />
            </a>
            <figcaption>National Institution Map: every institution in the pipeline, by type, county and stage.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
