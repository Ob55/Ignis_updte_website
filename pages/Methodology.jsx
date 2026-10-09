import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { TodoPlaceholder } from '@/components/ui/Cards';
import { PROOF_METRICS } from '@/content/proof';

// /our-work/methodology — linked from the "Proof in numbers" strip.
// One section per metric: label + definition. `source` is internal and never
// rendered. TODO(content): methodology for each metric.
const TYPE_LABEL = { pipeline: 'Pipeline', delivery: 'Delivery', impact: 'Impact' };

export default function Methodology() {
  useSeo(seoFor('/our-work/methodology'));
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        image={HERO['analyst-laptop'].src}
        imageAlt={HERO['analyst-laptop'].alt}
        segments={['How we measure']}
        sub="We promise our clients that we measure what happens after deployment. This page explains how each figure on our site is defined and verified."
      />
      <section className="section">
        <div className="wrap prose">
          {PROOF_METRICS.map((m) => (
            <div key={m.key} id={m.key} className="method-item">
              <span className="tag">{TYPE_LABEL[m.type]}</span>
              <h2>{m.label}</h2>
              {m.definition ? <p>{m.definition}</p> : (
                // TODO(content): methodology for each metric — definition, data source, verification step.
                <TodoPlaceholder>The definition and verification method for this figure are being documented.</TodoPlaceholder>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
