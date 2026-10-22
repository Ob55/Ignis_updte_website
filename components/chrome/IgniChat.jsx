import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUp, Sparkles, Mic, Square, Volume2, VolumeX } from 'lucide-react';
import { createAnswerer } from '@/lib/igni/localAnswer';
import { FAQS } from '@/content/faqs';
import { INTENTS, LINKS } from '@/content/igni-intents';
import { IGNI_IMAGES } from '@/content/igni-images';
import { useVoice, VOICE_LANGS } from '@/lib/igni/useVoice';
import { trackEvent } from '@/lib/analytics';

// The Igni panel (lazy-loaded by IgniLauncher). Simple questions are answered
// here from the site's content; complex ones stream from /api/chat (Claude).
// The conversation lives in sessionStorage so it survives page changes.
// Voice: the mic turns speech into a question; with "read aloud" on, Igni
// speaks its answers (lib/igni/useVoice.js). Pictures come only from
// content/igni-images.js, by id.

const STORE = 'igni:v1';
const SUGGESTIONS = ['What is Asili?', 'How is the transition financed?', 'Where do you work?', 'How do I get started?'];
const GREETING = {
  role: 'assistant',
  kind: 'local',
  text: "Hi, I'm Igni. Ask me about Ignis, our clean-cooking solutions or the Asili cooker.",
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

function ActionLink({ link, onNavigate }) {
  const external = !link.to.startsWith('/');
  const props = { className: 'igni-action', onClick: () => { trackEvent('igni_handoff_click', { label: link.label }); if (!external) onNavigate(); } };
  return external
    ? <a href={link.to} target="_blank" rel="noopener noreferrer" {...props}>{link.label}</a>
    : <Link to={link.to} {...props}>{link.label}</Link>;
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
  const [lang, setLang] = useState(() => (loadPref(VOICE_STORE + ':lang', 'en') === 'sw' ? 'sw' : 'en'));
  const [readAloud, setReadAloud] = useState(() => loadPref(VOICE_STORE, 'off') === 'on');
  const readRef = useRef(readAloud);
  readRef.current = readAloud;
  const voice = useVoice({ onFinal: (text) => submit(text, { spoken: true }) });

  useEffect(() => savePref(VOICE_STORE, readAloud ? 'on' : 'off'), [readAloud]);
  useEffect(() => savePref(VOICE_STORE + ':lang', lang), [lang]);
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
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          history: history.filter((m) => m.text && !m.pending).slice(-8).map((m) => ({ role: m.role, text: m.text })),
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
          if (data.t === 'delta') text += data.text;
          if (data.t === 'replace') text = data.text;
          update(id, { text });
        }
      }
      const finalText = text || "Sorry, I couldn't get an answer just now.";
      update(id, { text: finalText, pending: false, links: [LINKS.assessment] });
      sayIfOn(finalText);
    } catch (err) {
      if (err?.name === 'AbortError') return;
      sayIfOn("I couldn't reach my AI helper just now. The team can answer directly.");
      update(id, {
        text: "I couldn't reach my AI helper just now. The team can answer directly:",
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

  const shown = msgs.length ? msgs : [GREETING];

  return (
    <div
      ref={panel}
      className="igni-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="igni-title"
      hidden={!open}
      onKeyDown={onKeyDown}
    >
      <header className="igni-head">
        <img src="/logo-flame.png" alt="" width="28" height="28" />
        <div>
          <h2 id="igni-title">Igni</h2>
          <p>Ignis assistant</p>
        </div>
        <div className="igni-head-tools">
          {(voice.canListen || voice.canSpeak) && (
            <button
              type="button"
              className="igni-tool igni-lang"
              onClick={() => setLang((l) => (l === 'en' ? 'sw' : 'en'))}
              aria-label={`Voice language: ${VOICE_LANGS[lang].name}. Switch to ${VOICE_LANGS[lang === 'en' ? 'sw' : 'en'].name}`}
              title={`Voice language: ${VOICE_LANGS[lang].name}`}
            >
              {VOICE_LANGS[lang].label}
            </button>
          )}
          {voice.canSpeak && (
            <button
              type="button"
              className={`igni-tool${readAloud ? ' is-on' : ''}`}
              onClick={() => { if (readAloud) voice.stopSpeaking(); setReadAloud(!readAloud); }}
              aria-pressed={readAloud}
              aria-label={readAloud ? 'Stop reading answers aloud' : 'Read answers aloud'}
              title={readAloud ? 'Reading answers aloud' : 'Read answers aloud'}
            >
              {readAloud ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
            </button>
          )}
        </div>
        <button type="button" className="igni-close" onClick={onClose} aria-label="Close chat">
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      <div className="igni-log" ref={list} aria-live="polite">
        {shown.map((m, i) => (
          <div key={m.id || i} className={`igni-msg igni-msg--${m.role}`}>
            {m.role === 'assistant' && (
              <span className="igni-tag">{m.kind === 'ai' ? <><Sparkles size={12} aria-hidden="true" /> Igni AI</> : 'From the Ignis website'}</span>
            )}
            <div className="igni-bubble">
              {m.pending && !m.text ? <span className="igni-typing" aria-label="Igni is typing"><i /><i /><i /></span> : <Rich text={m.text} onNavigate={onClose} />}
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
                {m.source && <Link className="igni-source" to={m.source.url} onClick={onClose}>From: {m.source.title}</Link>}
                {m.links?.map((l) => <ActionLink key={l.to} link={l} onNavigate={onClose} />)}
                {m.kind === 'local' && m.q && (
                  <button type="button" className="igni-more" onClick={() => moreDetail(m)} disabled={busy}>
                    <Sparkles size={13} aria-hidden="true" /> Ask Igni AI for more detail
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ))}
        {!msgs.length && (
          <div className="igni-chips">
            {SUGGESTIONS.map((s) => <button key={s} type="button" onClick={() => submit(s)}>{s}</button>)}
          </div>
        )}
      </div>

      {(voice.listening || voice.error) && (
        <p className={`igni-voice-status${voice.error ? ' is-error' : ''}`} role="status">
          {voice.error
            ? voice.error === 'not-allowed' || voice.error === 'service-not-allowed'
              ? 'Microphone is blocked. Allow it in your browser settings, or type your question.'
              : "I couldn't hear that. Try again, or type your question."
            : voice.interim || `Listening in ${VOICE_LANGS[lang].name}…`}
        </p>
      )}
      <form className="igni-form" onSubmit={(e) => { e.preventDefault(); submit(input); }}>
        <label htmlFor="igni-input" className="sr-only">Ask Igni a question</label>
        <textarea
          id="igni-input"
          ref={field}
          rows={1}
          value={input}
          maxLength={1000}
          placeholder={voice.canListen ? 'Ask a question, or tap the mic…' : 'Ask a question…'}
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
            aria-label={voice.listening ? 'Stop listening' : `Speak your question (${VOICE_LANGS[lang].name})`}
          >
            {voice.listening ? <Square size={16} aria-hidden="true" /> : <Mic size={18} aria-hidden="true" />}
          </button>
        )}
        <button type="submit" className="igni-send" disabled={busy || !input.trim()} aria-label="Send">
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      </form>
      <p className="igni-note">Detailed questions are answered by AI (Claude); voice uses your browser&apos;s speech service. Please don&apos;t share personal information.</p>
    </div>
  );
}
