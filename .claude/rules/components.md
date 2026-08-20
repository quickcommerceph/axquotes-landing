# Components & Files

- Everything lives flat in `src/components/axquotes/` — no `ui/`, `sections/`, or per-component folders. Follow this structure for new components rather than introducing nesting.
- Component files are PascalCase (`Hero.tsx`); pure data/type modules are camelCase (`data.ts`, `countries.ts`, `navigation.ts`).
- Use named exports (`export function Thing()`). `SpecularButton.tsx` is the sole default export in the codebase — don't take it as the pattern to follow elsewhere.
- It's fine to group multiple related components in one file when they share concerns, as `Interactive.tsx` does (header, ticker, market explorer, sticky CTA, footer disclosure, animated stat) — don't split a file into many just for the sake of one-component-per-file.
- Put `'use client'` at the very top of files that need interactivity or animation; leave server components (`layout.tsx`, `page.tsx`, `LandingPage.tsx`, `auth/page.tsx`, `[...slug]/page.tsx`) without it.
- `lucide-react` icons are always rendered with `aria-hidden="true"`.
- Match the accessibility patterns already established: roving `tabIndex` + `aria-selected`/`aria-controls` for tab-like UI (see `SignUpForm.tsx`, `MarketExplorer` in `Interactive.tsx`), arrow-key/Home/End keyboard handling on tab groups, the skip-link in `layout.tsx`, focus containment + Escape handling on the mobile nav panel, and `useReducedMotion()` gating on every animation (see [animation.md](animation.md)). New interactive components should meet the same bar (visible 3px blue focus outline per `DESIGN.md`, keyboard operability, WCAG AA contrast).
