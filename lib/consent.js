// Cookie consent state, kept out of the component so any part of the app (or the
// footer, or the cookie policy page) can read it, change it, or reopen the
// banner. Behaviour matches what people expect from consent banners elsewhere:
//
//   * nothing non-essential loads before an explicit choice
//   * declining is one click, exactly like accepting
//   * the choice persists and the banner stays gone
//   * you can reopen it later and change your mind
//   * going from accept to decline actually removes the analytics cookies
import { initGA, GA_ID } from '@/lib/analytics';

const KEY = 'ignis-cookie-consent'; // 'granted' | 'denied'
const EVENT = 'ignis:consent-change';

export function getConsent() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null; // private mode / blocked storage: ask again next visit
  }
}

function store(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* nothing we can do; the choice just will not persist */
  }
}

// GA writes _ga and _ga_<id> on the registrable domain. Expire them on decline so
// "decline" genuinely removes what "accept" created.
function clearAnalyticsCookies() {
  if (typeof document === 'undefined') return;
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((n) => n === '_ga' || n.startsWith('_ga_') || n === '_gid' || n.startsWith('_gat'));
  const host = location.hostname;
  const domains = [host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
  for (const name of names) {
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${d}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

function announce(value) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

export function acceptCookies() {
  store('granted');
  if (GA_ID) initGA();
  announce('granted');
}

export function declineCookies() {
  store('denied');
  clearAnalyticsCookies();
  announce('denied');
}

/** Reopen the banner so a previous choice can be changed. */
export function openCookiePreferences() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: 'reopen' }));
}

export function onConsentChange(handler) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

/**
 * Called once at startup. Loads analytics only if consent was already granted.
 * Returns true when the banner should be shown, i.e. no choice has been recorded.
 *
 * The banner is shown whether or not VITE_GA_ID happens to be configured: the
 * site intends to run analytics, so visitors get asked either way and the answer
 * is already on file the moment a measurement ID is added. initGA() itself is a
 * no-op without an ID, so accepting with no ID set simply collects nothing.
 */
export function initConsent() {
  const stored = getConsent();
  if (stored === 'granted') {
    if (GA_ID) initGA();
    return false;
  }
  return stored !== 'denied';
}
