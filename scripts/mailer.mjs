// Shared SMTP transport + assessment email builders. Server-only.
// Reads credentials from process.env (see .env). STARTTLS on 587.
import nodemailer from "nodemailer";

export function makeTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP env vars missing (SMTP_HOST / SMTP_USER / SMTP_PASS)");
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: false, // STARTTLS
    requireTLS: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Internal notification to the sales team.
export function leadEmail({ name, institution, phone, email }) {
  const rows = [
    ["Name", name],
    ["Institution", institution],
    ["Phone", phone],
    ["Email", email],
  ].filter(([, v]) => v);
  return {
    subject: `New assessment request: ${name || institution || email || "enquiry"}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html:
      `<h2 style="font-family:system-ui">New assessment request</h2>` +
      `<table style="font-family:system-ui;border-collapse:collapse">` +
      rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 14px 6px 0;color:#666">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`
        )
        .join("") +
      `</table>`,
    replyTo: email || undefined,
  };
}

// Auto-reply confirmation to the person who enquired.
export function confirmationEmail({ name }) {
  const hi = name ? `Hi ${name},` : "Hi,";
  return {
    subject: "We received your request — Ignis Innovation",
    text:
      `${hi}\n\nThank you for reaching out to Ignis Innovation. We have received your request and will get back to you shortly.\n\nWarm regards,\nIgnis Innovation\ninfo@ignis-innovation.com`,
    html:
      `<div style="font-family:system-ui;max-width:520px;line-height:1.6">` +
      `<p>${esc(hi)}</p>` +
      `<p>Thank you for reaching out to <strong>Ignis Innovation</strong>. We have received your request and will get back to you shortly.</p>` +
      `<p style="margin-top:24px">Warm regards,<br/>Ignis Innovation<br/><a href="mailto:info@ignis-innovation.com">info@ignis-innovation.com</a></p>` +
      `</div>`,
  };
}
