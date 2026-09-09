import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults, defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';

/**
 * Base path resolution
 * ---------------------------------------------------------------------------
 * GitHub Pages serves project sites from a sub-directory, e.g.
 *   https://<user>.github.io/nurse-portfolio/
 * A Vite app built with the default base '/' would then request assets from
 * the domain root and get 404s.
 *
 * Priority (highest first):
 *   1. --base flag on the CLI (`vite build --base=/foo/`)
 *   2. VITE_BASE_PATH in .env  → lets you change the target repo per build
 *   3. Automatic default:      → '/My-Portfolio/' (this repository)
 *
 * '/' can be forced for hosts that serve from the domain root (Netlify, VPS)
 * by setting VITE_BASE_PATH=/ in a local .env.local. Local `npm run dev`
 * always works either way — Vite rewrites asset URLs during dev.
 */
function resolveBasePath(): string {
  const fromEnv = process.env.VITE_BASE_PATH;
  if (fromEnv !== undefined && fromEnv !== '') {
    // Normalize: ensure exactly one leading and trailing slash (or '/' alone).
    const trimmed = fromEnv.trim();
    if (trimmed === '/') return '/';
    return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
  }
  return '/My-Portfolio/';
}

const vitestConfig = defineTestConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: [...configDefaults.exclude, 'node_modules/**'],
    css: false,
  },
});

export default mergeConfig(
  defineConfig({
    plugins: [react(), tailwindcss()],
    base: resolveBasePath(),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 600,
    },
  }),
  vitestConfig,
);
