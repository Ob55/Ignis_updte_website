// "Your role" options on the Partner with Ignis enquiry form. `value` is what the
// API accepts (allow-listed in api/assessment.js); `audience` links each role to
// its Who We Work With page so audience pages can preselect it.
export const PARTNER_ROLES = [
  { value: "government-county", label: "Government / County", audience: "governments-counties" },
  { value: "financier", label: "Financier", audience: "financiers" },
  { value: "technology-provider", label: "Technology Provider", audience: "technology-providers" },
  { value: "development-partner", label: "Development Partner", audience: "development-partners" },
];

export const roleForAudience = (audienceId) =>
  PARTNER_ROLES.find((r) => r.audience === audienceId)?.value;
