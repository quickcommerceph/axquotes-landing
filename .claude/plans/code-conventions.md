# Code conventions — axquotes-landing

Reference doc for agents working in this codebase. Covers TypeScript, component, styling, and animation conventions that aren't captured by the visual design system or product brief.

## Doc map

- `DESIGN.md` — visual design system: colors, typography scale, spacing, radii, shadows, per-component visual specs. Read before styling anything.
- `PRODUCT.md` — brand commitments, positioning, capabilities/constraints (marketing site only, no auth/trading backend, approved claims).
- This file — code-level conventions: TypeScript, component structure, styling approach, animation system.
- `.claude/plans/migrate-old-css-implementation-imperative-token.md` — CSS→Tailwind migration plan. **Not yet executed. Reference only — don't start it unless explicitly asked.**

`DESIGN.md` and `PRODUCT.md` are generated/maintained by the "impeccable" design tool (see `.impeccable/design.json`) — don't hand-edit them; update `PRODUCT.md`/`DESIGN.md`-adjacent facts here instead, or ask the user.

## Stack

Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4 (CSS-first config via `@theme` in `src/app/globals.css` — there is no `tailwind.config.*`), `motion` v13 imported as `motion/react` (this is Framer Motion's renamed package — never install or import `framer-motion`), `lucide-react` for icons, `ogl` for the one WebGL component (`SpecularButton.tsx`).

No form library, no schema validation library, no UI kit (shadcn/Radix/MUI), no state management library. Forms use raw `useState`. Don't introduce a new dependency for something the existing patterns already handle — check with the user first if you think one is genuinely needed.

## TypeScript

- Use `type`, not `interface`, for props and data shapes (`type Instrument`, `type ScrollRevealSectionProps`, etc.). The one existing exception is `SpecularButtonProps` in `SpecularButton.tsx`, which uses `interface` specifically because it `extends` another type — that's a reasonable reason to deviate, not a precedent to default to `interface`.
- Name props types `<ComponentName>Props`, declared immediately above the component. Keep them un-exported unless another file actually imports the type (e.g. `SpecularButtonVariant` is exported because other files build variant props).

## Components & files

- Everything lives flat in `src/components/axquotes/` — no `ui/`, `sections/`, or per-component folders. Follow this structure for new components rather than introducing nesting.
- Component files are PascalCase (`Hero.tsx`); pure data/type modules are camelCase (`data.ts`, `countries.ts`).
- Use named exports (`export function Thing()`). `SpecularButton.tsx` is the sole default export in the codebase — don't take it as the pattern to follow elsewhere.
- It's fine to group multiple related components in one file when they share concerns, as `Interactive.tsx` does (header, ticker, market explorer, sticky CTA, footer disclosure, animated stat) — don't split a file into many just for the sake of one-component-per-file.
- Put `'use client'` at the very top of files that need interactivity or animation; leave server components (`layout.tsx`, `page.tsx`, `LandingPage.tsx`, `auth/page.tsx`) without it.
- `lucide-react` icons are always rendered with `aria-hidden="true"`.
- Match the accessibility patterns already established: roving `tabIndex` + `aria-selected`/`aria-controls` for tab-like UI (see `SignUpForm.tsx`, `MarketExplorer` in `Interactive.tsx`), arrow-key/Home/End keyboard handling on tab groups, the skip-link in `layout.tsx`, focus containment + Escape handling on the mobile nav panel, and `useReducedMotion()` gating on every animation. New interactive components should meet the same bar (visible 3px blue focus outline per `DESIGN.md`, keyboard operability, WCAG AA contrast).

## Styling — current transitional state

Almost the entire UI is styled with hand-written CSS in `src/app/globals.css` (BEM-ish class names like `.hero`, `.market-panel`, `.signup-input`), applied via `className` strings, even though Tailwind v4 is installed and configured. The single exception is `SpecularButton.tsx`, written entirely in Tailwind utility/arbitrary-value classes — it's the explicit reference pattern for what new Tailwind-authored code should look like, per `.claude/plans/migrate-old-css-implementation-imperative-token.md`.

That migration plan describes the target end state (all components rewritten to Tailwind utilities, `globals.css` shrunk to tokens + a short documented-exceptions list) but **has not been executed** — `globals.css` still has its full ~670 lines. Don't start migrating a section proactively; it's a large, regression-prone, phased effort the user hasn't asked for yet.

Day to day: match whichever pattern already dominates the file you're editing. If you're touching `LandingPage.tsx`/`Interactive.tsx`/`Hero.tsx`/`SignUpForm.tsx`, use the existing semantic CSS classes in `globals.css` (add new rules there following the existing BEM-ish naming and the `--ease-out` / color custom-property tokens). If you're touching `SpecularButton.tsx` or writing a genuinely new, isolated component, Tailwind utilities are appropriate.

## Animation

The only animation library is `motion` (`motion/react`). The established pattern is the **imperative `useAnimate()` timeline API** — `const [scope, animate] = useAnimate()` plus `animate([...])` sequences with `stagger()` — not the declarative `<motion.div>` / `<AnimatePresence>` API. Keep new animation code consistent with that (see `Hero.tsx`, `ScrollRevealSection.tsx`).

- Reuse the one shared easing curve: CSS `var(--ease-out)` (`cubic-bezier(0.16, 1, 0.3, 1)`, defined once in `globals.css`) and its JS equivalent `const easeOut = [0.16, 1, 0.3, 1] as const`. Don't introduce a different easing curve without reason.
- Always gate animation on `useReducedMotion()` (JS) / `prefers-reduced-motion` (CSS) — every existing animated component does this, including the hero video autoplay and the market ticker.
- For new scroll-triggered sections, extend `ScrollRevealSection`'s `variant` system (add a case to `variantConfig` with the right selectors) rather than writing a new ad hoc `useInView`/`animate()` implementation. `LandingPage.tsx` sections all consume this wrapper and never contain animation logic directly.

### Critical: don't rename these CSS classes without checking `Hero.tsx` / `ScrollRevealSection.tsx`

`Hero.tsx` and `ScrollRevealSection.tsx` call Motion's `animate()` with **literal CSS class-name strings as selectors** — not refs:

- `Hero.tsx`: `.hero-line-inner`, `.hero-support`
- `ScrollRevealSection.tsx`: `.section-reveal-line-inner`, `.section-reveal-support`, `.section-reveal-panel`, and per-`variant` item selectors (`.benefit-panel`, `.fee-card`, `.trust-item`, `.trust-card`, `.platform-feature`, `.learning-row`)

These same classes also carry the pre-JS hidden state in `globals.css` (`@media (prefers-reduced-motion: no-preference)`), so elements start invisible before `animate()` sweeps them in. If you rename, remove, or restyle these classes in a way that drops the class name, the reveal animation stops firing — silently, with no type error and no visual flash, just static content that never becomes visible (or is invisible forever). If you need to change one of these classes, update the matching selector string in `Hero.tsx`/`ScrollRevealSection.tsx` in the same change.

## Lint, format, build

- ESLint flat config (`eslint.config.mjs`): `eslint-config-next`'s `core-web-vitals` + `typescript` presets, no custom rules. Run via `npm run lint` (no `--fix`, no path args).
- No Prettier is configured. Match existing formatting by eye: 2-space indent, single quotes, semicolons, trailing commas.
- `npm run build` runs `next build --webpack` (Turbopack is explicitly not used) followed by `node scripts/inject-design-contract.mjs`. Don't change the build script without a clear reason — the webpack flag and the post-build script are both intentional.
- Never run `next dev` / `npm run dev` or any dev server as part of a task — the user runs and tests manually (also stated in `AGENTS.md`).
