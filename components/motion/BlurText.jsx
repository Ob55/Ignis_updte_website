export function BlurText({
  segments,
  className,
  stagger = 0.09,
  delay = 0,
  as: Tag = "h1"
}) {
  const label = segments.map((s) => typeof s === "string" ? s : s.text).join(" ");
  return <Tag className={className} aria-label={label}>{segments.map((s, i) => {
    const text = typeof s === "string" ? s : s.text;
    const cls = typeof s === "string" ? "blur-word" : `blur-word ${s.className}`;
    return <span
      key={i}
      className={cls}
      style={{ animationDelay: `${delay + i * stagger}s` }}
    >{text}{i < segments.length - 1 ? " " : ""}</span>;
  })}</Tag>;
}
