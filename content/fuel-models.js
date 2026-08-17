// Annual cooking-fuel bills by institution type (KES).
// Firewood figures are grounded in reported Kenyan institutional spend: large
// boarding schools commonly run ~KES 300,000/month on firewood alone (~KES 3.6M/yr),
// and cooking energy can reach ~40% of the cost of a school meal. Sources: Nation /
// The Star, 2024-2025; Clean Cooking Alliance, "The business case for institutional
// clean cooking" (Kenya). Steam figures assume a sealed-boiler system cutting fuel
// spend by roughly half versus open firewood, verified per site during assessment.
export const fuelModels = [
  {
    id: "school",
    label: "School",
    annualFirewoodKes: 36e5,   // ~KES 300,000/month reported at a large boarding school
    annualSteamKes: 162e4,     // ~45% of firewood (about 55% saved)
    basis: "1,200-learner boarding school at 2026 firewood prices"
  },
  {
    id: "hospital",
    label: "Hospital",
    annualFirewoodKes: 42e5,   // round-the-clock ward feeding
    annualSteamKes: 189e4,     // ~45% of firewood
    basis: "district hospital with round-the-clock ward feeding"
  },
  {
    id: "correctional",
    label: "Correctional",
    annualFirewoodKes: 72e5,   // high fixed-schedule volumes, several thousand meals/day
    annualSteamKes: 324e4,     // ~45% of firewood
    basis: "correctional facility running high fixed-schedule volumes"
  }
];
for (const m of fuelModels) {
  if (!m.annualFirewoodKes || !m.annualSteamKes) {
    throw new Error(
      `fuel-models: "${m.id}" has a zero value. Supply real figures before building.`
    );
  }
}
