# Animation

The only animation library is `motion` (`motion/react`). The established pattern is the **imperative `useAnimate()` timeline API** — `const [scope, animate] = useAnimate()` plus `animate([...])` sequences with `stagger()` — not the declarative `<motion.div>` / `<AnimatePresence>` API. Keep new animation code consistent with that (see `Hero.tsx`, `ScrollRevealSection.tsx`).

- Reuse the one shared easing curve: CSS `var(--ease-out)` (`cubic-bezier(0.16, 1, 0.3, 1)`, defined once in `globals.css`) and its JS equivalent `const easeOut = [0.16, 1, 0.3, 1] as const`. Don't introduce a different easing curve without reason.
- Always gate animation on `useReducedMotion()` (JS) / `prefers-reduced-motion` (CSS) — every existing animated component does this, including the hero video autoplay and the market ticker.
- For new scroll-triggered sections, extend `ScrollRevealSection`'s `variant` system (add a case to `variantConfig` with the right selectors) rather than writing a new ad hoc `useInView`/`animate()` implementation. `LandingPage.tsx` sections all consume this wrapper and never contain animation logic directly.

## Critical: don't rename these CSS classes without checking `Hero.tsx` / `ScrollRevealSection.tsx`

`Hero.tsx` and `ScrollRevealSection.tsx` call Motion's `animate()` with **literal CSS class-name strings as selectors** — not refs:

- `Hero.tsx`: `.hero-line-inner`, `.hero-support`
- `ScrollRevealSection.tsx`: `.section-reveal-line-inner`, `.section-reveal-support`, `.section-reveal-panel`, and per-`variant` item selectors (`.benefit-panel`, `.fee-card`, `.fees-note`, `.platform-feature`, `.device-slot`, `.device-glow`, `.platform-cta`, `.trust-card`, `.learning-row`, `.learn-hub-link`, `.join-cta`)

These same classes also carry the pre-JS hidden state in `globals.css` (`@layer components` inside `@media (prefers-reduced-motion: no-preference)`, expressed as `@apply opacity-0 ...`) — that reduced-motion hidden state is the *only* CSS these classes carry, so there's no other visual styling left to hint at their purpose. If you rename, remove, or restyle these classes in a way that drops the class name, the reveal animation stops firing — silently, with no type error and no visual flash, just static content that never becomes visible (or is invisible forever). If you need to change one of these classes, update the matching selector string in `Hero.tsx`/`ScrollRevealSection.tsx` in the same change.
