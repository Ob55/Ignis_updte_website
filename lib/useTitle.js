import { useEffect } from 'react';

/** Set the document title per route (lightweight replacement for Next metadata). */
export function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
