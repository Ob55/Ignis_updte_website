import { useTitle } from '@/lib/useTitle';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';

// Four audiences from the PRD / reference, each with its own content section.
const AUDIENCES = [
  {
    id: 'institutions',
    eyebrow: 'Institutions',
    h: 'Clean energy for schools, hospitals, prisons and faith-based institutions.',
    intro:
      'No upfront cost. A fixed monthly fee from your existing fuel budget, less than you pay today. Ownership transfers to you at the end of term.',
    points: [
      { k: 'No upfront cost', p: 'We finance, install and maintain the clean energy system. Your institution pays nothing upfront.' },
      { k: 'Fixed monthly fee', p: 'A predictable service fee from your existing fuel budget, less than you pay today for inefficient fuel.' },
      { k: 'Ownership transfers', p: 'At the end of the contract, the infrastructure transfers to your institution. It is yours to keep.' },
      { k: 'Maintained and monitored', p: 'Every system is maintained and digitally monitored for the full contract term. Performance is verified continuously.' },
    ],
  },
  {
    id: 'industry',
    eyebrow: 'Industry',
    h: 'Clean energy for industry and commercial operations.',
    intro:
      'Clean energy services for industrial and commercial operations with significant thermal energy demand across Africa. This market is opening, and we are looking for early partners with significant thermal loads.',
    points: [
      { k: 'Significant thermal demand', p: 'The same energy services model applies wherever fuel spend is large: your facility already pays for fuel, and the savings service the financing.' },
      { k: 'Early access', p: 'We are extending the institutional model into industrial applications. Early partners help shape the offer as the market opens.' },
    ],
  },
  {
    id: 'financiers',
    eyebrow: 'Financiers',
    h: 'Structured, verified, portfolio-level clean energy assets.',
    intro:
      'For banks, DFIs, impact investors and carbon partners: a bankable pipeline delivered to one performance standard and verified from commissioning.',
    points: [
      { k: 'Bankable pipeline', p: 'Every institution operates under a Clean Energy Service Agreement with a fixed monthly fee, verified payment history and contractual offtake. Standardisation reduces diligence cost and enables portfolio-level underwriting.' },
      { k: 'Verified performance data', p: 'Device-level digital monitoring from commissioning. Real-time utilisation, fuel displacement, uptime and savings at portfolio level. The data you need to underwrite, not the data you hope to collect later.' },
      { k: 'Carbon that improves the return', p: 'dMRV-verified emission reductions documented from commissioning. Carbon revenue supplements project economics; the financials work without it.' },
    ],
  },
  {
    id: 'delivery-partners',
    eyebrow: 'Delivery partners',
    h: 'OEMs, EPCs, fabricators and O&M, one performance standard.',
    intro:
      'Delivering clean energy infrastructure into a growing institutional portfolio.',
    points: [
      { k: 'OEMs and equipment manufacturers', p: 'Supply equipment into a growing portfolio with standardised procurement, volume pricing and predictable demand. We coordinate specifications, testing and quality standards.' },
      { k: 'EPCs and installation contractors', p: 'Install and commission institutional energy systems to one performance standard. We provide site assessments, design specifications and commissioning protocols. You deliver the installation.' },
      { k: 'Fabricators', p: 'Manufacture components and assemblies to portfolio-level specifications. Standardised designs mean repeatable production and growing order volumes.' },
      { k: 'O&M providers', p: 'Maintain and service deployed assets over the contract term. Regional service hubs, response SLAs and performance targets.' },
    ],
  },
];

export default function WhoWeServe() {
  useTitle('Who We Serve | IGNIS');
  return (
    <>
      <PageHero
        eyebrow="Who we serve"
        segments={['Four audiences,', { text: 'one model.', className: 'serif grad-flame' }]}
        sub="Institutions, industry, financiers and delivery partners, all connected by one energy services model funded from the fuel budgets institutions already spend."
      />
      {AUDIENCES.map((a) => (
        <section key={a.id} id={a.id} className="section" style={{ scrollMarginTop: '96px' }}>
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{a.eyebrow}</span>
              <h2>{a.h}</h2>
              <p>{a.intro}</p>
            </Reveal>
            <div className="service-grid" style={{ marginTop: 44 }}>
              {a.points.map((pt, i) => (
                <Reveal key={pt.k} delay={i * 80}>
                  <div className="service-card glass">
                    <h3>{pt.k}</h3>
                    <p>{pt.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
