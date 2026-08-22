// Sends the REAL lead + confirmation emails, but only to a test address, so we
// can eyeball exactly what the team and the enquirer will receive.
// Run: node --env-file=.env scripts/preview-emails.mjs [testRecipient]
import { makeTransport, leadEmail, confirmationEmail } from "./mailer.mjs";

const to = process.argv[2] || "brian55mwangi@gmail.com";
const sample = { name: "Jane Bursar", institution: "Test Secondary School", phone: "+254 724 326256", email: to };

const t = makeTransport();
await t.verify();
const from = process.env.SMTP_FROM || process.env.SMTP_USER;

const lead = leadEmail(sample);
const i1 = await t.sendMail({ from, to, subject: `[TEAM PREVIEW] ${lead.subject}`, text: lead.text, html: lead.html, replyTo: lead.replyTo });
console.log("lead preview sent:", i1.accepted);

const conf = confirmationEmail(sample);
const i2 = await t.sendMail({ from, to, subject: `[USER PREVIEW] ${conf.subject}`, text: conf.text, html: conf.html });
console.log("confirmation preview sent:", i2.accepted);
