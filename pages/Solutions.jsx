import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { Flow } from '@/components/home/Flow';
import { Serve } from '@/components/home/Serve';
import { CleanCooking } from '@/components/solutions/CleanCooking';
import { Model } from '@/components/home/Model';
import { Compare } from '@/components/home/Compare';
import { FinanceSplit } from '@/components/home/FinanceSplit';

export default function Solutions() {
  useSeo({
    title: 'Clean Energy Solutions, Model & Financing | IGNIS',
    description: 'One agreement covers design, delivery, maintenance and monitoring. You pay a fixed fee from your existing fuel budget, with no upfront capital and ownership at end of term.',
    path: '/solutions',
  });
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        segments={['Clean energy,', 'delivered', { text: 'end to end.', className: 'serif grad-flame' }]}
        sub="One agreement covers design, delivery, maintenance and monitoring. You pay a fixed fee from your existing fuel budget, with no upfront capital and ownership transferring at the end of term."
      />
      <Flow />
      <Serve />
      <CleanCooking />
      <Model />
      <Compare />
      <FinanceSplit />
    </>
  );
}
