import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/ui/Cards";
import { publishedCaseStudies } from "@/content/case-studies";
import { approvedPartners } from "@/content/partners";

// Block 13: Our work and partners (merges the old "Our work" and "Built with the
// sector" sections). Space for up to three case-study cards instead of a logo
// wall; partner logos render only once their approval is recorded.
const EXPLORE = [
  { to: "/our-work/projects", label: "Projects" },
  { to: "/our-work/case-studies", label: "Case Studies" },
  { to: "/about#partners", label: "Partners" },
  { to: "/our-work/field-notes", label: "Field Notes" },
];

// From opportunity (data in the field) to implementation (installed systems).
const MOSAIC = [
  { slot: "tall", src: "/img/solutions-cookers.jpg", label: "Implementation",
    alt: "A finished clean-cooking kitchen with installed cookers at a Kenyan school" },
  { slot: "top", src: "/img/hero/field-data-kenya.jpg", label: "Assessment",
    alt: "A field worker in Kenya recording data on a phone beside a paper notebook" },
  { slot: "bottom", src: "/img/hero/institutional-stoves.jpg", label: "Deployment",
    alt: "Two improved institutional cookstoves installed in a school kitchen in Kenya" },
];

export function OurWork() {
  const cases = publishedCaseStudies.slice(0, 3);
  return (
    <section id="our-work" className="section">
      <div className="wrap">
        <div className="split split--media">
          <div>
            <Reveal className="section-head">
              <h2>From opportunity to implementation.</h2>
              <p>
                Our work spans institutional assessments, county and programme development,
                clean-cooking technology deployment, financing structures and digital infrastructure.
              </p>
            </Reveal>
            <nav className="explore-links" aria-label="Explore our work">
              {EXPLORE.map((l) => (
                <Link key={l.to} to={l.to} className="explore-link">
                  {l.label} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
          {/* Illustrative photos of the journey (Wikimedia Commons, see /credits), not
              Ignis projects. TODO(content): replace with Ignis project photos. */}
          <Reveal className="mosaic" delay={120}>
            {MOSAIC.map((m) => (
              <figure key={m.src} className={`mosaic-item mosaic-item--${m.slot}`}>
                <img src={m.src} alt={m.alt} loading="lazy" />
                <figcaption>{m.label}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>

        {/* TODO(partner-approval): case-study cards appear here (max 3) once published. */}
        {cases.length > 0 && (
          <div className="card-grid card-grid--3" style={{ marginTop: 40 }}>
            {cases.map((c) => (
              <ProjectCard
                key={c.slug}
                project={{
                  title: c.project,
                  location: c.location,
                  image: c.image,
                  imageAlt: c.imageAlt,
                  stats: c.stats,
                  link: { to: `/our-work/case-studies/${c.slug}`, label: "Read the case study" },
                }}
              />
            ))}
          </div>
        )}

        <div className="subblock">
          <h3>Built with the sector, not around it.</h3>
          <p>
            We collaborate with public institutions, counties, development partners, financial
            institutions, technology providers and sector organisations to move clean-cooking
            projects from opportunity to implementation.
          </p>
          {approvedPartners.length > 0 && (
            <ul className="logo-row">
              {approvedPartners.map((p) => (
                <li key={p.src}><img src={p.src} alt={p.name} loading="lazy" /></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
