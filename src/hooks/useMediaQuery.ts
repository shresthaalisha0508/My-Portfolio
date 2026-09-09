import { useEffect, useState } from 'react';

/**
 * useMediaQuery — reactive CSS media-query state.
 *
 * Returns `true`/`false` and re-renders when the match changes, letting JSX
 * branch between layouts (e.g. horizontal journey timeline on desktop,
 * vertical on mobile) while CSS media queries handle pure styling.
 *
 * `window.matchMedia` is guarded so the hook is safe in non-browser
 * environments (tests, SSR-style rendering).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mql.matches); // sync if the query prop changed
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
