import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { SITE } from '@/lib/site';
import { sources } from '@/content/sources';

// Photography. Everything on the site is self-hosted; nothing is hotlinked.
const PHOTOS = [
  { file: 'about.jpg', use: 'About page hero', credit: '"Chefs at Work" (Unsplash, donated to Wikimedia Commons under CC0). Mirrored and cropped for the hero scrim.' },
  { file: 'kitchen.jpg', use: 'Who we serve hero', credit: 'Ignis Innovation Africa — own photograph.' },
  { file: 'industry.jpg', use: 'Industry page', credit: 'Pexels #33813584 — free for commercial use, no attribution required.' },
  { file: 'delivery.jpg', use: 'Delivery partners page', credit: 'Pexels #15056622 — free for commercial use, no attribution required.' },
  { file: 'financiers.jpg', use: 'Financiers page', credit: 'Pexels #7698707 — free for commercial use, no attribution required.' },
  { file: 'solutions.jpg', use: 'Services hero', credit: 'Pexels #24989144 — free for commercial use, no attribution required.' },
  { file: 'cleancookiq.jpg', use: 'Platform hero', credit: 'Pexels #577210 — free for commercial use, no attribution required.' },
  { file: 'blog.jpg', use: 'Field notes hero', credit: 'Pexels #36535277 — free for commercial use, no attribution required.' },
];

const TYPEFACES = [
  { name: 'Archivo', use: 'Headings', licence: 'SIL Open Font License 1.1' },
  { name: 'Atkinson Hyperlegible', use: 'Body text', licence: 'SIL Open Font License 1.1, Braille Institute of America' },
  { name: 'IBM Plex Mono', use: 'Labels and figures', licence: 'SIL Open Font License 1.1' },
];

export default function Credits() {
  useSeo(seoFor('/credits'));
  return (
    <>
      <PageHero
        eyebrow="Credits"
        segments={['Sources and', { text: 'credits.', className: 'serif grad-flame' }]}
        sub="Where our figures come from, and who made the images and typefaces we use."
      />
      <section className="section">
        <div className="wrap">
          <div className="legal">
            <h2>Data and figures</h2>
            <p>
              Every number on this site is either citable or labelled as our own estimate. These are
              the sources behind the fuel costs, savings ranges and market figures we quote.
            </p>
            <ol className="credits-list">
              {sources.map((s) => (
                <li key={s.id}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  ) : (
                    s.label
                  )}
                </li>
              ))}
            </ol>

            <h2>Photography</h2>
            <p>
              All images are downloaded and self-hosted rather than hotlinked. Stock photographs are
              used under licences that permit commercial use.
            </p>
            <div className="cookie-table-wrap">
              <table className="cookie-table">
                <thead>
                  <tr><th>File</th><th>Where</th><th>Credit and licence</th></tr>
                </thead>
                <tbody>
                  {PHOTOS.map((p) => (
                    <tr key={p.file}>
                      <td><code>{p.file}</code></td>
                      <td>{p.use}</td>
                      <td>{p.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Typefaces</h2>
            <div className="cookie-table-wrap">
              <table className="cookie-table">
                <thead>
                  <tr><th>Typeface</th><th>Used for</th><th>Licence</th></tr>
                </thead>
                <tbody>
                  {TYPEFACES.map((t) => (
                    <tr key={t.name}>
                      <td>{t.name}</td>
                      <td>{t.use}</td>
                      <td>{t.licence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Build</h2>
            <p>
              This site is built with React and Vite, prerendered to static HTML at build time, and
              hosted on Vercel. Icons are from Lucide, under the ISC licence.
            </p>

            <h2>Corrections</h2>
            <p>
              If a figure looks wrong or a credit is missing, tell us at{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will fix it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
