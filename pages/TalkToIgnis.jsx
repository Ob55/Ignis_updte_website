import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowDownRight, MessageCircle, Mail, Phone, MapPin, School, Users } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { SITE, MAPS_DIRECTIONS } from '@/lib/site';
import { Breadcrumbs } from '@/components/chrome/Breadcrumbs';
import { AssessmentForm, PartnerForm } from '@/components/contact/EnquiryForms';
import { MapDirections } from '@/components/contact/MapDirections';
import { Faq } from '@/components/contact/Faq';
import { PARTNER_ROLES } from '@/content/roles';
import { HERO } from '@/content/hero-images';

// Talk to Ignis: the assessment request and role-based enquiries.
// Layout: a solid emerald header that asks "which conversation?" (two path cards
// + direct contacts), then ONE tabbed form area. Deep links keep working:
// /talk-to-ignis#assessment and /talk-to-ignis?role=…#partner select the right
// tab and scroll to the form (anchors sit at the top of the form area).
const TABS = [
  { id: 'assessment', label: 'Request an Assessment', icon: School },
  { id: 'partner', label: 'Partner with Ignis', icon: Users },
];

const CONTACTS = [
  { icon: MessageCircle, label: 'WhatsApp', value: SITE.phone, href: `https://wa.me/${SITE.whatsapp}`, external: true },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phoneHref}` },
  { icon: MapPin, label: 'Office', value: SITE.address.short, href: MAPS_DIRECTIONS, external: true },
];

const ext = (c) => (c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

function DirectContacts({ compact = false }) {
  // the header row skips "Phone": it is the same number as WhatsApp
  const items = compact ? CONTACTS.filter((c) => c.label !== 'Phone') : CONTACTS;
  return (
    <ul className={`talk-contacts${compact ? ' talk-contacts--compact' : ''}`}>
      {items.map((c) => (
        <li key={c.label}>
          <a href={c.href} {...ext(c)}>
            <c.icon size={18} strokeWidth={1.9} aria-hidden="true" />
            <span className="talk-contact-k">{c.label}</span>
            <span className="talk-contact-v">{c.value}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function TalkToIgnis() {
  useSeo(seoFor('/talk-to-ignis'));
  const { hash, search } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('assessment');

  // #partner (or ?role=…) opens the partner tab; #assessment the assessment tab.
  useEffect(() => {
    if (hash === '#partner' || new URLSearchParams(search).get('role')) setTab('partner');
    else if (hash === '#assessment') setTab('assessment');
  }, [hash, search]);

  const choose = (id) => {
    setTab(id);
    navigate({ search: id === 'partner' ? search : '', hash: `#${id}` }, { replace: true });
  };

  return (
    <>
      <section className="talk-hero on-dark">
        <img className="talk-hero-img" src={HERO['talk-contact'].src} alt={HERO['talk-contact'].alt} fetchpriority="high" />
        <div className="talk-hero-scrim" aria-hidden="true" />
        <div className="wrap talk-hero-inner">
          <Breadcrumbs />
          <h1 className="talk-hero-title">Talk to Ignis.</h1>
          <p className="talk-hero-sub">Start with the conversation that fits your role.</p>

          <div className="talk-paths">
            <Link to="#assessment" className="talk-path" onClick={() => setTab('assessment')}>
              <span className="talk-path-k">For institutions</span>
              <span className="talk-path-h">Request an Assessment</span>
              <span className="talk-path-p">
                Tell us about your kitchen, approximate meal volumes and current fuel spend. We will
                assess the operating context and recommend the next step.
              </span>
              <span className="talk-path-go" aria-hidden="true"><ArrowDownRight size={22} /></span>
            </Link>
            <Link to="#partner" className="talk-path" onClick={() => setTab('partner')}>
              <span className="talk-path-k">For counties, financiers, technology providers and development partners</span>
              <span className="talk-path-h">Partner with Ignis</span>
              <span className="talk-path-p">
                Tell us who you are and what you are working on, and we will route you to the right person.
              </span>
              <span className="talk-path-go" aria-hidden="true"><ArrowDownRight size={22} /></span>
            </Link>
          </div>

          <DirectContacts compact />
        </div>
      </section>

      <section className="section talk-forms">
        {/* deep-link targets for /talk-to-ignis#assessment and #partner */}
        <span id="assessment" className="talk-anchor" aria-hidden="true" />
        <span id="partner" className="talk-anchor" aria-hidden="true" />
        <div className="wrap">
          <div className="talk-tabs" role="tablist" aria-label="Choose your enquiry">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                className={`talk-tab${tab === t.id ? ' active' : ''}`}
                onClick={() => choose(t.id)}
              >
                <t.icon size={18} strokeWidth={1.9} aria-hidden="true" /> {t.label}
              </button>
            ))}
          </div>

          <div className="talk-board">
            <div id="panel-assessment" role="tabpanel" aria-labelledby="tab-assessment" hidden={tab !== 'assessment'} className="talk-panel">
              <aside className="talk-aside">
                <h2 className="talk-aside-h">What to include</h2>
                <ol className="talk-steps">
                  <li><span>1</span>Approximate meals served per day</li>
                  <li><span>2</span>Your current monthly fuel spend, if you know it</li>
                  <li><span>3</span>Kitchen photos, sent on WhatsApp or by email after you submit</li>
                </ol>
                <h3 className="talk-aside-sub">Prefer to talk?</h3>
                <DirectContacts />
              </aside>
              <AssessmentForm />
            </div>

            <div id="panel-partner" role="tabpanel" aria-labelledby="tab-partner" hidden={tab !== 'partner'} className="talk-panel">
              <aside className="talk-aside">
                <h2 className="talk-aside-h">Who this is for</h2>
                <ul className="talk-roles">
                  {PARTNER_ROLES.map((r) => (
                    <li key={r.value}>
                      <Link to={`/who-we-work-with/${r.audience}`}>{r.label}</Link>
                    </li>
                  ))}
                </ul>
                <h3 className="talk-aside-sub">Prefer to talk?</h3>
                <DirectContacts />
              </aside>
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      <MapDirections />
      <Faq />
    </>
  );
}
