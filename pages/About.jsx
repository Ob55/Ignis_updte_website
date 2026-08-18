import { useTitle } from '@/lib/useTitle';
import { PageHero } from '@/components/chrome/PageHero';
import { AboutCompany } from '@/components/about/AboutCompany';
import { MissionVision } from '@/components/about/MissionVision';
import { CoreValues } from '@/components/about/CoreValues';
import { Culture } from '@/components/about/Culture';
import { Crew } from '@/components/team/Crew';

export default function About() {
  useTitle('About Us, IGNIS Innovation Africa');
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
