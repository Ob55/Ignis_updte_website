import { Link } from 'react-router-dom';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { SITE } from '@/lib/site';
import { openCookiePreferences } from '@/lib/consent';

const TABLE = [
  {
    name: 'ignis-cookie-consent',
    type: 'Essential',
    purpose: 'Remembers whether you accepted or declined analytics cookies, so we stop asking.',
    life: 'Until you clear this site’s data',
  },
  {
    name: '_ga, _ga_*',
    type: 'Analytics',
    purpose: 'Google Analytics. Counts visits and tells us which pages are useful. Only set if you accept.',
    life: 'Up to 2 years',
  },
];

export default function CookiePolicy() {
  useSeo(seoFor('/cookie-policy'));
  return (
    <>
      <PageHero
        eyebrow="Cookies"
        segments={['Cookie', { text: 'policy.', className: 'serif grad-flame' }]}
        sub="What this site stores on your device, why, and how to change your mind. Last updated September 2026."
      />
      <section className="section">
        <div className="wrap">
          {/* No scroll-reveal here: this is the page's entire body, so animating it
              would leave the page blank until the visitor happens to scroll. */}
          <div className="legal">
            <h2>The short version</h2>
            <p>
              This site sets one essential cookie to remember your cookie choice. It sets no
              analytics or advertising cookies at all unless you press <strong>Accept</strong> on the
              banner. Declining is a single click and costs you nothing &mdash; every page works
              identically either way. We do not use advertising cookies, and we do not sell your data.
            </p>

            <h2>What a cookie is</h2>
            <p>
              A cookie is a small file a website asks your browser to store. Some are needed for the
              site to work or to remember a preference. Others, like analytics, exist to tell the
              site owner how the site is being used. Under the Kenya Data Protection Act 2019 and the
              EU ePrivacy rules, the second kind needs your consent before it is set.
            </p>

            <h2>What we actually set</h2>
            <div className="cookie-table-wrap">
              <table className="cookie-table">
                <thead>
                  <tr><th>Name</th><th>Type</th><th>What it does</th><th>How long</th></tr>
                </thead>
                <tbody>
                  {TABLE.map((c) => (
                    <tr key={c.name}>
                      <td><code>{c.name}</code></td>
                      <td>{c.type}</td>
                      <td>{c.purpose}</td>
                      <td>{c.life}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Until you accept, the Google Analytics script is never added to the page, so no
              analytics cookie is created and no data leaves your browser.
            </p>

            <h2>Changing your choice</h2>
            <p>
              You can change your answer at any time. It takes effect immediately, and declining
              after having accepted also clears the analytics cookies already set.
            </p>
            <p style={{ marginTop: 20 }}>
              <button type="button" className="btn btn-flame" onClick={openCookiePreferences}>
                Change cookie preferences
              </button>
            </p>
            <p>
              You can also block or delete cookies in your browser settings. The site will still work.
            </p>

            <h2>Third parties</h2>
            <p>
              If you accept analytics, Google Analytics processes the visit on our behalf. The map on
              our contact page is embedded from Google Maps and may set cookies when it loads. We do
              not control those cookies. Nothing else on this site embeds third-party tracking.
            </p>

            <h2>Questions</h2>
            <p>
              Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Our{' '}
              <Link to="/privacy">privacy policy</Link> explains what we do with the information you
              send us, and our <Link to="/terms">terms of use</Link> cover the rest of the site.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
