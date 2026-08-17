import { useTitle } from '@/lib/useTitle';
import { PageHero } from '@/components/chrome/PageHero';
import { AboutCompany } from '@/components/about/AboutCompany';
import { MissionVision } from '@/components/about/MissionVision';
import { CoreValues } from '@/components/about/CoreValues';
import { Culture } from '@/components/about/Culture';
import { Crew } from '@/components/team/Crew';
import { AssessmentCta } from '@/components/home/AssessmentCta';

export default function About() {
  useTitle('About Us, IGNIS Innovation Africa');
  return (
    <>
      <PageHero
        eyebrow="About us"
        segments={['Clean, safe, affordable cooking ,', { text: 'for everyone.', className: 'serif grad-flame' }]}
        sub="A Kenyan clean energy company making dignified cooking a reality for households and institutions across Africa."
      />
      <AboutCompany />
      <MissionVision />
      <CoreValues />
      <Culture />
      <Crew />
      <AssessmentCta />
    </>
  );
}
