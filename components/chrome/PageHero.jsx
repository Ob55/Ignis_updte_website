import { Ambient } from "@/components/motion/Ambient";
import { BlurText } from "@/components/motion/BlurText";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
// Interior-page hero. Pass `image` to render a full-bleed background photo with a
// dark scrim and rising embers (text turns light); omit it for the original
// light text-only hero. Layout/asset only — no page copy lives here.
export function PageHero({
  eyebrow,
  segments,
  sub,
  image,
  imageAlt = ""
}) {
  const hasImg = Boolean(image);
  return <section className={`pagehero${hasImg ? " pagehero--bg" : ""}`}>{hasImg && <img className="pagehero-bg" src={image} alt={imageAlt} aria-hidden="true" />}{hasImg && <div className="pagehero-scrim" aria-hidden="true" />}<Ambient specks={hasImg} /><div className="hero-glow" aria-hidden="true" /><div className="wrap" style={{ position: "relative", zIndex: 3 }}><Breadcrumbs /><span className="eyebrow">{eyebrow}</span><BlurText as="h1" segments={segments} className="pagehero-h1" stagger={0.07} delay={0.1} /><p className="pagehero-sub">{sub}</p></div></section>;
}
