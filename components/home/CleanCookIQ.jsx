import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

// CleanCookIQ marketing strip. Per the PRD, CleanCookIQ is a separate standalone
// MRV platform: the site links to it, it is not embedded here.
const CLEANCOOKIQ_URL = "https://cleancookiq.com/";

export function CleanCookIQ() {
  return (
    <section id="cleancookiq" className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="kitchen-cta glass">
          <div>
            <span className="k">CleanCookIQ</span>
            <h3>Measured, reported, verified.</h3>
            <p>
              Our standalone measurement, reporting and verification platform. Digital
              monitoring runs from commissioning, tracking fuel savings, uptime and verified
              impact at every site, the data that triggers payment and that financiers rely on.
            </p>
          </div>
          <a className="btn btn-flame" href={CLEANCOOKIQ_URL} target="_blank" rel="noopener noreferrer">
            Explore CleanCookIQ <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
