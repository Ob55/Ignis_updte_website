import { useEffect, useRef } from "react";
import { X } from "lucide-react";

// Full-bio dialog for a crew member. Mirrors the KitchenModal pattern:
// Escape to close, body-scroll lock, backdrop click, focus moved in and returned.
export function CrewModal({ member, onClose }) {
  const closeRef = useRef(null);
  const returnRef = useRef(null);

  useEffect(() => {
    if (!member) return;
    returnRef.current = document.activeElement;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnRef.current?.focus?.();
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div className="crew-modal" role="dialog" aria-modal="true" aria-labelledby="crew-modal-name" onClick={onClose}>
      <div className="crew-modal-frame glass" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="crew-modal-close" onClick={onClose} aria-label={`Close ${member.name} biography`}>
          <X size={20} strokeWidth={2} />
        </button>
        <div className="crew-modal-head">
          <img src={member.photo} alt="" className="crew-modal-portrait" />
          <div>
            <h3 id="crew-modal-name">{member.name}</h3>
            <span className="crew-role">{member.role}</span>
          </div>
        </div>
        <div className="crew-modal-body">
          {member.bio.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </div>
    </div>
  );
}
