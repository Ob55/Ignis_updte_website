import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";

// CleanCookIQ marketing strip on the home page. CleanCookIQ has its own detail
// page (/cleancookiq); this teaser links there. Balanced section padding keeps
// the card centered with breathing room from the sections above and below.
export function CleanCookIQ() {
  return (
    <section id="cleancookiq" className="section">
      <div className="wrap">
        <Reveal className="kitchen-cta kitchen-cta--center glass">
          <div>
            <span className="k">CleanCookIQ</span>
            <h3>Measured, reported, verified.</h3>
            <p>
              Our standalone measurement, reporting and verification platform. Digital
              monitoring runs from commissioning, tracking fuel savings, uptime and verified
              impact at every site, the data that triggers payment and that financiers rely on.
            </p>
          </div>
          <Link className="btn btn-flame" to="/cleancookiq">
            Explore CleanCookIQ <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
