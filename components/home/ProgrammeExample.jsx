import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/ui/Cards";
import { SHOW_TAITA_TAVETA } from "@/content/flags";
import { getAnyCaseStudy, cardSummary } from "@/content/case-studies";

// Block 10: Programme example — Taita-Taveta. HIDDEN BY DEFAULT.
// TODO(partner-approval): IRENA and partners must approve before naming them (decision D4).
// TODO(data): verified number of institutions and sub-counties.
// Any second-round CleanCookIQ validation must be presented as a proposal, not
// completed work. Do not publish confidential field findings.
// Uses the reusable ProjectCard, so other programmes can be added later.
// Copy: the default Block 10 text, switching to the shorter verified-count
// variant (summaryVerified) automatically once scale.institutions is verified.
export function ProgrammeExample() {
  if (!SHOW_TAITA_TAVETA) return null;
  const p = getAnyCaseStudy("taita-taveta");
  if (!p || !p.published) return null; // the case study must also be cleared

  return (
    <section id="programme-example" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>{p.project}</h2>
          <p>{cardSummary(p)}</p>
        </Reveal>
        <Reveal delay={80} style={{ marginTop: 32 }}>
          <ProjectCard
            project={{
              title: p.project,
              location: p.location,
              image: p.image,
              imageAlt: p.imageAlt,
              role: p.role,
              output: p.output,
              stats: p.stats,
              link: { to: `/our-work/case-studies/${p.slug}`, label: "Read the programme story" },
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
