import { Manifesto } from "@/components/motion/Manifesto";
const WORDS = "Every institution still cooking on firewood is burning money, choking its kitchen staff in smoke, and felling forests to feed its students. We end that, with steam.".split(
  " "
);
const FLAME = WORDS.map((w, i) => /money|smoke|end|steam\.?/i.test(w) ? i : -1).filter((i) => i >= 0);
export function ManifestoSection() {
  return <section className="section manifesto"><div className="wrap"><Manifesto words={WORDS} flame={FLAME} /></div></section>;
}
