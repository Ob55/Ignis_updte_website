// CSRF / origin allow-list shared by the serverless routes (api/assessment.js,
// api/chat.js). Only reject requests whose Origin is present AND not on the
// allow-list; server-to-server callers (no Origin) still pass, but must clear
// the other gates.
const list = (v) => (v || "").split(",").map((s) => s.trim()).filter(Boolean);

export function originAllowed(req) {
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

export function clientIp(req) {
  return (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
}
