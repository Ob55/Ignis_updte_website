import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUp, Sparkles, Mic, Square, Volume2, VolumeX } from 'lucide-react';
import { createAnswerer } from '@/lib/igni/localAnswer';
import { FAQS } from '@/content/faqs';
import { INTENTS, LINKS } from '@/content/igni-intents';
import { IGNI_IMAGES } from '@/content/igni-images';
import { useVoice } from '@/lib/igni/useVoice';
import { IGNI_LANGS, IGNI_LANG_KEYS, igniLang } from '@/content/igni-i18n';
import { trackEvent } from '@/lib/analytics';

// The Igni panel (lazy-loaded by IgniLauncher). Simple questions are answered
// here from the site's content; complex ones stream from /api/chat (Claude).
// The conversation lives in sessionStorage so it survives page changes.
// Voice: the mic turns speech into a question; with "read aloud" on, Igni
// speaks its answers (lib/igni/useVoice.js). Pictures come only from
// content/igni-images.js, by id. Language: the visitor picks one; the whole
// panel follows it (content/igni-i18n.js). Free local answers exist in English;
// in any other language questions go to the AI, which replies in that language.

const STORE = 'igni:v1';
const LANG_STORE = 'igni:lang';
// First visit: follow the browser's language when Igni speaks it.
const defaultLang = () => {
  const nav = typeof navigator !== 'undefined' ? (navigator.language || '').slice(0, 2).toLowerCase() : '';
  return IGNI_LANG_KEYS.includes(nav) ? nav : 'en';
};
// Action links carry English labels in content/igni-intents.js; show them in the panel's language.
const linkLabel = (link, t) => {
  const key = Object.keys(LINKS).find((k) => LINKS[k].to === link.to);
  return (key && t.links[key]) || link.label;
};

const load = () => {
  try {
    const v = JSON.parse(sessionStorage.getItem(STORE) || 'null');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};
const VOICE_STORE = 'igni:voice';
const loadPref = (key, fallback) => {
  try { return sessionStorage.getItem(key) ?? fallback; } catch { return fallback; }
};
const savePref = (key, value) => {
  try { sessionStorage.setItem(key, value); } catch { /* ignore */ }
};

// ---- pictures: [[image:id]] tags (AI) or `images` ids (local answers) -------
const IMAGE_BY_ID = new Map(IGNI_IMAGES.map((i) => [i.id, i]));
const IMAGE_TAG = /\[\[image:([a-z0-9-]+)\]\]/g;
// Also hides a half-streamed tag ("[[image:asi") until it completes.
const stripImageTags = (text) => text.replace(IMAGE_TAG, '').replace(/\[\[(?:i(?:m(?:a(?:g(?:e(?::[a-z0-9-]*\]?)?)?)?)?)?)?$/, '');
function imagesFor(m) {
  const ids = [...(m.images || []), ...[...(m.text || '').matchAll(IMAGE_TAG)].map((x) => x[1])];
  return [...new Set(ids)].map((id) => IMAGE_BY_ID.get(id)).filter(Boolean).slice(0, 2);
}

const save = (msgs) => {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-30)));
  } catch { /* storage blocked: the chat still works for this page */ }
};

