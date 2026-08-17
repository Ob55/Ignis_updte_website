export function Marquee({ children }) {
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">{children}</div><div className="marquee-track">{children}</div></div>;
}
