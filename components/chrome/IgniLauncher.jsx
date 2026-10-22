import { lazy, Suspense, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HIDE_ON } from '@/components/chrome/StickyCta';
import { trackEvent } from '@/lib/analytics';

// Igni, the site chat assistant. Only this button is in the page bundle (and
// the prerendered HTML); the chat panel, its answerer and the knowledge base
// load on first open.
const IgniChat = lazy(() => import('@/components/chrome/IgniChat'));

export function IgniLauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const button = useRef(null);
  const { pathname } = useLocation();
  // On phones the launcher sits above the bottom action bar, except where that bar is hidden.
  const noBar = HIDE_ON.includes(pathname.replace(/\/+$/, ''));

  const show = () => {
    setLoaded(true);
    setOpen(true);
    trackEvent('igni_open');
  };
  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        className={`igni-launcher${noBar ? ' igni-launcher--nobar' : ''}${open ? ' is-hidden' : ''}`}
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <img src="/logo-flame.png" alt="" width="22" height="22" />
        <span>Ask Igni</span>
      </button>
      {loaded && (
        <Suspense fallback={null}>
          <IgniChat open={open} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
