import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE, MAPS_DIRECTIONS } from "@/lib/site";

// One primary action (WhatsApp) plus a quiet list of the other routes, rather
// than four equal-weight tiles that made every channel look equally likely.
const ROWS = [
  { icon: Phone, k: "Phone", v: SITE.phone, href: `tel:${SITE.phoneHref}` },
  { icon: Mail, k: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, k: "Office", v: SITE.address.short, href: MAPS_DIRECTIONS, external: true }
];

export function Channels() {
  return (
    <section className="section" style={{ paddingTop: 48 }}>
      <div className="wrap">
        <Reveal>
          <div className="channel-panel glass">
            <div className="channel-lead">
              <span className="channel-eyebrow">Talk to us</span>
              <h2>The fastest way to reach us.</h2>
              <p>
                Most conversations start on WhatsApp. Send a photo of your kitchen and
                roughly how many meals a day you cook, and we will take it from there.
              </p>
              <div className="channel-actions">
                <a
                  className="btn btn-flame"
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={17} strokeWidth={1.9} style={{ marginRight: 8 }} />
                  WhatsApp us
                </a>
                <a className="channel-secondary" href={`tel:${SITE.phoneHref}`}>
                  or call {SITE.phone}
                </a>
              </div>
            </div>

            <ul className="channel-list">
              {ROWS.map(({ icon: Icon, k, v, href, external }) => (
                <li key={k}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="disc glass" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="channel-text">
                      <span className="k">{k}</span>
                      <span className="v">{v}</span>
                    </span>
                    <ArrowUpRight className="channel-arrow" size={17} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
