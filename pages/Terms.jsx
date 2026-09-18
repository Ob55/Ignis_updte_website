import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { SITE } from '@/lib/site';

export default function Terms() {
  useSeo({
    title: 'Terms of Use | IGNIS',
    description: 'The terms on which IGNIS Innovation Africa makes this website and its assessment request service available.',
    path: '/terms',
  });
  return (
    <>
      <PageHero
        eyebrow="Terms"
        segments={['Terms of', { text: 'use.', className: 'serif grad-flame' }]}
        sub="The terms on which we make this site available. Last updated September 2026."
      />
      <section className="section">
        <div className="wrap">
          <Reveal className="legal">
            <h2>Who we are</h2>
            <p>
              This website is operated by {SITE.legalName}, an energy services company registered in
              Kenya with offices at {SITE.address.street}, {SITE.locality}. You can reach us at{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>

            <h2>Using this site</h2>
            <p>
              You may use this site to learn about our services and to contact us. You agree not to
              misuse it — for example by attempting to gain unauthorised access, interfering with its
              operation, scraping it at a scale that degrades service for others, or submitting the
              contact form for anything other than a genuine enquiry.
            </p>

            <h2>Assessment requests are not an offer</h2>
            <p>
              Requesting an assessment does not create a contract between us. Any savings figures,
              system designs, timelines or financing structures we share in response are indicative
              estimates prepared from the information you give us. They are not a quotation, a
              guarantee of results, or an offer capable of acceptance. Work only begins under a
              separate written agreement signed by both parties.
            </p>

            <h2>Information on this site</h2>
            <p>
              We publish fuel costs, savings ranges and sector data in good faith and cite sources
              where we can. Prices, fuel economics and regulations change, and figures shown are
              illustrative rather than a promise of any particular outcome for your institution. You
              should not rely on this site alone when making an investment decision.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The content, branding and design of this site belong to {SITE.legalName} or our
              licensors. You may read, share and quote it with attribution. You may not reproduce it
              commercially, or present it as your own, without our written permission.
            </p>

            <h2>Third-party links and services</h2>
            <p>
              This site links to third-party sites and embeds services such as Google Maps. We do not
              control those services and are not responsible for their content or their handling of
              your data.
            </p>

            <h2>Liability</h2>
            <p>
              We provide this site on an &quot;as is&quot; basis and do not guarantee that it will be
              uninterrupted or error-free. To the extent permitted by Kenyan law, we are not liable
              for indirect or consequential loss arising from your use of this site. Nothing here
              limits liability that cannot lawfully be limited.
            </p>

            <h2>Privacy</h2>
            <p>
              Our <a href="/privacy">privacy policy</a> explains what we collect when you use this
              site and what we do with it.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of Kenya, and the courts of Kenya have exclusive
              jurisdiction over any dispute arising from them.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms. The date above shows when they last changed.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
