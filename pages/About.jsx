import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { AboutCompany } from '@/components/about/AboutCompany';
import { MissionVision } from '@/components/about/MissionVision';
import { CoreValues } from '@/components/about/CoreValues';
import { Culture } from '@/components/about/Culture';
import { Crew } from '@/components/team/Crew';

export default function About() {
  useSeo(seoFor('/about'));
  return (
    <>
      <PageHero
        eyebrow="About us"
        segments={['An energy services company,', { text: 'built in Kenya.', className: 'serif grad-flame' }]}
        sub="Kenya-proven and working across Africa. We build the delivery and financing infrastructure for institutional clean energy, connecting the demand, the economics and the technology."
        image="/img/about.jpg"
        imageAlt="Cooks working the line in a large stainless-steel institutional kitchen"
      />
      <AboutCompany />
      <MissionVision />
      <CoreValues />
      <Culture />
      <Crew />
    </>
  );
}
