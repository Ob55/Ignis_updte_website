import { useTitle } from '@/lib/useTitle';
import { PageHero } from '@/components/chrome/PageHero';
import { LogTeaser } from '@/components/home/LogTeaser';

export default function Blog() {
  useTitle('Field Log, Commissioning Notes & Fuel Data | IGNIS');
  return (
    <>
      <PageHero
        eyebrow="Blog & posts"
        segments={['Field notes from', { text: 'live sites.', className: 'serif grad-flame' }]}
        sub="Commissioning reports, fuel consumption data, and what breaks in month eight, the data a financier actually reads."
      />
      <LogTeaser />
    </>
  );
}
