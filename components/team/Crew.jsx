import { Reveal } from "@/components/motion/Reveal";
const CREW = [
  { order: "01", name: "Dennis Nderitu", role: "Managing Director", discipline: "Leadership", photo: "/team/dennis.jpg", bio: "Dennis leads pipeline development, financing, and digital monitoring for clean cooking solutions, integrating carbon finance and data-driven systems to accelerate adoption and expand access to modern energy technologies." },
  { order: "02", name: "Elizabeth", role: "Head of Sales", discipline: "Sales", photo: "/team/elizabeth.jpg", bio: "Elizabeth leads sales strategy and client acquisition across institutional markets, driving revenue growth by building strong relationships with schools, hospitals, and government institutions, ensuring IGNIS solutions reach the institutions that need them most." },
  { order: "03", name: "Wilson", role: "Business Development", discipline: "Partnerships", photo: "/team/wilson.jpg", bio: "Wilson identifies and cultivates strategic partnerships and new business opportunities across Africa, scouting collaborators, evaluating market-entry points, and building alliances that expand IGNIS's reach and strengthen its position." },
  { order: "04", name: "Joan", role: "Human Resources", discipline: "People & Culture", photo: "/team/joan.jpg", bio: "Joan leads people and culture at IGNIS, running recruitment, team wellbeing, and the systems that keep a fast-growing field organisation moving, building the workplace that lets engineers and operators do their best work." },
  { order: "05", name: "Brian", role: "Head of Software Engineering", discipline: "Engineering", photo: "/team/brian.jpg", bio: "Brian heads software engineering at IGNIS, building the dMRV digital-monitoring platform and data systems that track fuel savings, uptime, and verified impact across every live site, turning field data into the numbers that drive financing and decisions." }
];
export function Crew() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>The people behind the boilers.</h2>
          <p>Engineers, operators, and the leaders who design, finance, and run steam systems on live sites.</p>
        </Reveal>
        <div className="crew-grid" style={{ marginTop: 48 }}>
          {CREW.map((m, i) => (
            <Reveal key={m.order} delay={i * 80}>
              <article className="crew-card glass">
                <div className="crew-portrait">
                  <img src={m.photo} alt={m.name} loading="lazy" />
                  <span className="crew-disc">{m.discipline}</span>
                </div>
                <div className="crew-body">
                  <h3>{m.name}</h3>
                  <span className="crew-role">{m.role}</span>
                  <p>{m.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
