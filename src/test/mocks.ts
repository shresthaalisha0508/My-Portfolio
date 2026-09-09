/**
 * Replaces window.location with a plain writable object so tests can observe
 * navigations (e.g. the mailto: fallback) without jsdom attempting real
 * navigation (which logs "Not implemented" errors).
 */
export function mockWindowLocation(): { href: string } {
  const fakeLocation = { href: 'https://example.com/' };
  Object.defineProperty(window, 'location', {
    value: fakeLocation,
    writable: true,
    configurable: true,
  });
  return fakeLocation;
}
