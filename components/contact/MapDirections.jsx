import { MapPin, Navigation } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

// Google Maps embed keyed off the plus code (no API key required), plus a
// "Get directions" deep link that opens the user's maps app.
const PLUS_CODE = "PQWX+232 Nairobi";
const EMBED = `https://www.google.com/maps?q=${encodeURIComponent(PLUS_CODE)}&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(PLUS_CODE)}`;

export function MapDirections() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Find us</span>
          <h2>The Pavilion, Lower Kabete Road.</h2>
        </Reveal>
        <div className="map-wrap" style={{ marginTop: 32 }}>
          <div className="map-frame glass">
            <iframe
              src={EMBED}
              title="IGNIS Innovation Africa office location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="map-aside glass">
            <div className="disc glass" aria-hidden="true"><MapPin size={22} strokeWidth={1.6} /></div>
            <h3>IGNIS Innovation Africa</h3>
            <p>
              The Pavilion, Lower Kabete Road<br />
              Nairobi, Kenya<br />
              P.O. Box 65603-00607<br />
              Plus code: PQWX+232 Nairobi
            </p>
            <a className="btn btn-flame" href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
              <Navigation size={16} style={{ marginRight: 8 }} /> Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
