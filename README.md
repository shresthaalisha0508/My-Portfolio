# Alisha Shrestha — Registered Nurse Portfolio

A production-quality portfolio website for **Alisha Shrestha, Registered Nurse**, built with **React 19 + TypeScript + Vite + Tailwind CSS v4**. Fully static — no backend — and ready to deploy to **GitHub Pages**.

> Testimonials shown on the site are clearly-flagged samples — replace them in `src/data/testimonials.ts` before sharing the site with employers.

> This repository is also a **React learning project**: the code is written to be read. See the [React Learning Map](#react-learning-map) below and [docs/react-learning.md](docs/react-learning.md).

---

## Tech stack (and why each dependency exists)

| Dependency | Why it's here |
|---|---|
| **react / react-dom** | The UI library itself. |
| **typescript** | Compile-time safety: the data shapes in `src/data` are validated against `src/types`. |
| **vite** | Dev server + production bundler. Chosen for speed and first-class TS/React support. |
| **tailwindcss v4** | Utility styling with design tokens declared in CSS (`@theme`) — no config file needed in v4. |
| **framer-motion** | Entrance/reveal animations, `AnimatePresence` for the mobile menu, `useReducedMotion` for accessibility. |
| **lucide-react** | Tree-shakeable icons — only the icons actually imported are bundled. |
| **vitest + @testing-library/react** | Behavioural tests that query the DOM the way users do. |
| **eslint + prettier** | Consistency and mistake-catching. |

Deliberately **absent**: React Router (single-page anchor navigation is enough), Redux/Zustand (no global state exists), axios (no API), form libraries (one small form doesn't justify one).

## Project architecture

```
src/
├── app/            App shell + composition        (App.tsx)
├── assets/images/  Put your portrait here
├── components/
│   ├── layout/     Navbar, Footer (structural)
│   └── ui/         Button, Card, Badge, Container, SectionHeading, Icon,
│                    AnimatedSection, SkillPill (reusable primitives)
├── sections/       Hero / About / Expertise / Experience / Certifications /
│                    Philosophy / Testimonials / Journey / Contact
├── data/           ALL content lives here (typed)
├── hooks/          useScrolled, useMediaQuery, useActiveSection
├── lib/            cn(), motion variants, form validation (pure functions)
├── types/          Shared TypeScript interfaces
└── styles/         global.css — Tailwind v4 @theme design tokens
```

The core rule: **UI never hardcodes content.** Every section imports typed data from `src/data/*` and maps over it. Rename "Alisha Shrestha" in `src/data/profile.ts` and the whole site — title tag aside — updates.

## How React is being used

- **Function components + typed props** everywhere (`src/components/ui/*`).
- **Data-driven rendering**: `expertiseAreas.map(...)`, `experiences.map(...)`, `testimonials.map(...)` — see `src/sections/Expertise/Expertise.tsx` for the clearest example.
- **State kept local**: the only `useState` in the app lives in the Navbar (menu open), the Contact form (data/errors/touched) and the Portrait (image fallback). No global state library — none is needed.
- **Custom hooks** encapsulate *behaviour with lifecycle*: `useScrolled` (scroll listener + rAF throttle + cleanup), `useActiveSection` (IntersectionObserver), `useMediaQuery` (matchMedia). Each exists because two-plus lifecycle concerns would otherwise leak into components.
- **Composition**: `<SectionHeading eyebrow="…" title="…" />`, `<Card hover>` and `<Button as="a" href>` are composable primitives used by every section.

## Tailwind structure (v4)

`src/styles/global.css` declares the design system with Tailwind v4's `@theme`:

- Colors: `teal` (brand), `sage` (secondary), `coral` (accent), `cream` (surfaces), `charcoal` (text)
- Fonts: `font-display` (Plus Jakarta Sans), `font-sans` (Inter)
- Shadows: `shadow-card`, `shadow-card-hover`
- Easing: `ease-out-quart`

Change `--color-teal-700` in that one file and the whole site re-themes. Shared classes (`.section-pad`, `.link-underline`) live in `@layer components` — used where a repeated utility string would be unreadable.

## Animations

Variants live in `src/lib/motion.ts` (`fadeUp`, `stagger`, shared `EASE`). Rules of thumb used throughout:

- Animate **entrances only** — `whileInView` + `once: true` — never infinite loops.
- `useReducedMotion()` (and a CSS `prefers-reduced-motion` guard) disables everything for users who ask for it.
- Durations 0.2–0.6s, single soft easing curve.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the test suite once (Vitest) |
| `npm run test:watch` | Watch mode |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run assets:generate` | Create the placeholder CV PDF (also runs automatically pre-build) |

## Customising the portfolio

### Change profile information
Everything is in **`src/data/`**: `profile.ts` (name, contacts, stats, hero copy), `experience.ts` (roles + locations), `expertise.ts`, `certifications.ts` (education, licence **and** `clinicalPostings`), `testimonials.ts` (currently samples), `journey.ts`. TypeScript will flag any missing field the moment you edit.

### Replace images
1. Drop your portrait at `public/images/alisha-portrait.jpg` (the path in `profile.portraitUrl` is relative to the site root).
2. Until an image exists, the hero shows a designed monogram fallback (see `src/sections/Hero/Portrait.tsx`) — the site never renders a broken image.
3. Replace `public/cv/Alisha-Shrestha-CV.pdf` with the real CV (or change `profile.cvUrl`).

### Change colors
Edit the token block in `src/styles/global.css`. All utilities (`bg-teal-700`, `text-charcoal-600`…) are generated from those variables.

### Contact form
Purely client-side: validation runs in `src/lib/validation.ts` (pure, unit-testable), and a valid submission opens the visitor's email client via `mailto:` with everything prefilled. Change the destination by editing `profile.email`.

---

## Deployment (GitHub Pages)

The site builds with base path `/Alisha-Portfolio/` by default (see `resolveBasePath()` in `vite.config.ts`). To override:

```bash
# build for a different repo name
VITE_BASE_PATH=/other-repo/ npm run build

# build for domain-root hosting (Netlify, custom domain…)
VITE_BASE_PATH=/ npm run build
```

`.env.example` documents this; local dev works regardless.

### One-time setup

1. Push this repository to GitHub (branch `main`).
2. On GitHub: **Settings → Pages → Build and deployment → Source: “GitHub Actions”**.
3. Push again (or re-run the workflow) — `.github/workflows/deploy.yml` will:
   - install, lint, test and build the site,
   - upload `dist/` with `actions/upload-pages-artifact`,
   - publish it with `actions/deploy-pages`.
4. The live URL appears under **Settings → Pages** and in the workflow summary — for this repo: `https://rishav8088.github.io/Alisha-Portfolio/`.

`public/.nojekyll` is committed so GitHub Pages serves Vite's assets as-is. `robots.txt` and `sitemap.xml` are included; update the domain in them (and the canonical/OG URLs in `index.html`) if the site moves.

---

## Testing

13 behavioural tests across 4 files:

- **Navbar** — brand/nav rendering, mobile menu open/close, Escape/click-away behaviour via ARIA state.
- **Experience** — every role from the data file renders; timeline is a semantic list with one item per entry.
- **ContactForm** — empty submit announces issues, invalid email flagged accessibly, invalid data never "navigates", valid data opens a prefilled `mailto:`.
- **UI** — expertise cards match data length (the data-driven-rendering guard rail), SectionHeading renders all parts.

Run them: `npm test`

---

## React Learning Map

| Concept | Where to look |
|---|---|
| **Components** | every file in `src/components/ui/`, `src/sections/*` |
| **Props & typing them** | `Button.tsx` (discriminated union), `SectionHeading.tsx`, `ExpertiseCard.tsx` |
| **State (`useState`)** | `Navbar.tsx` (menu), `ContactForm.tsx` (form), `Portrait.tsx` (fallback) |
| **`useEffect` + cleanup** | `src/hooks/useScrolled.ts`, `Navbar.tsx` (scroll lock, Escape key) |
| **Custom hooks** | `src/hooks/` — and the *reason* each one exists |
| **Refs (`useRef`)** | rAF handle in `useScrolled.ts` (mutable value that survives re-renders) |
| **Lists & keys** | `Expertise.tsx`, `Experience.tsx`, `Testimonials.tsx` |
| **Conditional rendering** | `Portrait.tsx` (image vs fallback), `Certifications.tsx` (degree vs cert icon), `Contact.tsx` (link vs div) |
| **Forms** | `ContactForm.tsx` + `src/lib/validation.ts` |
| **TypeScript** | `src/types/index.ts`, `Button.tsx` discriminated union, data files |
| **Animations** | `src/lib/motion.ts`, `AnimatedSection.tsx`, `Hero.tsx` |
| **Responsive UI** | every section — mobile-first Tailwind (`sm:`/`md:`/`lg:`), `Journey.tsx` (scroll-snap → vertical) |
| **Accessibility** | skip link in `App.tsx`, ARIA in `Navbar.tsx`, live regions in `ContactForm.tsx`, focus styles in `global.css` |
| **Composition** | `app/App.tsx` (the whole page), `Container`/`SectionHeading`/`Card` usage |

**Suggested reading order:** `main.tsx` → `app/App.tsx` → `data/expertise.ts` → `sections/Expertise/*` → `components/ui/Button.tsx` → `hooks/useScrolled.ts` → `sections/Contact/ContactForm.tsx`.

Then read [docs/react-learning.md](docs/react-learning.md) for the concept-by-concept walkthrough (with Flutter comparisons).
