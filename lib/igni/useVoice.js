import { useCallback, useEffect, useRef, useState } from 'react';

// Igni's voice conversation, using the browser's own speech services (no extra
// API or cost): SpeechRecognition turns the visitor's speech into a question,
// speechSynthesis reads Igni's answers aloud. Both are feature-detected; where
// a browser lacks one (Firefox has no SpeechRecognition) that control is hidden.
//
// Note: Chrome and Edge send recognised audio to their vendor's speech service;
// the privacy page says so.

export const VOICE_LANGS = {
  en: { label: 'EN', name: 'English', listen: 'en-KE', speak: ['en-KE', 'en-GB', 'en-US', 'en'] },
  sw: { label: 'SW', name: 'Kiswahili', listen: 'sw-KE', speak: ['sw-KE', 'sw-TZ', 'sw'] },
};

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
  const rec = useRef(null);
  const finalCb = useRef(onFinal);
  finalCb.current = onFinal;

  // Voices load asynchronously in Chrome; touching the list starts the load.
  useEffect(() => {
    if (canSpeak) window.speechSynthesis.getVoices();
  }, [canSpeak]);

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
    r.lang = VOICE_LANGS[langKey].listen;
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
    const key = langKey === 'sw' || looksSwahili(text) ? 'sw' : 'en';
    const u = new SpeechSynthesisUtterance(say);
    const voice = pickVoice(VOICE_LANGS[key].speak);
    if (voice) u.voice = voice;
    u.lang = voice?.lang || VOICE_LANGS[key].listen;
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

  return { canListen, canSpeak, listening, interim, error, speaking, listen, stopListening, speak, stopSpeaking };
}
