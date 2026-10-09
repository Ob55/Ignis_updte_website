import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Box } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { Button, RequestAssessmentButton, PartnerButton } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { TodoPlaceholder } from '@/components/ui/Cards';
import { SteamDiagram } from '@/components/home/WhySteam';
import { KitchenModal } from '@/components/solutions/KitchenModal';
import { EfficiencyChart } from '@/components/solutions/EfficiencyChart';
import { SHOW_AROUND_HALF_LINE } from '@/content/flags';
import { OFFERS } from '@/content/offers';
import { SERVICES } from '@/content/services';

// Content Spec §5.3: the full "Why steam costs less" explanation.
const WHY_STEAM = [
  { h: 'Enclosed, insulated steam generator.', p: 'Combustion happens in a closed firebox, so far less heat escapes than from an open fire.' },
  { h: 'One heat source for the whole kitchen.', p: 'A single generator replaces many open fires; there is no longer a separate fire idling under each pot.' },
  { h: 'Indirect heating in jacketed kettles.', p: 'Steam heats the pot walls evenly and hands over its heat as it condenses, so food cooks without scorching and heat goes into the food, not the room.' },
  // TODO(confirm): fuels used in Ignis designs.
  { h: 'Fuel choice and control.', p: 'The generator can run on processed fuels such as briquettes or pellets, and the firing rate can be controlled to match meal times.' },
  { h: 'Operation and monitoring.', p: 'Metered, monitored systems (via CleanCookIQ) catch waste early, and cooks spend less time tending fires.' },
];

// Suggested closing line for the section. Rendered only when SHOW_AROUND_HALF_LINE
// is switched on. TODO(confirm): the "around half" claim against Ignis's site data (D2).
const AROUND_HALF_LINE =
  'An open fire sends most of its heat into the air. Our steam systems burn fuel in an enclosed, insulated generator and pipe the heat straight into sealed cooking kettles. More of every shilling you spend on fuel ends up cooking food, which is why a typical boarding school could cut its cooking costs by around half.';

// Expandable technical sections: customer outcome first, engineering detail
// second. TODO(content): outcome and engineering copy for each section.
const TECHNICAL = [
  { id: 'generator', h: 'Steam generator' },
  { id: 'steam-distribution', h: 'Steam distribution' },
  { id: 'jacketed-vessels', h: 'Jacketed vessels' },
  { id: 'controls', h: 'Controls' },
  { id: 'monitoring', h: 'Monitoring' },
  { id: 'installation-maintenance', h: 'Installation and maintenance' },
];

export default function WhatWeDo() {
  useSeo(seoFor('/what-we-do'));
  const [open3d, setOpen3d] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        segments={['Solutions built for real', { text: 'operating conditions.', className: 'serif grad-flame' }]}
        sub="We don't just install equipment. We manage the transition."
        image="/img/solutions-cookers.jpg"
        imageAlt="Installed institutional cookers in a Kenyan school kitchen"
      />

      <section id="services" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>How we support the transition.</h2>
          </Reveal>
          <div className="card-grid card-grid--4" style={{ marginTop: 40 }}>
            {SERVICES.map((s) => (
              <Link key={s.slug} to={s.to} className="link-card">
                <h3>{s.name}</h3>
                <span className="card-link">Explore <ArrowUpRight size={15} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Our solutions.</h2>
          </Reveal>
          <div className="card-grid card-grid--3" style={{ marginTop: 40 }}>
            {OFFERS.map((o) => (
              <article key={o.slug} id={o.slug} className="offer-card">
                <h3>{o.name}</h3>
                <p>{o.body}</p>
                <Link className="card-link" to={`/what-we-do/${o.slug}`}>
                  Explore {o.name} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-steam" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Why steam costs less.</h2>
            {/* Third-party figures (see EfficiencyChart sources), not Ignis measurements. */}
            <p>
              An open fire wastes most of its wood. In field tests, open fires delivered on average
              only about 11% of the wood&apos;s energy to the pot. Even a carefully tended fire
              reaches only 20 to 30%. The rest escapes as heat and smoke. An enclosed, insulated
              system puts far more of each kilogram to work.
            </p>
          </Reveal>
          <div className="split" style={{ marginTop: 32 }}>
            <ol className="numbered-list">
              {WHY_STEAM.map((w, i) => (
                <li key={w.h}>
                  <span className="callout-n" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3>{w.h}</h3>
                    <p>{w.p}</p>
                  </div>
                </li>
              ))}
            </ol>
            <SteamDiagram />
          </div>
          <EfficiencyChart />
          {SHOW_AROUND_HALF_LINE && <p className="section-kicker"><em>{AROUND_HALF_LINE}</em></p>}
        </div>
      </section>

      <section id="technical" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Institutional Steam: the technical detail.</h2>
          </Reveal>
          <div className="accordion-list" style={{ marginTop: 32 }}>
            {TECHNICAL.map((t) => (
              <Accordion key={t.id} id={t.id} title={t.h}>
                {/* TODO(content): customer outcome for this component (shown first). */}
                <h4 className="accordion-sub">What it means for your kitchen</h4>
                <TodoPlaceholder />
                {/* TODO(content): engineering detail for this component. */}
                <h4 className="accordion-sub">Engineering detail</h4>
                <TodoPlaceholder />
              </Accordion>
            ))}
          </div>
          <div className="kitchen-cta glass" style={{ marginTop: 32 }}>
            <div>
              <h3>See how we design an institutional kitchen.</h3>
              <p>Explore an Ignis central-kitchen layout in interactive 3D.</p>
            </div>
            <Button variant="secondary" onClick={() => setOpen3d(true)}>
              <Box size={18} strokeWidth={1.8} aria-hidden="true" /> See the 3D kitchen design
            </Button>
          </div>
        </div>
        <KitchenModal open={open3d} onClose={() => setOpen3d(false)} />
      </section>

      <section className="section">
        <div className="wrap">
          <div className="closing-cta">
            <h2>Ready to explore a transition?</h2>
            <p>Start with the conversation that fits your role.</p>
            <div className="btn-row btn-row--center">
              <RequestAssessmentButton />
              <PartnerButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
