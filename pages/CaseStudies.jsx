import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { ProjectCard } from '@/components/ui/Cards';
import { publishedCaseStudies } from '@/content/case-studies';

// Case Studies index. Only permission-cleared case studies are listed.
export default function CaseStudies() {
  useSeo(seoFor('/our-work/case-studies'));
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        image={HERO['doho-school'].src}
        imageAlt={HERO['doho-school'].alt}
        segments={['Case Studies']}
        sub="Where we work, with whom, and what changed. We publish a case study only once the counterparty approves."
      />
      <section className="section">
        <div className="wrap">
          {publishedCaseStudies.length > 0 ? (
            <div className="card-grid card-grid--3">
              {publishedCaseStudies.map((c) => (
                <ProjectCard
                  key={c.slug}
                  project={{
                    title: c.project,
                    location: c.location,
                    image: c.image,
                    imageAlt: c.imageAlt,
                    stats: c.stats,
                    link: { to: `/our-work/case-studies/${c.slug}`, label: 'Read the case study' },
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="lead">The first case studies publish as partner approvals come through.</p>
          )}
        </div>
      </section>
    </>
  );
}
