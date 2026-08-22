import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { AboutCompany } from '@/components/about/AboutCompany';
import { MissionVision } from '@/components/about/MissionVision';
import { CoreValues } from '@/components/about/CoreValues';
import { Culture } from '@/components/about/Culture';
import { Crew } from '@/components/team/Crew';

export default function About() {
  useSeo({
    title: 'About IGNIS Innovation Africa',
    description: 'Kenya-proven and working across Africa, IGNIS builds the delivery and financing infrastructure for institutional clean energy, connecting demand, economics and technology.',
    path: '/about',
  });
  return (
    <>
      <PageHero
        eyebrow="About us"
        segments={['An energy services company,', { text: 'built in Kenya.', className: 'serif grad-flame' }]}
        sub="Kenya-proven and working across Africa. We build the delivery and financing infrastructure for institutional clean energy, connecting the demand, the economics and the technology."
      />
      <AboutCompany />
      <MissionVision />
      <CoreValues />
      <Culture />
      <Crew />
    </>
  );
}
