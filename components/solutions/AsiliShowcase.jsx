import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RequestAssessmentButton, PartnerButton } from "@/components/ui/Button";
import { ASILI } from "@/content/products";

// Electric Cooking page: the Asili product. An intro band, a feature
// walkthrough, then what each panel control does. On desktop the product photo is pinned (position: sticky) while
// the feature steps scroll past, and the photo swaps to match the step in the
// middle of the viewport. On phones there is no pinning: each step carries its
// own photo inline. Every step is in the prerendered HTML; motion only changes
// which one is emphasised.
export function AsiliShowcase() {
  return (
    <>
      <AsiliIntro />
      <AsiliFeatures />
      <AsiliControls />
    </>
  );
}

function AsiliIntro() {
  const specs = ASILI.specs.filter((s) => s.value);
  return (
    <section id="asili" className="section">
      <div className="wrap asili-intro">
        <Reveal className="section-head">
          <h2>Meet Asili, our electric pressure cooker.</h2>
          <p>{ASILI.tagline}</p>
          <ul className="asili-chips" aria-label="One-touch programmes">
            {ASILI.programmes.map((p) => <li key={p}>{p}</li>)}
          </ul>
          {/* Specs come from the rating label; ones without a value (price) stay hidden. */}
          {specs.length > 0 && (
            <dl className="asili-specs">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
        <Reveal delay={120}>
          <figure className="asili-frame">
            <img src={ASILI.image.src} alt={ASILI.image.alt} width="1400" height="1349" decoding="async" />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function AsiliFeatures() {
  const { features } = ASILI;
  const [active, setActive] = useState(0);
  const steps = useRef([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    // A thin band across the middle of the viewport: whichever step crosses it is active.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i));
        }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section id="asili-features" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Built for the way Kenyan kitchens cook.</h2>
          <p>
            A 6-litre pot, a 1000 W heating plate and a sealed lid. Asili cooks the everyday staples,
            githeri, uji, beans, rice and stews, under pressure, with the heat kept inside the pot.
          </p>
        </Reveal>
        <div className="sticky-split sticky-split--media">
          <div className="sticky-col asili-stage-col" aria-hidden="true">
            <div className="asili-stage asili-frame">
              {features.map((f, i) => (
                <img
                  key={f.title}
                  src={f.image.src}
                  alt=""
                  width="1400"
                  height="1400"
                  loading="lazy"
                  decoding="async"
                  className={i === active ? "is-active" : undefined}
                />
              ))}
            </div>
            <div className="asili-rail">
              <span className="asili-count">{pad(active + 1)} / {pad(features.length)}</span>
              <span className="asili-bar"><span style={{ transform: `scaleX(${(active + 1) / features.length})` }} /></span>
            </div>
          </div>
          <ol className="asili-steps">
            {features.map((f, i) => (
              <li
                key={f.title}
                ref={(el) => (steps.current[i] = el)}
                data-i={i}
                className={`asili-step${i === active ? " is-active" : ""}`}
              >
                <Reveal>
                  <span className="asili-step-n" aria-hidden="true">{pad(i + 1)}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <img className="asili-step-img asili-frame" src={f.image.sm} alt={f.image.alt} width="640" height="640" loading="lazy" decoding="async" />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function AsiliControls() {
  return (
    <section id="asili-controls" className="section section--tight">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>What every button does.</h2>
        </Reveal>
        <dl className="card-grid card-grid--5 asili-controls">
          {ASILI.controls.map((c) => (
            <div key={c.label} className="asili-control">
              <dt>{c.label}</dt>
              <dd>{c.text}</dd>
            </div>
          ))}
        </dl>
        <div className="btn-row">
          <RequestAssessmentButton />
          <PartnerButton />
        </div>
      </div>
    </section>
  );
}
