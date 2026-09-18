import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CrewModal } from "@/components/team/CrewModal";

// `teaser` is the card blurb; `bio` is the full text shown in the modal.
const CREW = [
  {
    order: "01",
    name: "Dennis Nderitu",
    role: "Managing Director",
    discipline: "Leadership",
    photo: "/team/dennis.jpg",
    teaser: "Dennis leads Ignis, holding together the project pipeline, the financing that pays for it and the monitoring that proves the savings were real.",
    bio: [
      "Dennis is Managing Director at Ignis, where he leads pipeline development, financing and digital monitoring for institutional clean cooking. In practice that means holding three things together at once: the institutions that need cleaner kitchens, the capital that pays for them, and the evidence that the savings were real.",
      "A lot of that work is financial plumbing in the least glamorous sense. Institutions rarely have a capital budget for a new kitchen, but every one of them already has a fuel bill. He structures blended finance and carbon revenue so that existing line item becomes the thing that funds the upgrade, with no upfront cost to a school, hospital or correctional facility.",
      "He is equally stubborn about measurement. Ignis meters its sites and reports what they actually burn, because a savings figure nobody can check is a brochure claim, and bursars, financiers and regulators have all been handed enough of those. The digital monitoring platform exists so that every number the company quotes can be traced back to a meter reading.",
      "He has spent his career in clean energy across African markets, and is most useful in the gap between a technology that works and an institution that cannot yet afford it. Closing that gap, at the scale the continent actually needs, is the job he took."
    ]
  },
  {
    order: "02",
    name: "Elizabeth Ooro",
    role: "Head of Pipeline",
    discipline: "Pipeline & Growth",
    photo: "/team/elizabeth.jpg",
    teaser: "Elizabeth works across partnerships, commercial development and the growth of CleanCookIQ — and cares less about clean energy as an idea than about seeing the transition actually happen.",
    bio: [
      "Elizabeth is Head of Pipeline at Ignis, where she works across partnerships, commercial development and the growth of CleanCookIQ, Ignis' digital platform connecting institutions, clean cooking solutions and financing. She is passionate about clean energy and, more importantly, about seeing the transition happen — helping households and institutions move towards cleaner, more efficient and sustainable cooking solutions.",
      "Over the years, she has worked with a wide range of players in the sector, including social enterprises, MFIs, retail and general trade, NGOs, corporates, development partners and government. These experiences have given her a strong understanding of the people, partnerships and practical realities needed to move clean energy solutions from an idea to adoption at scale.",
      "Elizabeth is naturally curious and loves asking questions, understanding different perspectives and getting to the heart of a problem before looking for a solution. She enjoys connecting the right people, finding opportunities and figuring out how to turn a good idea into something that works in the real world.",
      "Outside of work, she is a mother, a lover of God and someone who enjoys music, singing in church and meaningful conversations. She brings energy, curiosity and a genuine love for people into the work she does and the relationships she builds."
    ]
  },
  {
    order: "03",
    name: "Wilson Mungai",
    role: "Partnerships & Business Opportunities",
    discipline: "Partnerships",
    photo: "/team/wilson.jpg",
    teaser: "Wilson scouts and builds strategic alliances across African markets, so clean cooking solutions actually reach the households and institutions that need them.",
    bio: [
      "Wilson works on Partnerships & Business Opportunities at Ignis, scouting and building strategic alliances across African markets so that clean cooking solutions can actually reach the households and institutions that need them, while also evaluating new market entry points and supporting proposal development for donor-funded programmes and opportunities.",
      "He's an engineer by education, but somewhere along the way discovered he genuinely enjoys turning complex technical detail into a story that funders, partners and consortium teams can actually get behind. Over the past couple of years, he's helped develop competitive proposals for major donors, contributing to funding asks across Sub-Saharan Africa. That combination is what he brings to Ignis' partnerships and growth conversations.",
      "He's genuinely curious about where clean energy, climate action and technology intersect, and he likes being in the room where those conversations happen — whether that's institutional cooking, carbon finance, or AI and automation creeping into the sector.",
      "At the core, he's after one thing: helping good ideas find the partners and funding they need to actually reach people."
    ]
  },
  {
    order: "04",
    name: "Joan Wanjiku",
    role: "People & Operations",
    discipline: "People & Operations",
    photo: "/team/joan.jpg",
    teaser: "Wanjiku runs the part of the organisation that makes sure things don't fall apart \u2014 the systems, the ownership and the follow-through that keep projects moving.",
    bio: [
      "Wanjiku runs the part of the organisation that makes sure things don't fall apart. She leads People & Operations. In practice, that means building the systems that keep the organisation running, helping the team work better together, keeping projects moving, and making sure important things don't quietly fall through the cracks.",
      "She likes structure, but not bureaucracy. She likes clear ownership, useful meetings, good processes, and knowing what needs to happen next. And she has a habit of asking, “Why are we doing it this way?” — especially when the answer is simply, “Because that's how we've always done it.”",
      "Her work has taken her through clean energy, innovation, project delivery and the wonderfully messy reality of growing organisations. She enjoys figuring out how to bring some order to that mess without taking the life out of it.",
      "At the end of the day, she is interested in one thing: making it easier for good people to do good work."
    ]
  }
];

export function Crew() {
  const [active, setActive] = useState(null);
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Meet the team <span className="serif grad-flame">behind it.</span></h2>
          <p>Engineers, operators, and the leaders who design, finance, and run steam systems on live sites.</p>
        </Reveal>
        <div className="crew-grid" style={{ marginTop: 48 }}>
          {CREW.map((m, i) => (
            <Reveal key={m.order} delay={i * 80}>
              <article className="crew-card glass">
                <div className="crew-portrait">
                  <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" />
                  <span className="crew-disc">{m.discipline}</span>
                </div>
                <div className="crew-body">
                  <h3>{m.name}</h3>
                  <span className="crew-role">{m.role}</span>
                  <p>{m.teaser}</p>
                  {m.bio.length > 1 && (
                    <button type="button" className="crew-more" onClick={() => setActive(m)}>
                      Read full bio
                    </button>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <CrewModal member={active} onClose={() => setActive(null)} />
    </section>
  );
}
