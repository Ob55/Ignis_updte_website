import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";

// Real partner logos (public/partners). Named for alt text / credibility.
const PARTNERS = [
  { src: "/partners/partner1.png", alt: "National Polytechnic" },
  { src: "/partners/partner2.png", alt: "Kenya Power" },
  { src: "/partners/partner3.png", alt: "Caritas" },
  { src: "/partners/partner4.png", alt: "MECS · UK International Development" },
  { src: "/partners/partner5.png", alt: "Republic of Kenya · NACONEK" },
  { src: "/partners/partner6.png", alt: "KCB Bank" },
  { src: "/partners/partner7.png", alt: "Verst Carbon" },
];

// Partners, public institutions, development partners, private sector.
export function Partners() {
  return (
    <section id="partners" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Partners</span>
          <h2>Built with the sector, not around it.</h2>
          <p>
            We collaborate with public institutions, development partners, and private-sector
            stakeholders to deliver safe, scalable clean cooking solutions.
          </p>
        </Reveal>
      </div>

      <div className="partner-marquee" style={{ marginTop: 48 }}>
        <Marquee>
          {PARTNERS.map((p) => (
            <span className="partner-logo" key={p.src}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
