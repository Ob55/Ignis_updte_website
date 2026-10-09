import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SITE } from "@/lib/site";
import { PARTNER_ROLES } from "@/content/roles";

// The two enquiry form panels behind the site's only two actions (placed by
// pages/TalkToIgnis.jsx inside its tabbed form area):
//   Request an Assessment  (#assessment)
//   Partner with Ignis     (#partner, with a "Your role" dropdown)
// Both post to /api/assessment with a `type`. Client-side checks are a UX
// convenience only; the endpoint re-validates everything (keep the two in step).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-.\s]{5,40}$/;
const AMOUNT_RE = /^[0-9][0-9,.\s]{0,19}$/;

function useSubmit(type, validate) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = { type };
    for (const [k, v] of fd.entries()) payload[k] = typeof v === "string" ? v.trim() : v;

    const found = validate(payload);
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length) return;

    setStatus("sending");
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
      if (res.status === 429) setFormError("You have sent a few requests already. Please wait a few minutes, or WhatsApp us directly.");
      else if (res.status === 400) setFormError("Please check the details above and try again.");
      else setFormError("Something went wrong sending your request. Please WhatsApp or email us directly.");
    } catch {
      setStatus("error");
      setFormError("We could not reach the server. Check your connection, or WhatsApp us directly.");
    }
  };

  return { status, errors, formError, onSubmit };
}

function Field({ id, label, error, hint, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <span className="form-hint" id={`${id}-hint`}>{hint}</span>}
      {error && <span className="form-err" id={`${id}-err`}>{error}</span>}
    </div>
  );
}

const aria = (id, error, hint) => ({
  id,
  "aria-invalid": error ? "true" : undefined,
  "aria-describedby": [error && `${id}-err`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined,
});

// Honeypot: hidden from users, catches bots that fill every field.
const Honeypot = () => (
  <input
    type="text"
    name="company"
    tabIndex={-1}
    autoComplete="off"
    aria-hidden="true"
    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
  />
);

function contactErrors({ name, email }) {
  const e = {};
  if (!name) e.name = "Please enter your full name.";
  else if (name.length > 120) e.name = "That name is too long.";
  if (!email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > 254) e.email = "That does not look like a valid email address.";
  return e;
}

function validateAssessment(p) {
  const e = contactErrors(p);
  if (!p.phone) e.phone = "Please enter a phone number we can reach you on.";
  else if (!PHONE_RE.test(p.phone)) e.phone = "Use digits, spaces and + only — at least 5 characters.";
  const meals = Number(String(p.meals_per_day || "").replace(/[,\s]/g, ""));
  if (!p.meals_per_day) e.meals_per_day = "Please give an approximate number of meals per day.";
  else if (!Number.isInteger(meals) || meals < 1 || meals > 200000) e.meals_per_day = "Enter a whole number, for example 1200.";
  if (p.monthly_fuel_spend_kes && !AMOUNT_RE.test(p.monthly_fuel_spend_kes)) e.monthly_fuel_spend_kes = "Enter an amount in KES using digits only.";
  return e;
}

function validatePartner(p) {
  const e = contactErrors(p);
  if (!PARTNER_ROLES.some((r) => r.value === p.role)) e.role = "Please choose your role.";
  if (p.organisation && p.organisation.length > 160) e.organisation = "That organisation name is too long.";
  if (p.message && p.message.length > 2000) e.message = "Please keep your message under 2,000 characters.";
  return e;
}

export function AssessmentForm() {
  const { status, errors, formError, onSubmit } = useSubmit("assessment", validateAssessment);
  return (
    <div className="form-panel">
          <h2>Request an Assessment</h2>
          <p>
            Tell us about your kitchen, approximate meal volumes and current fuel spend, and share
            photos. We will assess the operating context and recommend the next step.
          </p>
          <form className="enquiry-form" onSubmit={onSubmit} noValidate>
            <Honeypot />
            <Field id="as-name" label="Full name" error={errors.name}>
              <input {...aria("as-name", errors.name)} name="name" type="text" autoComplete="name" required />
            </Field>
            <Field id="as-email" label="Email" error={errors.email}>
              <input {...aria("as-email", errors.email)} name="email" type="email" autoComplete="email" required />
            </Field>
            <Field id="as-phone" label="Phone number" error={errors.phone}>
              <input {...aria("as-phone", errors.phone)} name="phone" type="tel" autoComplete="tel" required />
            </Field>
            <Field id="as-institution" label="Institution (optional)">
              <input id="as-institution" name="institution" type="text" autoComplete="organization" maxLength={160} />
            </Field>
            <Field id="as-meals" label="Meals per day (approximate)" error={errors.meals_per_day}>
              <input {...aria("as-meals", errors.meals_per_day)} name="meals_per_day" type="text" inputMode="numeric" required />
            </Field>
            <Field id="as-fuel" label="Monthly fuel spend, KES (optional)" error={errors.monthly_fuel_spend_kes}>
              <input {...aria("as-fuel", errors.monthly_fuel_spend_kes)} name="monthly_fuel_spend_kes" type="text" inputMode="numeric" />
            </Field>
            <p className="form-note form-span">
              Kitchen photos: after you submit, send them on{" "}
              <a className="text-link" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
              or by email to <a className="text-link" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <button type="submit" className="btn btn-primary form-span form-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Request an Assessment"}
            </button>
          </form>
          {status === "error" && formError && <p className="form-error" role="alert">{formError}</p>}
    </div>
  );
}

export function PartnerForm() {
  const { status, errors, formError, onSubmit } = useSubmit("partner", validatePartner);
  const { search } = useLocation();
  const [role, setRole] = useState("");

  // ?role=<value> preselects "Your role" (links from audience pages).
  useEffect(() => {
    const r = new URLSearchParams(search).get("role");
    if (r && PARTNER_ROLES.some((x) => x.value === r)) setRole(r);
  }, [search]);

  return (
    <div className="form-panel">
          <h2>Partner with Ignis</h2>
          <p>Tell us who you are and what you are working on, and we will route you to the right person.</p>
          <form className="enquiry-form" onSubmit={onSubmit} noValidate>
            <Honeypot />
            <Field id="pa-name" label="Full name" error={errors.name}>
              <input {...aria("pa-name", errors.name)} name="name" type="text" autoComplete="name" required />
            </Field>
            <Field id="pa-email" label="Email" error={errors.email}>
              <input {...aria("pa-email", errors.email)} name="email" type="email" autoComplete="email" required />
            </Field>
            <Field id="pa-org" label="Organisation (optional)" error={errors.organisation}>
              <input {...aria("pa-org", errors.organisation)} name="organisation" type="text" autoComplete="organization" maxLength={160} />
            </Field>
            <Field id="pa-role" label="Your role" error={errors.role}>
              <select {...aria("pa-role", errors.role)} name="role" required value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="" disabled>Choose one</option>
                {PARTNER_ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </Field>
            <div className="form-span">
              <Field id="pa-msg" label="Message (optional)" error={errors.message}>
                <textarea {...aria("pa-msg", errors.message)} name="message" rows={5} maxLength={2000} />
              </Field>
            </div>
            <button type="submit" className="btn btn-primary form-span form-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
          </form>
          {status === "error" && formError && <p className="form-error" role="alert">{formError}</p>}
    </div>
  );
}
