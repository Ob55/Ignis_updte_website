// Native <details>/<summary> disclosure: keyboard-accessible, works without JS,
// and the content is in the prerendered HTML.
export function Accordion({ title, children, id, defaultOpen = false, as: Heading = "h3" }) {
  return (
    <details className="accordion" id={id} open={defaultOpen || undefined}>
      <summary>
        <Heading className="accordion-title">{title}</Heading>
      </summary>
      <div className="accordion-body">{children}</div>
    </details>
  );
}
