// Serverless endpoint (Vercel /api). Receives the assessment form, emails the
// sales team, and sends the enquirer a confirmation. Server-only; reads SMTP
// creds from environment variables (never exposed to the client).
import { makeTransport, leadEmail, confirmationEmail } from "../scripts/mailer.mjs";

const list = (v) => (v || "").split(",").map((s) => s.trim()).filter(Boolean);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { name, institution, phone, email } = req.body || {};
    if (!name || !phone || !email) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const transport = makeTransport();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    // 1) Notify the team.
    const lead = leadEmail({ name, institution, phone, email });
    await transport.sendMail({
      from,
      to: list(process.env.LEAD_TO),
      cc: list(process.env.LEAD_CC),
      replyTo: lead.replyTo,
      subject: lead.subject,
      text: lead.text,
      html: lead.html,
    });

    // 2) Confirm to the enquirer.
    const conf = confirmationEmail({ name });
    await transport.sendMail({
      from,
      to: email,
      subject: conf.subject,
      text: conf.text,
      html: conf.html,
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("assessment send failed:", e);
    res.status(500).json({ error: "send failed" });
  }
}
