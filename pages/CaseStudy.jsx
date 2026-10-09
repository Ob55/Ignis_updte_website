import { useParams } from 'react-router-dom';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { RequestAssessmentButton, PartnerButton } from '@/components/ui/Button';
import { getCaseStudy, scaleLine } from '@/content/case-studies';
import { ProgrammeJourney } from '@/components/ui/ProgrammeJourney';
import NotFound from '@/pages/NotFound';

// Reusable case-study layout. Renders only PUBLISHED case studies; drafts
// (published: false) fall through to the 404. `approvals` is never rendered.
// Empty fields are skipped rather than shown as placeholders.
const FIELDS = [
  ['problem', 'Problem'],
  ['scope', 'What Ignis did'],
  ['data', 'Data'],
  ['intervention', 'Intervention'],
  ['output', 'Outputs'],
  ['learned', 'What we learned'],
];

export default function CaseStudy() {
  const { slug } = useParams();
  const c = getCaseStudy(slug);
  useSeo(seoFor(c ? `/our-work/case-studies/${slug}` : '/404'));
  if (!c) return <NotFound />;

  const values = { ...c, scope: c.scope || c.role, data: c.data || scaleLine(c) };

  return (
    <>
      <PageHero eyebrow="Case Study" segments={[c.project]} sub={c.summary} image={c.image || HERO['doho-school'].src} imageAlt={c.image ? c.imageAlt : HERO['doho-school'].alt} />
      <section className="section">
        <div className="wrap prose">
          <dl className="case-facts">
            {c.location && (<><dt>Location</dt><dd>{c.location}</dd></>)}
            {c.client && (<><dt>Client / partner</dt><dd>{c.client}</dd></>)}
          </dl>
          {c.programme && (<><h2>Programme</h2><p>{c.programme}</p></>)}
          {FIELDS.map(([k, label]) =>
            values[k] ? (
              <div key={k}>
                <h2>{label}</h2>
                <p>{values[k]}</p>
              </div>
            ) : null
          )}
          {c.result.length > 0 && (
            <>
              <h2>Result</h2>
              <ul className="tick-list">
                {c.result.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </>
          )}
          {c.next && (
            <>
              {/* A proposed step is ALWAYS labelled "Proposed", never presented as done. */}
              <h2>{c.next.status === 'proposed' ? 'Proposed next step' : 'Next step'}</h2>
              <p>{c.next.status === 'proposed' ? `Proposed: ${c.next.text}.` : c.next.text}</p>
            </>
          )}
          {c.journey?.length > 0 && <ProgrammeJourney steps={c.journey} />}
          <div className="btn-row">
            <RequestAssessmentButton />
            <PartnerButton />
          </div>
        </div>
      </section>
    </>
  );
}
