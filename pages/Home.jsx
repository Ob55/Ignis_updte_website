import { useTitle } from '@/lib/useTitle';
import { Hero } from '@/components/home/Hero';
import { WhoWeAre } from '@/components/home/WhoWeAre';
import { Highlights } from '@/components/home/Highlights';
import { SavingsCalc } from '@/components/home/SavingsCalc';
import { StatBar } from '@/components/home/StatBar';
import { Geography } from '@/components/home/Geography';
import { Partners } from '@/components/home/Partners';

// Narrative flow:
// Hero (vision), Who we are, Highlights (what we offer), Savings (why it pays),
// Impact (proof at scale), Geography (reach), Partners (trust), CTA.
export default function Home() {
  useTitle('Powering Africa\'s Clean Cooking Transition | IGNIS');
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Highlights />
      <SavingsCalc />
      <StatBar />
      <Geography />
      <Partners />
    </>
  );
}
