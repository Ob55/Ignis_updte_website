import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { SITE } from '@/lib/site';

export default function Privacy() {
  useSeo({
    title: 'Privacy Policy | IGNIS',
    description: 'How IGNIS Innovation Africa collects, uses and protects the information you share when you enquire about our clean energy services.',
    path: '/privacy',
  });
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        segments={['Privacy', { text: 'policy.', className: 'serif grad-flame' }]}
        sub="How we handle the information you share with us. Last updated August 2026."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="legal">
            <h2>Who we are</h2>
            <p>
              {SITE.legalName} is an energy services company based in Nairobi, Kenya, working with
              institutions across Africa. You can reach us at{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>

            <h2>What we collect</h2>
            <p>
              When you contact us or request a kitchen assessment we collect the details you choose
              to share: your name, institution, contact details, meal volumes, current fuel spend
              and any photos or documents you send. When you browse the site we collect standard
              analytics data such as pages visited and approximate location, through Google
              Analytics.
            </p>

            <h2>How we use it</h2>
            <p>
              We use your enquiry details only to prepare a system design and savings figure and to
              respond to you. We use analytics data to understand how the site is used and to improve
              it. We do not sell your data.
            </p>

            <h2>Who we share it with</h2>
            <p>
              We share information only with the delivery and finance partners needed to progress
              your enquiry, and with service providers such as our analytics and email providers, who
              act on our instructions. We may disclose information where required by law.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry information for as long as needed to serve you and to meet our legal and
              accounting obligations, then delete or anonymise it.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask us to access, correct or delete the personal information we hold about you,
              or to stop contacting you, by emailing{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Under the Kenya Data Protection Act
              2019 you also have the right to lodge a complaint with the Office of the Data Protection
              Commissioner.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This site uses cookies to run Google Analytics. You can block cookies in your browser
              settings; the site will still work.
            </p>

            <h2>Changes</h2>
            <p>
              We may update this policy. The date above shows when it last changed.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
