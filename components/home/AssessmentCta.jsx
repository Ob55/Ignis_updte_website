import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Ambient } from "@/components/motion/Ambient";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

export function AssessmentCta({ heading, blurb } = {}) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name")?.trim(),
      institution: fd.get("institution")?.trim(),
      phone: fd.get("phone")?.trim(),
      email: fd.get("email")?.trim(),
    };
    setStatus("sending");
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      navigate("/thank-you");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="assessment" className="section">
      <div className="wrap">
        <Reveal className="cta glass">
          <Ambient specks={false} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2>
              {heading ?? (
                <>
                  Send us your <span className="serif grad-flame">kitchen.</span>
                </>
              )}
            </h2>
            <p>
              {blurb ??
                "Meal volumes, current fuel spend, a few photos. We come back with a system design and a savings figure for your institution, not a brochure."}
            </p>
            <form className="cta-form" onSubmit={onSubmit}>
              <input type="text" name="name" placeholder="Name" aria-label="Name" required />
              <input type="text" name="institution" placeholder="Institution" aria-label="Institution" />
              <input type="tel" name="phone" placeholder="Phone number" aria-label="Phone number" required />
              <input type="email" name="email" placeholder="Email" aria-label="Email" required />
              <button type="submit" className="btn btn-flame" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : <>Send <ArrowUpRight size={16} /></>}
              </button>
            </form>
            {status === "error" && (
              <p className="cta-error" role="alert">
                Something went wrong sending your request. Please WhatsApp or email us directly.
              </p>
            )}
            <p className="wa">
              Or WhatsApp us directly: <a href={`https://wa.me/${SITE.whatsapp}`}>{SITE.phone}</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
