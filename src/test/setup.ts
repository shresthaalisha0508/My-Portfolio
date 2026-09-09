import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia; framer-motion and the hooks need it.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

// jsdom lacks IntersectionObserver (used by useActiveSection).
if (typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'function') {
  class IntersectionObserverMock implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
}
