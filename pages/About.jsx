import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { AboutCompany } from '@/components/about/AboutCompany';
import { MissionVision } from '@/components/about/MissionVision';
import { CoreValues } from '@/components/about/CoreValues';
import { Culture } from '@/components/about/Culture';
import { Crew } from '@/components/team/Crew';
import { AboutPartners } from '@/components/about/AboutPartners';

export default function About() {
  useSeo(seoFor('/about'));
  return (
    <>
      <PageHero
        eyebrow="About us"
        segments={['An energy services company,', { text: 'built in Kenya.', className: 'serif grad-flame' }]}
        sub="We build the delivery and financing infrastructure for institutional clean cooking, connecting the demand, the economics and the technology."
        image="/img/about-nairobi.jpg"
        imageAlt="A buffalo grazing in Nairobi National Park with the Nairobi skyline behind"
      />
      <AboutCompany />
      <MissionVision />
      <CoreValues />
      <Culture />
      <Crew />
      <AboutPartners />
    </>
  );
}
