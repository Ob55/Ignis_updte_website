import { Link } from "react-router-dom";
import { roleForAudience } from "@/content/roles";

// The one Button for the whole site. Two variants only:
//   primary   — filled Emerald, white text
//   secondary — outlined Emerald
// Brand rule: at most two buttons per section (one primary, one secondary).
// Renders a router <Link> for internal paths, <a> for external/hash/mailto,
// and <button> when there is no destination.
export function Button({ to, href, variant = "primary", className, children, ...rest }) {
  const cls = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
  if (to) return <Link className={cls} to={to} {...rest}>{children}</Link>;
  if (href) return <a className={cls} href={href} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

// The only two site-wide actions. Labels are fixed by the brand rules; use these
// instead of hand-writing the label or path anywhere.
export const ASSESSMENT_PATH = "/talk-to-ignis#assessment";
export const PARTNER_PATH = "/talk-to-ignis#partner";

export function RequestAssessmentButton(props) {
  return <Button to={ASSESSMENT_PATH} variant="primary" {...props}>Request an Assessment</Button>;
}

// `role` (an audience id) preselects "Your role" on the enquiry form.
export function PartnerButton({ role, ...props }) {
  const value = role && roleForAudience(role);
  const to = value ? `/talk-to-ignis?role=${value}#partner` : PARTNER_PATH;
  return <Button to={to} variant="secondary" {...props}>Partner with Ignis</Button>;
}
