// Annual cooking-fuel bills by institution type (KES).
// Firewood figures are grounded in reported Kenyan institutional spend: large
// boarding schools commonly run ~KES 300,000/month on firewood alone (~KES 3.6M/yr),
// and cooking energy can reach ~40% of the cost of a school meal. The steam figures
// assume a sealed-boiler system cutting fuel spend by roughly half versus open
// firewood (consistent with the "up to 60%" reported for Ignis sites), verified per
// site during assessment. `sourceIds` maps each row to content/sources.js:
//   1 = Daily Nation, Sh300,000 school firewood bill (2025)
//   2 = Clean Cooking Alliance, institutional business case (2026)
//   3 = Daily Nation, up-to-60%-savings coverage (Apr 2026)
//   4 = Ignis internal site-assessment estimate (no third-party figure)
export const fuelModels = [
  {
    id: "school",
    label: "School",
    annualFirewoodKes: 36e5,   // ~KES 300,000/month reported at a large boarding school
    annualSteamKes: 162e4,     // ~45% of firewood (about 55% saved)
    basis: "1,200-learner boarding school at 2026 firewood prices",
    sourceIds: [1, 2, 3]       // school firewood figure is directly reported
  },
  {
    id: "hospital",
    label: "Hospital",
    annualFirewoodKes: 42e5,   // round-the-clock ward feeding
    annualSteamKes: 189e4,     // ~45% of firewood
    basis: "district hospital with round-the-clock ward feeding",
    sourceIds: [4, 3]          // firewood is an Ignis estimate; savings per Nation
  },
  {
    id: "correctional",
    label: "Correctional",
    annualFirewoodKes: 72e5,   // high fixed-schedule volumes, several thousand meals/day
    annualSteamKes: 324e4,     // ~45% of firewood
    basis: "correctional facility running high fixed-schedule volumes",
    sourceIds: [4, 3]          // firewood is an Ignis estimate; savings per Nation
  }
];
for (const m of fuelModels) {
  if (!m.annualFirewoodKes || !m.annualSteamKes) {
    throw new Error(
      `fuel-models: "${m.id}" has a zero value. Supply real figures before building.`
    );
  }
}
