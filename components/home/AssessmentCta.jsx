import { ArrowUpRight } from "lucide-react";
import { Ambient } from "@/components/motion/Ambient";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

export function AssessmentCta({ heading, blurb } = {}) {
  return (
    <section id="assessment" className="section">
      <div className="wrap">
        <Reveal className="cta glass">
          <Ambient specks={false} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2>
              {heading ?? (
                <>
                  Send us your <span className="serif grad-flame">kitchen.</span>
                </>
              )}
            </h2>
            <p>
              {blurb ??
                "Meal volumes, current fuel spend, a few photos. We come back with a system design and a savings figure for your institution, not a brochure."}
            </p>
            <form className="cta-form" action={`mailto:${SITE.email}`} method="post">
              <input type="text" placeholder="Institution" aria-label="Institution" />
              <input type="text" placeholder="Meals per day" aria-label="Meals per day" />
              <input type="text" placeholder="Email or WhatsApp" aria-label="Email or WhatsApp" />
              <button type="submit" className="btn btn-flame">
                Send <ArrowUpRight size={16} />
              </button>
            </form>
            <p className="wa">
              Or WhatsApp us directly: <a href={`https://wa.me/${SITE.whatsapp}`}>{SITE.phone}</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
