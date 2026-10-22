import { useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { FAQS } from "@/content/faqs";
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
