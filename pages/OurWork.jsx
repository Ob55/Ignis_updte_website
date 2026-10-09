import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';

const SECTIONS = [
  { to: '/our-work/projects', h: 'Projects' },
  { to: '/our-work/case-studies', h: 'Case Studies' },
  { to: '/our-work/field-notes', h: 'Insights / Field Notes' },
];

export default function OurWork() {
  useSeo(seoFor('/our-work'));
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        segments={['From opportunity to', { text: 'implementation.', className: 'serif grad-flame' }]}
        sub="Our work spans institutional assessments, county and programme development, clean-cooking technology deployment, financing structures and digital infrastructure."
        image={HERO['open-fire-cooking'].src}
        imageAlt={HERO['open-fire-cooking'].alt}
      />
      <section className="section">
        <div className="wrap">
          <div className="card-grid card-grid--3">
            {SECTIONS.map((s) => (
              <Link key={s.to} to={s.to} className="link-card">
                <h2>{s.h}</h2>
                <span className="card-link">Explore <ArrowUpRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
