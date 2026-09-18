import { MapPin, Navigation } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE, MAPS_EMBED, MAPS_DIRECTIONS } from "@/lib/site";

// Google Maps embed keyed off the plus code (no API key required), plus a
// "Get directions" deep link that opens the user's maps app. Address and links
// both come from lib/site.js so they cannot drift from the contact panel.

export function MapDirections() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Find us</span>
          <h2>{SITE.address.street}.</h2>
        </Reveal>
        <div className="map-wrap" style={{ marginTop: 32 }}>
          <div className="map-frame glass">
            <iframe
              src={MAPS_EMBED}
              title="IGNIS Innovation Africa office location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="map-aside glass">
            <div className="disc glass" aria-hidden="true"><MapPin size={22} strokeWidth={1.6} /></div>
            <h3>{SITE.legalName}</h3>
            <p>
              {SITE.address.street}<br />
              {SITE.locality}, Kenya<br />
              {SITE.address.poBox}<br />
              Plus code: {SITE.address.plusCode}
            </p>
            <a className="btn btn-flame" href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer">
              <Navigation size={16} style={{ marginRight: 8 }} /> Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
