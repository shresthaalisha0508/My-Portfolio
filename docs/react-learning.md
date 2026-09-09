# React concepts used in this project

Each section points at real files in this repo. Read them side by side.
Flutter comparisons appear where they genuinely help.

---

## Components

A React component is a function that returns JSX (an HTML-like syntax that
compiles to `React.createElement` calls). Unlike a Flutter widget class, a
function component is just a function — but React calls it *whenever its
inputs (props/state) change*, so it must be pure: same props → same output,
no side effects during render.

- Smallest examples: `src/components/ui/Badge.tsx`, `Container.tsx`
- Composed example: `src/sections/Expertise/ExpertiseCard.tsx`

```tsx
function Badge({ tone = 'teal', children }: BadgeProps) {
  return <span className={...}>{children}</span>;
}
```

*Flutter:* a `StatelessWidget` — `build(context)` ≈ the function body, and the
class fields ≈ props.

## Props

Props are a component's inputs, declared as one destructured parameter and —
in this project — always typed with an interface. Two advanced props patterns
appear here:

1. **Discriminated union** (`src/components/ui/Button.tsx`): the `as` field
   narrows which other props are legal. `as="a"` requires `href`;
   `as="button"` allows `type`/`onClick`. TypeScript rejects the wrong mix at
   compile time.
2. **Model objects** (`ExpertiseCard.tsx`): the card takes a whole
   `Expertise` object, so adding a field to the type + data flows through
   without touching the component's props list.

## State

`useState` declares a value that survives re-renders and triggers a re-render
when changed:

```tsx
const [menuOpen, setMenuOpen] = useState(false);
```

Rules of thumb demonstrated in the project:

- Keep state **as local as possible** (see the "no global state" note in the
  README) — `Portrait.tsx` needs one boolean and owns exactly that.
- Store **one object per concern**: `ContactForm.tsx` keeps `form`, `errors`,
  `touched` in three separate `useState` calls rather than one nested blob —
  simpler updates, simpler tests.
- Derive, don't duplicate: active nav link comes from `useActiveSection`, not
  from state copied out of it.

*Flutter:* `setState` in a `StatefulWidget` — but instead of mutating fields
and calling `setState()`, you call the setter with the **new** value
(immutable updates): `setMenuOpen(o => !o)`.

## useEffect

Runs *after* render to sync your component with the outside world — timers,
listeners, observers. Every effect that subscribes must unsubscribe in its
cleanup function, or you leak.

- `src/hooks/useScrolled.ts` — adds a scroll listener, removes it on unmount,
  throttles with `requestAnimationFrame`.
- `src/components/layout/Navbar.tsx` — locks body scroll while the mobile
  menu is open and restores the previous value in cleanup.
- The dependency array (`[threshold]`, `[sectionKey]`) tells React *when* to
  re-run; the linter (`react-hooks/exhaustive-deps`) enforces honesty.

*Flutter:* `initState`/`didUpdateWidget`/`dispose` rolled into one function
plus an array.

## Custom hooks

A custom hook is any function starting with `use` that calls other hooks. It
earns its place when it encapsulates **behaviour with lifecycle**, not just
state. All three in `src/hooks/` follow the same recipe:

1. `useState` for the value,
2. `useEffect` to subscribe to a browser API,
3. cleanup to unsubscribe.

`useActiveSection` additionally shows the `sectionKey` pattern: normalize
array inputs into a primitive so the effect only re-runs when the *set*
actually changes.

## map() and keys

Render lists by mapping data to elements, giving each element a stable `key`:

```tsx
{expertiseAreas.map((area) => (
  <ExpertiseCard key={area.title} expertise={area} />
))}
```

Keys let React match items across re-renders (like `key:` in a Flutter
`ListView` builder) — without them, reordering corrupts state and animations.
Use an id, not the array index, whenever items can reorder. Every `.map` in
`src/sections/` demonstrates this; the corresponding tests prove adding a
data entry adds a card.

## Conditional rendering

Three patterns used in the project:

```tsx
{failed && <Fallback />}          // logical AND — render or nothing
{showFallback ? <A/> : <B/>}      // ternary — either/or (Portrait.tsx)
{kind === 'degree' ? <Grad/> : <Award/>}  // data-driven switch (Certifications)
```

There is no if/else around `return` for tiny branches — JSX stays linear.
`AnimatedSection` shows the *early-return* pattern for a bigger branch
(reduced-motion users get a plain `<div>`).

## Forms (controlled inputs)

In `ContactForm.tsx` every input is **controlled**: its `value` comes from
state and `onChange` writes back. React state is the single source of truth
(a Flutter `TextEditingController` is the uncontrolled analogue). Validation
lives in `src/lib/validation.ts` as pure functions — trivially unit-testable,
no DOM needed. Errors are wired for accessibility: `aria-invalid`,
`aria-describedby`, and an `aria-live` summary region.

## TypeScript specifics

- `src/types/index.ts` — one vocabulary of content shapes; data files are
  annotated (`const experiences: Experience[]`), so a missing field is a
  compile error, not a blank card in production.
- `strict: true`, `noUnusedLocals`, `verbatimModuleSyntax` in
  `tsconfig.app.json` — the compiler catches dead code and accidental
  value-vs-type import mixing.
- `type` imports (`import type { LucideIcon }`) tell the bundler the import
  vanishes at runtime.

## Animations with Framer Motion

Motion components accept `variants` — named animation states. Parents
declare `stagger` and children inherit `fadeUp`, coordinating timing through
one prop (`src/lib/motion.ts`, `AnimatedSection.tsx`, `Hero.tsx`).

- `initial="hidden" animate="visible"` — play on mount (hero).
- `whileInView` + `viewport={{ once: true }}` — play once when scrolled into
  view (every other section).
- `useReducedMotion()` — swap the animation for static output. Non-negotiable
  for WCAG.

*Flutter:* implicit animations (`AnimatedOpacity`) are the closest analogue;
variants are like declarative `TweenSequence` definitions.

## Responsive UI

Tailwind breakpoints are mobile-first: an un-prefixed class applies
everywhere; `sm:`/`md:`/`lg:` variants upgrade it on larger screens:

```tsx
<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
```

`Journey.tsx` shows the CSS-only layout switch (horizontal scroll-snap strip
→ vertical timeline) — no JS media queries for pure styling. `useMediaQuery`
exists for the rare case where the *structure* must change, not just styles.

## Accessibility

- Semantic elements first: `header`, `nav`, `main`, `footer`, `section`,
  `ol/ul/li`, `dl` for stats, `blockquote/figcaption` for quotes — see any
  section file.
- One `h1` (hero), one `h2` per section, no skipped levels.
- Landmarks/labels: every `<nav>` has `aria-label`; lists have names where
  queries need them (`Experience.tsx`).
- Forms: real `<label htmlFor>` pairs, `aria-invalid`, `aria-describedby`,
  `aria-live` summary (`ContactForm.tsx`).
- Keyboard: skip link (`App.tsx`), Escape closes the mobile menu, visible
  `:focus-visible` rings (`global.css`).
- Reduced motion: CSS guard in `global.css` **and** JS guard in
  `AnimatedSection`/`Hero`.

---

### Suggested exercises

1. Add a seventh expertise area in `src/data/expertise.ts` — watch the grid
   and the tests update with zero JSX changes.
2. Change `--color-teal-700` in `global.css` to your own brand colour and
   check contrast with a DevTools contrast checker.
3. Add `useEffect`-based dark mode: a toggle that flips a `dark` class on
   `<html>` and persists to `localStorage`.
