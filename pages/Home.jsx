import { useSeo } from '@/lib/seo';
import { Hero } from '@/components/home/Hero';
import { WhoWeAre } from '@/components/home/WhoWeAre';
import { Highlights } from '@/components/home/Highlights';
import { SavingsCalc } from '@/components/home/SavingsCalc';
import { StatBar } from '@/components/home/StatBar';
import { CleanCookIQ } from '@/components/home/CleanCookIQ';
import { Geography } from '@/components/home/Geography';
import { Reviews } from '@/components/home/Reviews';
import { Partners } from '@/components/home/Partners';

// Narrative flow:
// Hero (vision), Who we are, Highlights (what we offer), Savings (why it pays),
// Impact (proof at scale), Geography (reach), Partners (trust), CTA.
export default function Home() {
  useSeo({
    title: 'Africa\'s Energy Services Platform for Institutions & Industry | IGNIS',
    description: 'IGNIS manages and implements clean energy programmes for institutions across Africa. Turn your fuel budget into modern cooking infrastructure, with no upfront capital.',
    path: '/',
  });
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Highlights />
      <SavingsCalc />
      <StatBar />
      <CleanCookIQ />
      <Geography />
      <Reviews />
      <Partners />
    </>
  );
}
