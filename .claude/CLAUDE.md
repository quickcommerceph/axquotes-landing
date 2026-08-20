# axquotes-landing

Next.js App Router marketing/landing site for AXQuotes — no auth or trading backend, all client-side interactivity and animation.

## Tech Stack

Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4 (CSS-first config via `@theme` in `src/app/globals.css` — there is no `tailwind.config.*`), `motion` v13 imported as `motion/react` (Framer Motion's renamed package — never install or import `framer-motion`), `lucide-react` for icons, `ogl` for the one WebGL component (`SpecularButton.tsx`).

No form library, no schema validation library, no UI kit (shadcn/Radix/MUI), no state management library. Forms use raw `useState`. Don't introduce a new dependency for something the existing patterns already handle — check with the user first if you think one is genuinely needed.

## Doc Map

- `DESIGN.md` — visual design system: colors, typography scale, spacing, radii, shadows, per-component visual specs. Read before styling anything.
- `PRODUCT.md` — brand commitments, positioning, capabilities/constraints (marketing site only, no auth/trading backend, approved claims).
- `.claude/rules/` — detailed topic guides (below). This file is the compact entry point; open the relevant rule file for full detail before touching that area.

`DESIGN.md` and `PRODUCT.md` are generated/maintained by the "impeccable" design tool (see `.impeccable/design.json`) — don't hand-edit them; update `PRODUCT.md`/`DESIGN.md`-adjacent facts in `.claude/rules/` instead, or ask the user.

## Critical Rules

- **Use `type`, not `interface`**, for props/data shapes — see [typescript.md](rules/typescript.md) for the one deliberate exception
- **Components stay flat** in `src/components/axquotes/` — no `ui/`, `sections/`, or per-component folders — see [components.md](rules/components.md)
- **Tailwind utility classes are the default** for all new styling — see [styling.md](rules/styling.md)
- **Animation uses the imperative `useAnimate()` timeline API**, not `<motion.div>` — see [animation.md](rules/animation.md)
- **Never rename `.hero-line-inner`, `.hero-support`, `.section-reveal-*`, or the `ScrollRevealSection` variant selectors** without updating the matching `animate()` call in the same change — silently breaks the reveal animation. Full list in [animation.md](rules/animation.md)
- **Always gate animation on `useReducedMotion()`** (JS) / `prefers-reduced-motion` (CSS)
- **Never run `next dev` / `npm run dev`** or any dev server as part of a task — the user runs and tests manually — see [build-lint.md](rules/build-lint.md)

## Rules Reference

| File | Covers |
|------|--------|
| [typescript.md](rules/typescript.md) | `type` vs `interface`, props-type naming |
| [components.md](rules/components.md) | File/component structure, exports, `'use client'`, accessibility patterns |
| [styling.md](rules/styling.md) | Tailwind-first styling, `globals.css` structure, documented hand-written exceptions |
| [animation.md](rules/animation.md) | `motion`/`useAnimate()` conventions, `ScrollRevealSection`, the class-selector coupling |
| [build-lint.md](rules/build-lint.md) | ESLint, formatting, build script, dev-server rule |
