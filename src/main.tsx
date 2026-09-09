import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted variable fonts (loaded before styles so text never paints in
// a fallback face) — no external font CDN request, works offline.
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';

import { App } from '@/app/App';

import '@/styles/global.css';

/**
 * Entry point.
 *
 * StrictMode double-invokes render and effects in development on purpose —
 * it surfaces impure renders and missing effect cleanup early. If something
 * breaks only in dev, suspect a side effect in render or a missing cleanup.
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found — check index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
