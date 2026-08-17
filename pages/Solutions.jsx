import { useTitle } from '@/lib/useTitle';
import { PageHero } from '@/components/chrome/PageHero';
import { Flow } from '@/components/home/Flow';
import { Serve } from '@/components/home/Serve';
import { CleanCooking } from '@/components/solutions/CleanCooking';
import { Model } from '@/components/home/Model';
import { Compare } from '@/components/home/Compare';
import { FinanceSplit } from '@/components/home/FinanceSplit';

export default function Solutions() {
  useTitle('Steam Kitchen System, Model & Financing | IGNIS');
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        segments={['Steam', 'kitchens,', { text: 'end to end.', className: 'serif grad-flame' }]}
        sub="Combustion happens once, in a sealed boiler outside the kitchen. We design the system, finance it, build it, and run it, you cook."
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
