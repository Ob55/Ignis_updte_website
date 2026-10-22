import { useCallback, useEffect, useRef, useState } from 'react';
import { igniLang } from '../../content/igni-i18n.js';

// Igni's voice conversation, using the browser's own speech services (no extra
// API or cost): SpeechRecognition turns the visitor's speech into a question,
// speechSynthesis reads Igni's answers aloud. Both are feature-detected; where
// a browser lacks one (Firefox has no SpeechRecognition) that control is hidden.
//
// Note: Chrome and Edge send recognised audio to their vendor's speech service;
// the privacy page says so.

// Locales per language live in content/igni-i18n.js (listen / speak).
const SW_WORDS = /\b(na|kwa|ya|wa|ni|za|katika|hii|kupika|jiko|shule|karibu|asante|tunaweza|yako|yetu)\b/gi;
export const looksSwahili = (text) => (String(text).match(SW_WORDS) || []).length >= 3;

// What gets spoken: plain sentences, no markdown, links, image tags or paths.
export function speakable(text) {
  return String(text)
    .replace(/\[\[image:[^\]]*\]\]/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|\s)\/[a-z0-9\-/#]+/gi, ' ')
    .replace(/^\s*(?:[-*•]|\d+\.)\s+/gm, '')
    .replace(/\+254 ?(\d{3}) ?(\d{3})(\d{3})/g, 'plus 2 5 4, $1, $2, $3')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickVoice(prefs) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  for (const p of prefs) {
    const v = voices.find((x) => x.lang?.toLowerCase().startsWith(p.toLowerCase()));
    if (v) return v;
  }
  return null;
}

export function useVoice({ onFinal }) {
  const SR = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
  const canListen = Boolean(SR);
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [voicesReady, setVoicesReady] = useState(0);
  const rec = useRef(null);
  const finalCb = useRef(onFinal);
  finalCb.current = onFinal;

  // Voices load asynchronously in Chrome; re-render when they arrive so
  // canSpeakIn() reflects what this device can actually pronounce.
  useEffect(() => {
    if (!canSpeak) return;
    const ss = window.speechSynthesis;
    ss.getVoices();
    const on = () => setVoicesReady((n) => n + 1);
    ss.addEventListener?.('voiceschanged', on);
    return () => ss.removeEventListener?.('voiceschanged', on);
  }, [canSpeak]);

  // English always has a usable default voice; other languages only when the
  // device has a matching voice (an English voice reading Amharic is useless).
  const canSpeakIn = useCallback(
    (langKey) => canSpeak && (langKey === 'en' || Boolean(pickVoice(igniLang(langKey).speak))),
    [canSpeak, voicesReady] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const stopSpeaking = useCallback(() => {
    if (canSpeak) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [canSpeak]);

  const listen = useCallback((langKey) => {
    if (!SR) return;
    stopSpeaking();
    setError(null);
    setInterim('');
    const r = new SR();
    r.lang = igniLang(langKey).listen;
    r.interimResults = true;
    r.continuous = false;
    r.maxAlternatives = 1;
    let finalText = '';
    r.onresult = (e) => {
      let live = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else live += t;
      }
      setInterim((finalText + live).trim());
    };
    r.onerror = (e) => {
      if (e.error !== 'no-speech' && e.error !== 'aborted') setError(e.error);
    };
    r.onend = () => {
      setListening(false);
      setInterim('');
      rec.current = null;
      if (finalText.trim()) finalCb.current(finalText.trim());
    };
    rec.current = r;
    try {
      r.start();
      setListening(true);
    } catch {
      setError('start-failed');
    }
  }, [SR, stopSpeaking]);

  const stopListening = useCallback(() => rec.current?.stop(), []);

  const speak = useCallback((text, langKey) => {
    if (!canSpeak) return;
    const say = speakable(text);
    if (!say) return;
    window.speechSynthesis.cancel();
    // An English-mode answer that came back in Kiswahili still gets a Kiswahili voice.
    const key = langKey === 'en' && looksSwahili(text) && pickVoice(igniLang('sw').speak) ? 'sw' : langKey;
    const voice = pickVoice(igniLang(key).speak);
    if (key !== 'en' && !voice) return;
    const u = new SpeechSynthesisUtterance(say);
    if (voice) u.voice = voice;
    u.lang = voice?.lang || igniLang(key).listen;
    u.rate = 1;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }, [canSpeak]);

  // Stop everything when the panel unmounts.
  useEffect(() => () => {
    rec.current?.abort();
    if (canSpeak) window.speechSynthesis.cancel();
  }, [canSpeak]);

  return { canListen, canSpeak, canSpeakIn, listening, interim, error, speaking, listen, stopListening, speak, stopSpeaking };
}
