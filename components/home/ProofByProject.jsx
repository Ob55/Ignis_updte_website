import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/ui/Cards";
import { publishedCaseStudies } from "@/content/case-studies";
import { approvedPartners } from "@/content/partners";

// Fallback for Block 9 while the numbers strip is hidden: "proof by project" —
// approved project names, verified activities, partner logos and photos.
// TODO(partner-approval): every item here needs counterparty approval; it draws
// only on published case studies and approved partner logos, so it renders
// nothing until those exist.
// TODO(content): final heading for this block ("Proof by project" is a working title).
export function ProofByProject() {
  const projects = publishedCaseStudies.slice(0, 3);
  if (projects.length === 0 && approvedPartners.length === 0) return null;

  return (
    <section id="proof" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Proof by project</h2>
        </Reveal>
        {projects.length > 0 && (
          <div className="card-grid card-grid--3" style={{ marginTop: 32 }}>
            {projects.map((c) => (
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
        {approvedPartners.length > 0 && (
          <ul className="logo-row">
            {approvedPartners.map((p) => (
              <li key={p.src}><img src={p.src} alt={p.name} loading="lazy" /></li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
