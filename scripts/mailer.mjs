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

// Internal notification to the sales team. `type` is "assessment" or "partner".
export function leadEmail({ type = "assessment", name, phone, email, institution, mealsPerDay, monthlyFuelSpendKes, role, organisation, message }) {
  const isPartner = type === "partner";
  const rows = (isPartner
    ? [
        ["Name", name],
        ["Email", email],
        ["Role", role],
        ["Organisation", organisation],
        ["Message", message],
      ]
    : [
        ["Name", name],
        ["Phone", phone],
        ["Email", email],
        ["Institution", institution],
        ["Meals per day", mealsPerDay],
        ["Monthly fuel spend (KES)", monthlyFuelSpendKes],
      ]
  ).filter(([, v]) => v !== undefined && v !== null && v !== "");
  const title = isPartner ? "New partner enquiry" : "New assessment request";
  return {
    subject: `${title}: ${name || email || "enquiry"}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html:
      `<h2 style="font-family:system-ui">${title}</h2>` +
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
    subject: "We received your request — Ignis",
    text:
      `${hi}\n\nThank you for reaching out to Ignis. We have received your request and will get back to you shortly.\n\nWarm regards,\nIgnis\ninfo@ignis-innovation.com`,
    html:
      `<div style="font-family:system-ui;max-width:520px;line-height:1.6">` +
      `<p>${esc(hi)}</p>` +
      `<p>Thank you for reaching out to <strong>Ignis</strong>. We have received your request and will get back to you shortly.</p>` +
      `<p style="margin-top:24px">Warm regards,<br/>Ignis<br/><a href="mailto:info@ignis-innovation.com">info@ignis-innovation.com</a></p>` +
      `</div>`,
  };
}
