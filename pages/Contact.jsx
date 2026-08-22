import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { Channels } from '@/components/contact/Channels';
import { AssessmentCta } from '@/components/home/AssessmentCta';
import { MapDirections } from '@/components/contact/MapDirections';
import { Faq } from '@/components/contact/Faq';

export default function Contact() {
  useSeo({
    title: 'Book a Kitchen Assessment | IGNIS',
    description: 'Send us your meal volumes and fuel spend. We reply within two working days with a system design and a savings figure for your institution. Nairobi, Kenya.',
    path: '/contact',
  });
  return (
    <>
      <PageHero
        eyebrow="Contact"
        segments={['Send us your', { text: 'kitchen.', className: 'serif grad-flame' }]}
        sub="Meal volumes, current fuel spend, a few photos. We reply within two working days with a system design and a savings figure."
      />
      <Channels />
      <AssessmentCta
        heading={<>The <span className="serif grad-flame">assessment</span> request</>}
        blurb="Fill this in and we'll come back with a system design and a savings figure, not a brochure. Prefer WhatsApp? It's above, and it's faster."
      />
      <MapDirections />
      <Faq />
    </>
  );
}
