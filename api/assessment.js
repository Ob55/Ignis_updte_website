// Serverless endpoint (Vercel /api). Receives the assessment form, emails the
// sales team, and sends the enquirer a confirmation. Server-only; reads SMTP
// creds from environment variables (never exposed to the client).
import { makeTransport, leadEmail, confirmationEmail } from "../scripts/mailer.mjs";
import { isRateLimited } from "../scripts/rateLimit.mjs";

const list = (v) => (v || "").split(",").map((s) => s.trim()).filter(Boolean);

// ---- Input validation -------------------------------------------------------
const LIMITS = { name: 120, phone: 40, email: 254 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-.\s]{5,40}$/;

function validate(body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name || name.length > LIMITS.name) return { error: "Invalid name" };
  if (!PHONE_RE.test(phone)) return { error: "Invalid phone" };
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) return { error: "Invalid email" };
  return { data: { name, phone, email } };
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
    const { name, phone, email } = data;

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
    const lead = leadEmail({ name, phone, email });
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
      const conf = confirmationEmail({ name });
      await transport.sendMail({
        from,
        to: email,
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
