import { useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
const FAQS = [
  ["What does it cost upfront?", "Nothing. You pay a monthly figure out of your existing fuel budget, it sits below what firewood was costing you, and servicing and fuel supply are inside that figure."],
  ["Who owns the equipment?", "Ignis owns, operates and maintains the system for the length of the contract. If the kitchen goes down, that is our problem to fix."],
  ["What happens if it breaks during term?", "Monitored uptime and a servicing contract mean we respond fast. Steam holds temperature between services, so a single fault rarely stops meals."],
  ["Can we keep our existing cooks?", "Yes. We train your cooks on handover, same menus, faster, in clean air instead of smoke."],
  ["How long is the contract?", "Structured around the payback from fuel savings. We size it during the assessment and share the terms up front."],
  ["Do you work outside Kenya?", "Our current sites are in Kenya; the model is built to extend across the continent as the pipeline grows."]
];
export function Faq() {
  // FAQPage structured data for rich results.
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-faq", "true");
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, []);

  return <section className="section"><div className="wrap"><Reveal className="section-head"><span className="eyebrow">Questions</span><h2>The things bursars ask first.</h2></Reveal><div className="faq" style={{ marginTop: 40 }}>{FAQS.map(([q, a], i) => <Reveal key={q} delay={i * 50}><details className="faq-row glass"><summary>{q}</summary><p>{a}</p></details></Reveal>)}</div></div></section>;
}
