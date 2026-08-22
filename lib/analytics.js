// Google Analytics 4. Set VITE_GA_ID (e.g. G-XXXXXXXXXX) in a .env file to
// activate. With no ID set, every call is a no-op, so dev/preview stay clean.
export const GA_ID = import.meta.env.VITE_GA_ID;

export function initGA() {
  if (!GA_ID || typeof window === "undefined") return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  // SPA: we send page_view manually on each route change.
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageview(path) {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
