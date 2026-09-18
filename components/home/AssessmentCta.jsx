import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Ambient } from "@/components/motion/Ambient";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

const FIELDS = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name", placeholder: "Jane Wanjiru" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "jane@institution.ac.ke" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", placeholder: "+254 7XX XXX XXX" },
];

// Mirrors the server-side rules in api/assessment.js. Client-side checks are a
// UX convenience only — the endpoint re-validates everything independently.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-.\s]{5,40}$/;

function validate({ name, email, phone }) {
  const errors = {};
  if (!name) errors.name = "Please enter your full name.";
  else if (name.length > 120) errors.name = "That name is too long.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > 254) errors.email = "That does not look like a valid email address.";
  if (!phone) errors.phone = "Please enter a phone number we can reach you on.";
  else if (!PHONE_RE.test(phone)) errors.phone = "Use digits, spaces and + only — at least 5 characters.";
  return errors;
}

export function AssessmentCta({ heading, blurb } = {}) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get("name") || "").trim(),
      email: (fd.get("email") || "").trim(),
      phone: (fd.get("phone") || "").trim(),
      company: fd.get("company") || "", // honeypot — humans leave this empty
    };

    const found = validate(payload);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      setFormError("");
      return;
    }

    setStatus("sending");
    setFormError("");
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        navigate("/thank-you");
        return;
      }
      setStatus("error");
      if (res.status === 429) {
        setFormError("You have sent a few requests already. Please wait a few minutes, or WhatsApp us directly.");
      } else if (res.status === 400) {
        setFormError("Please check the details above and try again.");
      } else {
        setFormError("Something went wrong sending your request. Please WhatsApp or email us directly.");
      }
    } catch {
      setStatus("error");
      setFormError("We could not reach the server. Check your connection, or WhatsApp us directly.");
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
            <form className="cta-form" onSubmit={onSubmit} noValidate>
              {/* honeypot: hidden from users, catches bots that fill every field */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              {FIELDS.map((f) => (
                <div className="cta-field" key={f.name}>
                  <label htmlFor={`assess-${f.name}`}>{f.label}</label>
                  <input
                    id={`assess-${f.name}`}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    required
                    aria-invalid={errors[f.name] ? "true" : undefined}
                    aria-describedby={errors[f.name] ? `assess-${f.name}-err` : undefined}
                  />
                  {errors[f.name] && (
                    <span className="cta-field-err" id={`assess-${f.name}-err`}>
                      {errors[f.name]}
                    </span>
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-flame cta-submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : <>Request assessment <ArrowUpRight size={16} /></>}
              </button>
            </form>
            {status === "error" && formError && (
              <p className="cta-error" role="alert">{formError}</p>
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
