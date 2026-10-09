// Content-gate switches. Each block below stays hidden until its gate clears.

// Block 9 "Proof in numbers" (homepage).
// Switch on ONLY once at least 3 verified figures, with definitions and an
// "as of" date, exist in content/proof.js. The component also refuses to render
// any null, zero or non-numeric value even when this is true.
// TODO(data): verified figures and definitions (decision D3).
export const SHOW_PROOF_STRIP = false;

// Block 10 "Programme example: Taita-Taveta County" (homepage).
// TODO(partner-approval): IRENA and partners must approve before naming them (decision D4).
// TODO(data): verified number of institutions and sub-counties.
export const SHOW_TAITA_TAVETA = false;

// Footer phone line. The review lists the phone as [Phone] (unconfirmed).
// TODO(data): phone number. Set FOOTER_PHONE to the confirmed number to show it.
export const FOOTER_PHONE = null;

// Closing line of "Why steam costs less" (What We Do page) — kept in code, NOT rendered.
// TODO(confirm): the "around half" claim against Ignis's site data (decision D2).
export const SHOW_AROUND_HALF_LINE = false;
