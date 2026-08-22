import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { CaseStudies } from '@/components/insights/CaseStudies';
import { LogTeaser } from '@/components/home/LogTeaser';

export default function Blog() {
  useSeo({
    title: 'Insights, Field Notes & Fuel Data | IGNIS',
    description: 'Commissioning reports, fuel consumption data and case studies from live IGNIS institutional clean energy sites across Africa.',
    path: '/blog',
  });
  return (
    <>
      <PageHero
        eyebrow="Blog & posts"
        segments={['Field notes from', { text: 'live sites.', className: 'serif grad-flame' }]}
        sub="Commissioning reports, fuel consumption data, and what breaks in month eight, the data a financier actually reads."
      />
      <CaseStudies />
      <LogTeaser />
    </>
  );
}
