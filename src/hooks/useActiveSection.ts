import { useEffect, useState } from 'react';

/**
 * useActiveSection — tracks which page section is currently in view.
 *
 * Uses IntersectionObserver (much cheaper than scroll-position maths) to
 * observe each section element and report the topmost visible one. The Navbar
 * uses this to highlight the matching nav link.
 *
 * React concepts demonstrated:
 *  - useRef to hold a stable callback identity across renders
 *  - useEffect for subscribing to browser APIs with proper cleanup
 *  - deriving UI state (active id) from observation instead of polling
 *
 * Flutter equivalent: a ScrollController + visibility detection widgets.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState('');

  // Stable string key so the effect re-runs only when the *set* of sections
  // changes, not on every parent render (and satisfies exhaustive-deps).
  const sectionKey = sectionIds.join('|');

  useEffect(() => {
    const ids = sectionKey.split('|').filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry nearest the top of the viewport.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0]?.target.id ?? '');
        }
      },
      // A narrow horizontal band around the upper-middle of the screen.
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionKey]);

  return activeId;
}
