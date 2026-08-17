function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
export function Band({ children, className, id, as: Tag = "section" }) {
  return <Tag id={id} className={cx("band", className)}>{children}</Tag>;
}
export function Bleed({ children, className, id, as: Tag = "div" }) {
  return <Tag id={id} className={cx("bleed", className)}>{children}</Tag>;
}
export function Grid({ children, className, id, as: Tag = "div" }) {
  return <Tag id={id} className={cx("grid", className)}>{children}</Tag>;
}
export function Rows({ children, className, id, as: Tag = "div" }) {
  return <Tag id={id} className={cx(className)}>{children}</Tag>;
}
export function SectionLabel({ children }) {
  return <span className="sec-label">{children}</span>;
}
