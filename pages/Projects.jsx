import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { TodoPlaceholder } from '@/components/ui/Cards';

export default function Projects() {
  useSeo(seoFor('/our-work/projects'));
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        image={HERO['likoni-cook'].src}
        imageAlt={HERO['likoni-cook'].alt}
        segments={['Projects']}
        sub="Institutional assessments, programme development, technology deployment, financing structures and digital infrastructure."
      />
      <section className="section">
        <div className="wrap">
          {/* TODO(content): project list. Name a project only with counterparty approval (TODO(partner-approval)). */}
          <TodoPlaceholder>Projects are listed here once each counterparty approves publication.</TodoPlaceholder>
        </div>
      </section>
    </>
  );
}
