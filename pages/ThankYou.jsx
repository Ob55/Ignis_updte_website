import { MessageCircle } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

export default function ThankYou() {
  useSeo(seoFor('/thank-you'));
  return (
    <>
      <PageHero
        eyebrow="Enquiry received"
        image={HERO['nairobi-uhuru-park'].src}
        imageAlt={HERO['nairobi-uhuru-park'].alt}
        segments={['Thank you.', { text: "We're on it.", className: 'serif grad-flame' }]}
        sub="Your enquiry is in. We will review what you sent and reply within two working days with the recommended next step. If you have kitchen photos, send them on WhatsApp or by email."
      />
      <section className="section">
        <div className="wrap">
          <Reveal className="btn-row">
            <Button href={`https://wa.me/${SITE.whatsapp}`} variant="primary" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden="true" /> Send photos on WhatsApp
            </Button>
            <Button to="/what-we-do" variant="secondary">See what we do</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
