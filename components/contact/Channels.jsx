import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";
export function Channels() {
  const CH = [
    { icon: MessageCircle, k: "WhatsApp", v: SITE.phone, href: `https://wa.me/${SITE.whatsapp}`, big: true },
    { icon: Phone, k: "Phone", v: SITE.phone, href: `tel:${SITE.phone}` },
    { icon: Mail, k: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, k: "Office", v: "Lower Kabete Rd, Nairobi", href: "https://www.google.com/maps/dir/?api=1&destination=PQWX%2B232%20Nairobi" }
  ];
  return <section className="section" style={{ paddingTop: 48 }}><div className="wrap"><div className="channel-grid">{CH.map(({ icon: Icon, k, v, href, big }, i) => <Reveal key={k} delay={i * 70}><a className={`channel-card glass${big ? " big" : ""}`} href={href}><div className="disc glass" aria-hidden="true"><Icon size={22} strokeWidth={1.6} /></div><span className="k">{k}</span><span className="v">{v}</span></a></Reveal>)}</div></div></section>;
}
