// Serverless endpoint (Vercel /api). Receives the assessment form, emails the
// sales team, and sends the enquirer a confirmation. Server-only; reads SMTP
// creds from environment variables (never exposed to the client).
import { makeTransport, leadEmail, confirmationEmail } from "../scripts/mailer.mjs";
import { isRateLimited } from "../scripts/rateLimit.mjs";

const list = (v) => (v || "").split(",").map((s) => s.trim()).filter(Boolean);

// ---- Input validation -------------------------------------------------------
// Two enquiry types share this endpoint: "assessment" (Request an Assessment)
// and "partner" (Partner with Ignis). Mirrors components/contact/EnquiryForms.jsx.
const LIMITS = { name: 120, phone: 40, email: 254, org: 160, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-.\s]{5,40}$/;
const AMOUNT_RE = /^[0-9][0-9,.\s]{0,19}$/;
// Keep in step with content/roles.js.
const ROLES = {
  "government-county": "Government / County",
  financier: "Financier",
  "technology-provider": "Technology Provider",
  "development-partner": "Development Partner",
};

const str = (v) => (typeof v === "string" ? v.trim() : "");

function validate(body) {
  const type = body.type === "partner" ? "partner" : "assessment";
  const name = str(body.name);
  const email = str(body.email);

  if (!name || name.length > LIMITS.name) return { error: "Invalid name" };
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) return { error: "Invalid email" };

  if (type === "partner") {
    const role = str(body.role);
    const organisation = str(body.organisation);
    const message = str(body.message);
    if (!ROLES[role]) return { error: "Invalid role" };
    if (organisation.length > LIMITS.org) return { error: "Invalid organisation" };
    if (message.length > LIMITS.message) return { error: "Invalid message" };
    return { data: { type, name, email, role: ROLES[role], organisation, message } };
  }

  const phone = str(body.phone);
  const institution = str(body.institution);
  const mealsRaw = str(body.meals_per_day).replace(/[,\s]/g, "");
  const meals = Number(mealsRaw);
  const fuel = str(body.monthly_fuel_spend_kes);
  if (!PHONE_RE.test(phone)) return { error: "Invalid phone" };
  if (institution.length > LIMITS.org) return { error: "Invalid institution" };
  if (!Number.isInteger(meals) || meals < 1 || meals > 200000) return { error: "Invalid meals per day" };
  if (fuel && !AMOUNT_RE.test(fuel)) return { error: "Invalid fuel spend" };
  return { data: { type, name, email, phone, institution, mealsPerDay: meals, monthlyFuelSpendKes: fuel } };
}

// ---- CSRF / origin allow-list ----------------------------------------------
// Only reject requests whose Origin is present AND not on the allow-list;
// server-to-server callers (no Origin) still pass, but must clear the other gates.
function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const allowed = list(process.env.ALLOWED_ORIGINS).concat([
    "https://ignis-innovation.com",
    "https://www.ignis-innovation.com",
    "http://localhost:3000",
    "http://localhost:5173",
  ]);
  if (allowed.includes(origin)) return true;
  // allow Vercel preview deployments for this project
  try { if (new URL(origin).hostname.endsWith(".vercel.app")) return true; } catch { /* noop */ }
  return false;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!originAllowed(req)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (await isRateLimited(ip)) {
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }

  try {
    const body = req.body || {};

    // Honeypot: real users never fill the hidden `company` field. Pretend
    // success so bots get no signal, but send nothing.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      res.status(200).json({ ok: true });
      return;
    }

    const { error, data } = validate(body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const transport = makeTransport();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    // Where leads go. If LEAD_TO is unset the whole endpoint used to die with
    // "No recipients defined" (a 500 for the visitor, and a lost enquiry), so
    // fall back to the mailbox we are already authenticated as.
    const leadTo = list(process.env.LEAD_TO);
    if (!leadTo.length && process.env.SMTP_USER) {
      leadTo.push(process.env.SMTP_USER);
      console.warn("LEAD_TO is not set; routing this lead to SMTP_USER instead.");
    }
    if (!leadTo.length) {
      console.error("No lead recipient configured (set LEAD_TO or SMTP_USER).");
      res.status(500).json({ error: "send failed" });
      return;
    }

    // 1) Notify the team.
    const lead = leadEmail(data);
    await transport.sendMail({
      from,
      to: leadTo,
      cc: list(process.env.LEAD_CC),
      replyTo: lead.replyTo,
      subject: lead.subject,
      text: lead.text,
      html: lead.html,
    });

    // 2) Confirm to the enquirer. The lead is already delivered at this point,
    // so a failure here must not turn a received enquiry into a 500 for the user.
    try {
      const conf = confirmationEmail({ name: data.name });
      await transport.sendMail({
        from,
        to: data.email,
        subject: conf.subject,
        text: conf.text,
        html: conf.html,
      });
    } catch (e) {
      console.error("confirmation send failed (lead was delivered):", e?.message || e);
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("assessment send failed:", e?.message || e);
    res.status(500).json({ error: "send failed" });
  }
}
