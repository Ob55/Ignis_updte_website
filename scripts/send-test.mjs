// One-off SMTP connectivity test. Sends a single message to a test address.
// Run: node --env-file=.env scripts/send-test.mjs [recipient]
import { makeTransport } from "./mailer.mjs";

const to = process.argv[2] || "brian55mwangi@gmail.com";

const transport = makeTransport();

console.log("Verifying SMTP connection to", process.env.SMTP_HOST, "…");
await transport.verify();
console.log("SMTP connection OK. Sending test email to", to, "…");

const info = await transport.sendMail({
  from: process.env.SMTP_FROM || process.env.SMTP_USER,
  to,
  subject: "Ignis SMTP test ✔",
  text: "This is a test email from the Ignis website SMTP setup. If you can read this, sending works.",
  html: "<p>This is a <strong>test email</strong> from the Ignis website SMTP setup.</p><p>If you can read this, sending works. 🔥</p>",
});

console.log("Sent. messageId:", info.messageId);
console.log("accepted:", info.accepted, "rejected:", info.rejected);
