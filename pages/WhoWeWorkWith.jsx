import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { Reveal } from '@/components/motion/Reveal';
import { IconCard } from '@/components/ui/Cards';
import { audiences } from '@/content/audiences';

// Hub for "Who We Work With": one card per audience, each linking to its page.
export default function WhoWeWorkWith() {
  useSeo(seoFor('/who-we-work-with'));
  return (
    <>
      <PageHero
        eyebrow="Who We Work With"
        segments={['Who we', { text: 'work with.', className: 'serif grad-flame' }]}
        sub="Start with the conversation that fits your role."
        image={HERO['school-meal'].src}
        imageAlt={HERO['school-meal'].alt}
      />
      <section className="section">
        <div className="wrap">
          <div className="card-grid card-grid--3">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delay={i * 60}>
                <IconCard icon={a.icon} title={a.eyebrow} headingLevel="h2" to={`/who-we-work-with/${a.id}`} cta={`For ${a.eyebrow}`}>
                  {a.card}
                </IconCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
