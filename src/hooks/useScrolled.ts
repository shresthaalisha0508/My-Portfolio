import { useEffect, useState } from 'react';

/**
 * useScrolled — true once the page scrolls past `threshold` pixels.
 *
 * Why a custom hook? The Navbar needs "has the user scrolled" state, and the
 * scroll listener needs careful lifecycle handling (add on mount, remove on
 * unmount, rAF throttle). Wrapping that once means the consumer is a
 * one-liner — a custom hook earns its keep when it encapsulates *behaviour
 * with lifecycle*, not just state.
 *
 * Flutter equivalent: a ScrollController listener in a StatefulWidget's
 * initState/dispose, with setState in the callback.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      // rAF throttle: at most one state update per animation frame.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
      });
    };

    onScroll(); // set correct initial value (e.g. page reloaded mid-scroll)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return scrolled;
}
