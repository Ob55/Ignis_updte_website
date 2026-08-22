import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { SITE } from '@/lib/site';

export default function ThankYou() {
  useSeo({
    title: 'Thank you | IGNIS',
    description: 'Thank you for your enquiry. The IGNIS team will reply within two working days with a system design and a savings figure.',
    path: '/thank-you',
    noindex: true,
  });
  return (
    <>
      <PageHero
        eyebrow="Enquiry received"
        segments={['Thank you.', { text: "We're on it.", className: 'serif grad-flame' }]}
        sub="Your enquiry is in. Our team reviews meal volumes and fuel spend, then replies within two working days with a system design and a savings figure, not a brochure."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="ty-actions">
            <a className="btn btn-flame" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} style={{ marginRight: 8 }} /> Reach us faster on WhatsApp
            </a>
            <Link className="btn btn-glass glass" to="/solutions">
              Explore how the model works <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
