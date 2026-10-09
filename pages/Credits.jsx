import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { SITE } from '@/lib/site';
import { sources } from '@/content/sources';

// Photography. Everything on the site is self-hosted; nothing is hotlinked.
const PHOTOS = [
  { file: 'about-nairobi.jpg', use: 'About hero', credit: '"Buffalo and Nairobi skyline, Nairobi National Park" by Timothy A. Gonsalves (Wikimedia Commons), CC BY-SA 4.0. Resized.' },
  { file: 'institutions.jpg', use: 'Homepage hero (interim)', credit: '"Situation in school kitchen" by SuSanA Secretariat (Flickr 5324344316), CC BY 2.0. Mirrored and resized.' },
  { file: 'solutions-cookers.jpg', use: 'What We Do hero', credit: '"Finished kitchen biogas setup", Gachoire Girls High School, Kenya, by SuSanA Secretariat (Flickr 5363273405), CC BY 2.0. Cropped, mirrored and resized.' },
  { file: 'hero/financing.jpg', use: 'Financing hero', credit: "\"Aerial view of the Nairobi skyline from the KICC rooftop at golden hour\" by Lebu Ayiga (Wikimedia Commons), CC BY-SA 4.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Nairobi_skyline_from_the_KICC_rooftop_at_golden_hour.jpg' },
  { file: 'hero/financiers.jpg', use: 'Financiers hero', credit: "\"Nairobi City County Skyline\" by Antony Trivet (Wikimedia Commons), CC BY-SA 4.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Nairobi_City_County_Skyline.jpg' },
  { file: 'hero/governments-counties.jpg', use: 'Governments & Counties hero', credit: "\"Nairobi City County Assembly building, 2025 (01)\" by Bahnfrend (Wikimedia Commons), CC BY-SA 4.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Nairobi_City_County_Assembly_building,_2025_(01).jpg' },
  { file: 'hero/institutions-dining.jpg', use: 'Institutions hero', credit: "\"Students at Shimo la Tewa Secondary School\" by Stephen wanjau (Wikimedia Commons), CC BY-SA 3.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Students_at_Shimo_la_Tewa_Secondary_School.jpg' },
  { file: 'hero/school-meal.jpg', use: 'Who We Work With hero', credit: "\"Nyota, Kenya 02\" by Nicor (Wikimedia Commons), CC BY-SA 3.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Nyota,_Kenya_02.jpg' },
  { file: 'hero/kisumu.jpg', use: 'Where We Work and 404 heroes', credit: "\"Kisumu City view\" by Victor Ochieng (Wikimedia Commons), CC BY-SA 2.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Kisumu_City_view.jpg' },
  { file: 'hero/open-fire-cooking.jpg', use: 'Our Work hero', credit: "\"Women cooking using the open fire stove\" by WambuiMwangi (Wikimedia Commons), CC BY-SA 3.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Women_cooking_using_the_open_fire_stove.jpg' },
  { file: 'hero/firewood.jpg', use: 'Field Notes heroes', credit: "\"Women Carry Firewood\" by Wachira Thirikwa (Wikimedia Commons), CC BY-SA 4.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Women_Carry_Firewood.jpg' },
  { file: 'hero/likoni-cook.jpg', use: 'Projects hero', credit: "\"Miss Chef of Likoni\" by Alena Machalkova (Wikimedia Commons), CC BY-SA 4.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Miss_Chef_of_Likoni.jpg' },
  { file: 'hero/nairobi-uhuru-park.jpg', use: 'Thank You and legal-page heroes', credit: "\"Skyline of Nairobi city as seen from Uhuru Park\" by DesiBoy101 (Wikimedia Commons), CC BY 4.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Skyline_of_Nairobi_city_as_seen_from_Uhuru_Park.jpg' },
  { file: 'hero/doho-school.jpg', use: 'Case Studies and Clean-Cooking Programmes heroes', credit: "\"Doho primary school kenya\" by Marcelinus agola (Wikimedia Commons), CC0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Doho_primary_school_kenya.jpg' },
  { file: 'hero/field-data-kenya.jpg', use: 'Monitoring, Data & Verification hero', credit: "\"Using Data to Track Health in Kenya (36813866360)\" by CDC Global (Wikimedia Commons), CC BY 2.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Using_Data_to_Track_Health_in_Kenya_(36813866360).jpg' },
  { file: 'hero/analyst-laptop.jpg', use: 'How We Measure (methodology) hero', credit: "\"Software Developer at work 01\" by Daudi mukiibi (Wikimedia Commons), CC BY-SA 4.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Software_Developer_at_work_01.jpg' },
  { file: 'hero/steam-kettle.jpg', use: 'Institutional Steam hero', credit: "\"Cooking red beans in the steam-jacketed kombi kettle\" by Erikoinentunnus (Wikimedia Commons), CC BY-SA 3.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Cooking_red_beans_in_the_steam-jacketed_kombi_kettle.jpg' },
  { file: 'hero/electric-cooktop.jpg', use: 'Electric Cooking hero', credit: "\"Induction Cooktop Rolling Boil\" by Wtshymanski (talk). (Wikimedia Commons), CC BY-SA 3.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Induction_Cooktop_Rolling_Boil.jpg' },
  { file: 'hero/partners-workshop.jpg', use: 'Development Partners hero', credit: "\"Participants interacting on \u201cDo we need an ESF-Kenya?\u201d (5050832181)\" by SuSanA Secretariat (Wikimedia Commons), CC BY 2.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Participants_interacting_on_%E2%80%9CDo_we_need_an_ESF-Kenya%3F%E2%80%9D_(5050832181).jpg' },
  { file: 'hero/institutional-stoves.jpg', use: 'Institutional Energy Transition hero', credit: "\"Biogas piping in kitchen during construction (5363272145)\" by SuSanA Secretariat (Wikimedia Commons), CC BY 2.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Biogas_piping_in_kitchen_during_construction_(5363272145).jpg' },
  { file: 'hero/cleancookiq-kitchen.jpg', use: 'CleanCookIQ hero', credit: 'CleanCookIQ (an Ignis platform), from cleancookiq.com. Resized.', href: 'https://cleancookiq.com/' },
  { file: 'cleancookiq/map.jpg, intelligence.jpg, counties.jpg', use: 'CleanCookIQ page, The platform', credit: 'Screenshots of the CleanCookIQ platform (cleancookiq.com), captured October 2026.', href: 'https://cleancookiq.com/' },
  { file: 'hero/clean-cooking-tech.jpg', use: 'Technology Providers hero', credit: "\"Biogas cooker at Gachoire Girls High School (3503743373)\" by SuSanA Secretariat (Wikimedia Commons), CC BY 2.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Biogas_cooker_at_Gachoire_Girls_High_School_(3503743373).jpg' },
  { file: 'hero/talk-contact.jpg', use: 'Talk to Ignis hero', credit: "\"Nairobi night skyline at dusk\" by Nbi101 (Wikimedia Commons), CC BY-SA 4.0. Resized.", href: 'https://commons.wikimedia.org/wiki/File:Nairobi_night_skyline_at_dusk_.jpg' },
  { file: 'hero/programme-map.jpg', use: 'Programme Development & Implementation hero', credit: 'Screenshot of the CleanCookIQ National Institution Map (cleancookiq.com), captured October 2026. Map data © OpenStreetMap contributors, ODbL.', href: 'https://www.openstreetmap.org/copyright' },
];

const TYPEFACES = [
  { name: 'IBM Plex Mono', use: 'Labels and figures', licence: 'SIL Open Font License 1.1' },
];

export default function Credits() {
  useSeo(seoFor('/credits'));
  return (
    <>
      <PageHero
        eyebrow="Credits"
        image={HERO['nairobi-uhuru-park'].src}
        imageAlt={HERO['nairobi-uhuru-park'].alt}
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
                      <td>
                        {p.credit}
                        {p.href && <> <a href={p.href} target="_blank" rel="noopener noreferrer">Source</a></>}
                      </td>
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
