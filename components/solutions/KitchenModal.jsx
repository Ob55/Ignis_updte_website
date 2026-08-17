import { useEffect } from "react";
import { X } from "lucide-react";

export function KitchenModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="k-modal" role="dialog" aria-modal="true" aria-label="IGNIS 3D kitchen design" onClick={onClose}>
      <div className="k-modal-frame" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="k-modal-close" onClick={onClose} aria-label="Close 3D kitchen design">
          <X size={20} strokeWidth={2} />
        </button>
        <iframe src="/models/kitchen-3d.html" title="IGNIS 3D kitchen design" />
      </div>
    </div>
  );
}
