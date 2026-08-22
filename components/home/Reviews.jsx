import { useEffect } from "react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { publishedReviews } from "@/content/reviews";
import { SITE } from "@/lib/site";

// Renders testimonials only when real, approved reviews exist. Emits Review +
// AggregateRating structured data. Returns null while the list is empty, so no
// placeholder or fabricated quote ever ships.
export function Reviews() {
  const has = publishedReviews.length > 0;

  useEffect(() => {
    if (!has) return;
    const avg =
      publishedReviews.reduce((s, r) => s + (r.rating || 5), 0) / publishedReviews.length;
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.legalName,
      url: SITE.url,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avg.toFixed(1),
        reviewCount: publishedReviews.length,
      },
      review: publishedReviews.map((r) => ({
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: r.rating || 5 },
        author: { "@type": "Person", name: r.name },
        reviewBody: r.quote,
      })),
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-reviews", "true");
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [has]);

  if (!has) return null;

  return (
    <section id="reviews" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">In their words</span>
          <h2>What institutions say.</h2>
        </Reveal>
        <div className="service-grid" style={{ marginTop: 44 }}>
          {publishedReviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 80}>
              <figure className="service-card glass review-card">
                <div className="review-stars" aria-label={`${r.rating || 5} out of 5`}>
                  {Array.from({ length: r.rating || 5 }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  <span>{[r.role, r.org].filter(Boolean).join(", ")}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