// ---- tiny safe renderer: paragraphs, "- " lists, **bold**, [links](url) ------
const SAFE_URL = /^(\/(?!\/)|https:\/\/(ignis-innovation\.com|cleancookiq\.com|wa\.me)\b|mailto:)/;
function Inline({ text, onNavigate }) {
  const out = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|(?<=^|\s)(\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*(?:#[a-z-]+)?)(?=$|[\s.,;:!?)])/gi;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={k++}>{m[1]}</strong>);
    else {
      const label = m[2] || m[4];
      const url = m[3] || m[4];
      out.push(<SafeLink key={k++} to={url} onNavigate={onNavigate}>{label}</SafeLink>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
function SafeLink({ to, children, onNavigate }) {
  if (!SAFE_URL.test(to)) return <>{children}</>;
  if (to.startsWith('/')) return <Link to={to} onClick={onNavigate}>{children}</Link>;
  return <a href={to} target="_blank" rel="noopener noreferrer">{children}</a>;
}
function Rich({ text, onNavigate }) {
  const blocks = [];
  let list = null;
  stripImageTags(text).split('\n').forEach((line, i) => {
    const item = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
    if (item) {
      if (!list) blocks.push((list = { type: 'ul', items: [], key: i }));
      list.items.push(item[1]);
    } else {
      list = null;
      if (line.trim()) blocks.push({ type: 'p', text: line, key: i });
    }
  });
  return blocks.map((b) =>
    b.type === 'ul' ? (
      <ul key={b.key}>{b.items.map((t, j) => <li key={j}><Inline text={t} onNavigate={onNavigate} /></li>)}</ul>
    ) : (
      <p key={b.key}><Inline text={b.text} onNavigate={onNavigate} /></p>
    )
  );
}

function ActionLink({ link, t, onNavigate }) {
  const external = !link.to.startsWith('/');
  const label = linkLabel(link, t);
  const props = { className: 'igni-action', onClick: () => { trackEvent('igni_handoff_click', { label: link.label }); if (!external) onNavigate(); } };
  return external
    ? <a href={link.to} target="_blank" rel="noopener noreferrer" {...props}>{label}</a>
    : <Link to={link.to} {...props}>{label}</Link>;
}

export default function IgniChat({ open, onClose }) {
  // Page sections come from the build's dist/igni-kb.json; intents and the FAQ
  // work before (or without) it.
  const [kb, setKb] = useState([]);
  useEffect(() => {
    fetch('/igni-kb.json').then((r) => (r.ok ? r.json() : [])).then((d) => Array.isArray(d) && setKb(d)).catch(() => {});
  }, []);
  const ask = useMemo(() => createAnswerer({ faqs: FAQS, intents: INTENTS, kb }), [kb]);
  const [msgs, setMsgs] = useState(load);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const panel = useRef(null);
  const field = useRef(null);
  const list = useRef(null);
  const abort = useRef(null);
  const [lang, setLang] = useState(() => {
    const saved = loadPref(LANG_STORE, '');
    return IGNI_LANG_KEYS.includes(saved) ? saved : defaultLang();
  });
  const t = igniLang(lang);
  const [readAloud, setReadAloud] = useState(() => loadPref(VOICE_STORE, 'off') === 'on');
  const readRef = useRef(readAloud);
  readRef.current = readAloud;
  const voice = useVoice({ onFinal: (text) => submit(text, { spoken: true }) });

  useEffect(() => savePref(VOICE_STORE, readAloud ? 'on' : 'off'), [readAloud]);
  useEffect(() => savePref(LANG_STORE, lang), [lang]);
  const canRead = voice.canSpeakIn(lang);
  useEffect(() => { if (!open) { voice.stopListening(); voice.stopSpeaking(); } }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const sayIfOn = (text) => { if (readRef.current) voice.speak(text, lang); };

  useEffect(() => save(msgs.filter((m) => !m.pending)), [msgs]);
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight }); }, [msgs, open]);
  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    // Lock page scroll while the full-screen sheet is open on phones.
    const phone = window.matchMedia('(max-width: 600px)').matches;
    if (phone) document.body.style.overflow = 'hidden';
    return () => { if (phone) document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => () => abort.current?.abort(), []);

  // Esc closes; Tab stays inside the dialog.
  const onKeyDown = (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
    if (e.key !== 'Tab') return;
    const f = panel.current.querySelectorAll('a[href], button:not([disabled]), textarea, input');
    if (!f.length) return;
    const first = f[0];
    const lastEl = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
    else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
  };

  const update = (id, patch) => setMsgs((all) => all.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  async function askAi(question, history) {
    const id = `a${Date.now()}`;
    setMsgs((all) => [...all, { id, role: 'assistant', kind: 'ai', text: '', pending: true, q: question }]);
    setBusy(true);
    trackEvent('igni_ai_answer');
    const ctrl = new AbortController();
    abort.current = ctrl;
    let text = '';
    let failed = null;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          history: history.filter((m) => m.text && !m.pending).slice(-8).map((m) => ({ role: m.role, text: m.text })),
          lang,
        }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body || !(res.headers.get('content-type') || '').includes('text/event-stream')) throw new Error('unavailable');
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const events = buf.split('\n\n');
        buf = events.pop();
        for (const ev of events) {
          const line = ev.split('\n').find((l) => l.startsWith('data: '));
          if (!line) continue;
          const data = JSON.parse(line.slice(6));
          if (data.t === 'delta') { text += data.text; update(id, { text }); }
          if (data.t === 'fail') failed = data.reason || 'error';
        }
      }
      if (failed && failed !== 'refusal' && !text) throw new Error(failed);
      if (failed) {
        // A limit or a declined question: say so in the visitor's language and hand over to the team.
        const msg = { rate: t.rateLimited, cap: t.capReached, refusal: t.refusal, invalid: t.invalid }[failed] || t.aiFail;
        update(id, { text: msg, pending: false, links: [LINKS.whatsapp, LINKS.talk] });
        sayIfOn(msg);
        return;
      }
      const finalText = text || t.noAnswer;
      update(id, { text: finalText, pending: false, links: [LINKS.assessment] });
      sayIfOn(finalText);
    } catch (err) {
      if (err?.name === 'AbortError') return;
      const msg = { rate: t.rateLimited, cap: t.capReached, invalid: t.invalid }[err?.message] || t.aiFail;
      sayIfOn(msg);
      update(id, {
        text: msg,
        pending: false,
        links: [LINKS.whatsapp, LINKS.talk],
      });
    } finally {
      setBusy(false);
    }
  }

  function submit(raw, { spoken = false } = {}) {
    const q = raw.trim().slice(0, 1000);
    if (!q || busy) return;
    setInput('');
    voice.stopSpeaking();
    // Speaking a question turns on spoken answers: it's a voice conversation now.
    if (spoken && voice.canSpeak && !readRef.current) { readRef.current = true; setReadAloud(true); }
    if (spoken) trackEvent('igni_voice_question', { lang });
    const history = msgs;
    const lastWasAi = [...msgs].reverse().find((m) => m.role === 'assistant')?.kind === 'ai';
    const next = [...msgs, { id: `u${Date.now()}`, role: 'user', text: q }];
    setMsgs(next);
    const r = ask(q, { lastWasAi });
    // Outside English the site has no local answers in the visitor's language,
    // so only a greeting is answered here; everything else goes to the AI.
    if (lang !== 'en') {
      if (r.kind === 'local' && r.id === 'greeting') {
        setMsgs([...next, { id: `l${Date.now()}`, role: 'assistant', kind: 'local', text: t.greeting }]);
        sayIfOn(t.greeting);
      } else askAi(q, history);
      return;
    }
    if (r.kind === 'local') {
      trackEvent('igni_local_answer', { intent: r.id });
      setMsgs([...next, { id: `l${Date.now()}`, role: 'assistant', kind: 'local', text: r.text, links: r.links, source: r.source, images: r.images, q }]);
      sayIfOn(r.text);
    } else {
      askAi(q, history);
    }
  }

  const moreDetail = (m) => {
    const idx = msgs.indexOf(m);
    askAi(m.q, msgs.slice(0, Math.max(0, idx - 1)));
  };

  const shown = msgs.length ? msgs : [{ role: 'assistant', kind: 'local', text: t.greeting }];

  return (
    <div
      ref={panel}
      className="igni-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="igni-title"
      lang={t.listen.slice(0, 2)}
      hidden={!open}
      onKeyDown={onKeyDown}
    >
      <header className="igni-head">
        <img src="/logo-flame.png" alt="" width="28" height="28" />
        <div>
          <h2 id="igni-title">Igni</h2>
          <p>{t.subtitle}</p>
        </div>
        <div className="igni-head-tools">
          <label className="sr-only" htmlFor="igni-lang">{t.language}</label>
          <select id="igni-lang" className="igni-tool igni-lang" value={lang} onChange={(e) => { voice.stopSpeaking(); setLang(e.target.value); trackEvent('igni_language', { lang: e.target.value }); }} title={t.language}>
            {IGNI_LANG_KEYS.map((k) => <option key={k} value={k} lang={IGNI_LANGS[k].listen.slice(0, 2)}>{IGNI_LANGS[k].label}</option>)}
          </select>
          {voice.canSpeak && (
            <button
              type="button"
              className={`igni-tool${readAloud && canRead ? ' is-on' : ''}`}
              onClick={() => { if (readAloud) voice.stopSpeaking(); setReadAloud(!readAloud); }}
              disabled={!canRead}
              aria-pressed={readAloud && canRead}
              aria-label={!canRead ? t.readUnavailable : readAloud ? t.readOn : t.readOff}
              title={!canRead ? t.readUnavailable : readAloud ? t.readOn : t.readOff}
            >
              {readAloud && canRead ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
            </button>
          )}
        </div>
        <button type="button" className="igni-close" onClick={onClose} aria-label={t.close}>
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      <div className="igni-log" ref={list} aria-live="polite">
        {shown.map((m, i) => (
          <div key={m.id || i} className={`igni-msg igni-msg--${m.role}`}>
            {m.role === 'assistant' && (
              <span className="igni-tag">{m.kind === 'ai' ? <><Sparkles size={12} aria-hidden="true" /> {t.tagAi}</> : t.tagLocal}</span>
            )}
            <div className="igni-bubble">
              {m.pending && !m.text ? <span className="igni-typing" aria-label={t.typing}><i /><i /><i /></span> : <Rich text={m.text} onNavigate={onClose} />}
            </div>
            {m.role === 'assistant' && imagesFor(m).length > 0 && (
              <div className={`igni-pics igni-pics--${imagesFor(m).length}`}>
                {imagesFor(m).map((img) => (
                  <a key={img.id} href={img.src} target="_blank" rel="noopener noreferrer" className="igni-pic">
                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  </a>
                ))}
              </div>
            )}
            {!m.pending && (m.links?.length || m.source || (m.kind === 'local' && m.q)) ? (
              <div className="igni-actions">
                {m.source && <Link className="igni-source" to={m.source.url} onClick={onClose}>{t.source} {m.source.title}</Link>}
                {m.links?.map((l) => <ActionLink key={l.to} link={l} t={t} onNavigate={onClose} />)}
                {m.kind === 'local' && m.q && (
                  <button type="button" className="igni-more" onClick={() => moreDetail(m)} disabled={busy}>
                    <Sparkles size={13} aria-hidden="true" /> {t.more}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ))}
        {!msgs.length && (
          <div className="igni-chips">
            {t.suggestions.map((s) => <button key={s} type="button" onClick={() => submit(s)}>{s}</button>)}
          </div>
        )}
      </div>

      {(voice.listening || voice.error) && (
        <p className={`igni-voice-status${voice.error ? ' is-error' : ''}`} role="status">
          {voice.error
            ? voice.error === 'not-allowed' || voice.error === 'service-not-allowed' ? t.micBlocked : t.didntHear
            : voice.interim || t.listening}
        </p>
      )}
      <form className="igni-form" onSubmit={(e) => { e.preventDefault(); submit(input); }}>
        <label htmlFor="igni-input" className="sr-only">{t.input}</label>
        <textarea
          id="igni-input"
          ref={field}
          rows={1}
          value={input}
          maxLength={1000}
          placeholder={voice.canListen ? t.placeholderMic : t.placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(input); } }}
        />
        {voice.canListen && (
          <button
            type="button"
            className={`igni-mic${voice.listening ? ' is-listening' : ''}`}
            onClick={() => (voice.listening ? voice.stopListening() : voice.listen(lang))}
            disabled={busy}
            aria-pressed={voice.listening}
            aria-label={voice.listening ? t.stopListening : t.mic}
          >
            {voice.listening ? <Square size={16} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />}
          </button>
        )}
        <button type="submit" className="igni-send" disabled={busy || !input.trim()} aria-label={t.send}>
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      </form>
      <p className="igni-note">{t.note}</p>
    </div>
  );
}
