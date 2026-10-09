import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Compact card: orange icon (decoration only), dark text, light-green surface.
// Pass `to` + `cta` to give the card exactly one link.
export function IconCard({ icon: Icon, title, children, to, cta, headingLevel: H = "h3" }) {
  return (
    <div className="icon-card">
      {Icon && (
        <span className="icon-card-icon" aria-hidden="true">
          <Icon size={24} strokeWidth={1.8} />
        </span>
      )}
      <H className="icon-card-title">{title}</H>
      {children && <p>{children}</p>}
      {to && cta && (
        <Link className="card-link" to={to}>
          {cta} <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

// Reusable programme / case-study card. Fields mirror the case-study template
// in content/case-studies.js. Only verified numbers belong in `stats`.
export function ProjectCard({ project }) {
  const { title, location, image, imageAlt, role, output, stats = [], link } = project;
  return (
    <article className="project-card">
      {image && <img className="project-card-img" src={image} alt={imageAlt} loading="lazy" />}
      <div className="project-card-body">
        {location && <span className="card-kicker">{location}</span>}
        <h3>{title}</h3>
        {stats.length > 0 && (
          <dl className="project-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {role && <p><strong>Ignis&apos;s role:</strong> {role}</p>}
        {output && <p><strong>Output:</strong> {output}</p>}
        {link && (
          <Link className="card-link" to={link.to}>
            {link.label} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}

// Field Notes story card: photo, type tag, headline, link.
export function StoryCard({ story }) {
  return (
    <Link className="story-card" to={`/our-work/field-notes/${story.slug}`}>
      {story.heroImage || story.coverImage ? (
        <img
          className="story-card-img"
          src={story.heroImage || story.coverImage}
          alt={story.heroImage ? story.heroImageAlt : story.coverImageAlt}
          loading="lazy"
        />
      ) : (
        // TODO(data): story photo. Neutral block until a real photo exists.
        <div className="story-card-img story-card-img--empty" aria-hidden="true" />
      )}
      <div className="story-card-body">
        <span className="tag tag--self">{story.type}</span>
        <h3>{story.headline}</h3>
        <span className="card-link">
          Read the field note <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

// Visible "content coming" box for stub pages ONLY (never on the homepage).
// Every call site carries its own TODO(content) comment.
export function TodoPlaceholder({ children = "Content for this section is being prepared." }) {
  return <div className="todo-placeholder" role="note">{children}</div>;
}
