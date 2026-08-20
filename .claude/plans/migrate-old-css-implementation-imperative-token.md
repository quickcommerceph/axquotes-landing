# Migrate custom CSS to Tailwind CSS v4

## Context

The app currently has Tailwind v4 installed and wired up (`@import 'tailwindcss'` + a small `@theme` block in `src/app/globals.css`), but no component actually uses Tailwind utility classes. Every visual style in the app — layout, typography, color, spacing, responsive behavior, hover/focus states, pseudo-elements — is authored as ~622 lines of hand-written custom CSS in `globals.css`, referenced from components via BEM-ish class names (`.hero`, `.market-panel`, `.signup-input`, `.benefit-panel`, etc.). The goal is to migrate all of that styling to Tailwind utility classes directly in the components, so `globals.css` shrinks down to Tailwind's import, design tokens, and only the small number of things Tailwind categorically cannot express.

This is a full-surface rewrite touching all 6 components under `src/components/axquotes/`, `src/app/layout.tsx`, `src/app/auth/page.tsx`, and `src/app/globals.css` (~1,500 lines of components, 622 lines of CSS). Two Explore agents plus direct reads of every file confirmed: it's a clean 100% custom-CSS codebase today (the one pre-existing exception is `scroll-smooth` on `<html>` in `layout.tsx`), and there is one significant architectural coupling that shapes the whole plan — see below.

**Update (post-plan audit):** `SpecularButton.tsx` (WebGL specular-highlight button, `src/components/axquotes/SpecularButton.tsx`) was added after this plan was written and now renders every CTA in the app (`Hero.tsx`, `Interactive.tsx`, `LandingPage.tsx`, `SignUpForm.tsx`). It's already written entirely in Tailwind utility classes/arbitrary values (`text-[0.85rem]`, bracket `color-mix()`, etc.) — treat it as the reference pattern for arbitrary-value style elsewhere in this migration. It does not need migrating, but it does mean the old `.button`/`.button-coral` CSS system is now dead code — see the Foundation phase note below.

**Update 2026-08-20 (second post-plan audit):** More feature work landed since the plan was written, all still authored in the old custom-CSS system, so `globals.css` has grown from 622 to 720 lines and line-number references below have shifted — they're corrected throughout this revision. Three additions expand scope:

1. **Locale/region switcher** replaced the old `.lang-toggle` button in `SiteHeader` (`Interactive.tsx`): a desktop dropdown (`.locale-nav-item`, reusing `.nav-item`/`.nav-item-trigger`, plus new `.nav-dropdown[data-groups='multi']`/`.nav-dropdown-group` for multi-group dropdowns, and `.region-option`/`.region-option-label` for the radio-style options) and a mobile picker (`.mobile-locale-picker`, `.mobile-locale-label`, `.mobile-locale-options`, `.mobile-locale-code`). Desktop nav dropdowns also gained grouped mobile headings (`.mobile-nav-group`, `.mobile-nav-group-heading`) now that nav items can have multiple link groups. None of this needs a documented exception — it's all plain declarative styling driven by `data-*`/`aria-*` state, same as the rest of the chrome.
2. **New subpage system**: `src/components/axquotes/navigation.ts` (pure data module — nav sections/groups, footer groups, locale options, and generated `sitePages`/`findSitePage` for breadcrumbs — same "not touched" treatment as `data.ts`/`countries.ts`) and `src/app/[...slug]/page.tsx` (a catch-all route rendering real nav-destination pages: `SiteHeader` + breadcrumb + heading + placeholder note + optional overview link groups + `SiteFooter`). New CSS: `.subpage-stage`, `.subpage-breadcrumb`, `.subpage-heading`, `.subpage-note`, `.subpage-groups`, `.subpage-group`. Neither file was in the original "Files touched" list — added below.
3. **`TrustStrip` is no longer part of the Motion reveal system.** The `stats` variant was deleted from `ScrollRevealSection.tsx` entirely; `TrustStrip` (`LandingPage.tsx`) now renders as a plain, unanimated `<section>` instead of being wrapped in `ScrollRevealSection`. `.trust-item` is therefore **not** a Motion-animation-hook class anymore (its `prefers-reduced-motion` hidden-state rule was already removed from `globals.css`) — it migrates as an ordinary static utility class, no `@layer components` treatment needed. This is a simplification versus the original plan, not a new exception.

Also unrelated but incidental: `SiteFooter`'s link groups now source from `navigation.ts`'s `footerGroups` (real hrefs into the new subpage routes) instead of a hardcoded array with `href="#"` — same migration treatment, just real data now.

## The load-bearing constraint: Motion's class-selector animation targeting

`Hero.tsx` and `ScrollRevealSection.tsx` both use Motion's `animate()` with **literal CSS class-name strings** as selectors — not refs:

- `Hero.tsx`: `animate('.hero-line-inner', ...)`, `animate('.hero-support', ...)`
- `ScrollRevealSection.tsx`: `variantConfig` maps each section variant to selector strings — `.section-reveal-line-inner`, `.section-reveal-support`, `.section-reveal-panel`, and per-variant item selectors (`.benefit-panel`, `.fee-card`, `.platform-feature`, `.trust-card`, `.learning-row`) — note `.trust-item` is no longer among these, see the 2026-08-20 update above

These same class names also carry the **pre-JS hidden state** via `globals.css:142-171` (`@media (prefers-reduced-motion: no-preference)`), so the elements start invisible (clip-path/opacity/transform) before Motion's `animate()` sweeps them in. This is why there's no flash of final content before the reveal plays.

**Decision:** these class names stay as real, literal classes — Motion's selector strings and `ScrollRevealSection.tsx`/`Hero.tsx` are not touched. Their *visual* styling (the actual hidden-state clip-path/opacity/transform rules) is re-authored using Tailwind's `@layer components` + `@apply` in `globals.css`, which still counts as "utilizing Tailwind" for these hooks while keeping the selector contract intact. This is the safest option — refactoring the animation system to ref-based targeting is out of scope; it's an animation-logic change, not a styling change, and carries much higher regression risk for no visual benefit.

## Things that cannot be pure Tailwind utility classes (documented exceptions)

Kept as small companion CSS in `globals.css` (outside `@layer utilities`), everything else becomes component-level Tailwind classes:

1. **`@keyframes ticker-move`** and **`@keyframes market-panel-enter`** — declared in `@theme` (Tailwind v4 supports theme keyframes) and invoked via `animate-[name_duration_easing]` arbitrary-value utilities on `.ticker-track` / `.market-panel` / `.signup-panel`. The ticker's hover/focus pause (`animation-play-state: paused`) is expressed via `hover:[animation-play-state:paused] focus:[animation-play-state:paused]`.
2. **The reduced-motion hidden-state block** for the Motion animation-hook classes (`.hero-line-inner`, `.hero-support`, `.section-reveal-line-inner`, `.section-reveal-support`, `.section-reveal-panel`, `.benefit-panel`, `.fee-card`) — authored as `@layer components` + `@apply`, scoped under the existing `@media (prefers-reduced-motion: no-preference)` query.
3. **`.benefit-visual::before { content: attr(data-mark); ... }`** (globals.css:274) — dynamic `attr()` pseudo-content driven by `data-mark={value}` in `LandingPage.tsx`. Kept as a documented companion rule (the mechanism is technically expressible via Tailwind's `content-[attr(data-mark)]`, but the coordinated font/position/opacity stack riding on it isn't worth compressing into an arbitrary-value chain).
4. **Global `@media (prefers-reduced-motion: reduce)` kill-switch** (globals.css:617-621) — a universal-selector safety net (`*, *::before, *::after { animation-duration: 0.01ms !important; ... }` + the ticker `transform: none !important` override) with no Tailwind utility equivalent.
5. **`.footer-disclosure summary::-webkit-details-marker { display: none; }`** — vendor pseudo-element reset, one line, no Tailwind equivalent.
6. **`.mobile-navigation[data-open='true']` visibility-delay choreography** (staggered `transition-delay` differing between open/closed so `display:none`→visible swaps only after the fade starts) — kept as a documented companion rule for legibility rather than a very long arbitrary `transition` utility string.

Everything else (`[aria-expanded='true']`, `[data-visible='true']`, `[data-passed='true']`, `[aria-selected='true']`, `[aria-current='location']`, native `<details open>`, and all static non-`attr()` `::before`/`::after` decorative pseudo-elements like underline bars and gradient scrims) migrates cleanly to Tailwind's built-in/arbitrary state variants (`aria-expanded:`, `data-[visible=true]:`, `aria-selected:`, `open:`, `before:content-['']`, etc.) directly on the JSX elements.

## Theme tokens (`@theme` in globals.css)

Currently `@theme` only defines 3 colors + 2 fonts, while `:root` defines the full design system (13 colors, easing curve, max-width, section spacing, chrome height). Extend `@theme` with the full palette so components get idiomatic Tailwind utilities instead of `bg-[var(--x)]` arbitrary-value soup everywhere:

- All `:root` colors → `--color-*` theme tokens (`ink`, `ink-soft`, `paper`, `mist`, `mist-blue`, `line`, `muted`, `coral`, `coral-action`, `coral-dark`, `blue`, `blue-dark`, `indigo`, `green`)
- `--max-width: 1240px` → a named spacing/container token, so `site-shell`'s `width: min(calc(100% - 3rem), var(--max-width)); margin-inline: auto;` becomes a small reusable utility combo (`mx-auto w-[min(100%-3rem,var(--max-width))]`) or a `@layer components .site-shell` hook — same treatment as the animation-hook classes, since it's used ~10+ times identically.
- Custom breakpoints: the site's two breakpoints (`920px` nav breakpoint, `680px` mobile breakpoint) don't match Tailwind's defaults. Add them as named `@theme` breakpoints (e.g. `--breakpoint-nav: 920px`, `--breakpoint-mobile: 680px` — exact names TBD at implementation time) so components use clean `max-nav:` / `max-mobile:` variants instead of `max-[920px]:` arbitrary values everywhere.
- `--ease-out` cubic-bezier stays as a CSS var (already reusable inside arbitrary `ease-[var(--ease-out)]` / `duration-[220ms]` utilities and inside the companion keyframes/animate-hook CSS).

## Execution order (phased, verified in the dev server after each phase)

Each phase is migrated then checked live via `npm run dev` before moving to the next, since this is a highly detailed, pixel-specific design (fluid `clamp()` type, precise gradients/shadows, exact spacing) where regressions are easy to introduce silently.

1. **Foundation** — rewrite `globals.css`: full `@theme` token set, custom breakpoints, the `@layer components` animation-hook classes and `site-shell` hook, keyframes, and the documented exceptions list above. Nothing else changes yet (components still reference old + new class names side by side is not viable — so this phase lands together with phase 2 for the shared primitives: `.site-shell`, `.section`, `positive`/`negative`, `sr-only`, `skip-link`). Also **delete** 6 confirmed-dead rules rather than migrating them (a full dead-selector audit cross-checked every class in `globals.css` against every `className` across the components, including template-literal-built names — re-verified 2026-08-20, line numbers below reflect the current 720-line file): the 3 orphaned `.button` rules left over from the `SpecularButton` migration (`.join-copy .button` — line 486, `.signup-card .button-coral` — line 566, `.hero-actions .button` — line 656), plus 3 unrelated pre-existing leftovers (`.centered-intro` + its `p` rule — lines 264-265, `.join-note` — line 487, `.login-link` — line 620, from before the header "Log in" link became a `SpecularButton`). The global `prefers-reduced-motion: reduce` kill-switch (documented exception 4) is now at line 716.
2. **Chrome** — `layout.tsx` (skip link), `Interactive.tsx`'s `SiteHeader` (risk bar, sticky header, desktop/mobile nav, `data-open` mobile panel, the locale/region switcher — desktop dropdown + mobile picker, both sourced from `navigation.ts`'s `localeOptions`), `MobileStickyCta`, `FooterDisclosure`.
3. **Subpages** — `src/app/[...slug]/page.tsx` (breadcrumb, heading, placeholder note, optional overview link groups). Reuses `SiteHeader`/`SiteFooter` from phase 2/6, so do this once Chrome and `SiteFooter` are done. No Motion coupling, straightforward static markup — verify a leaf route (e.g. `/trading/instruments/crypto`) and a section-overview route (e.g. `/trading`) at all breakpoints, both driven by `navigation.ts`'s `sitePages`.
4. **Hero** — `Hero.tsx` (video/scrim layout, headline reveal hook classes, CTA buttons, assurance line).
5. **Markets** — `MarketTicker` + `MarketExplorer` in `Interactive.tsx` (ticker marquee/keyframe, tabs with `aria-selected`, instrument list), plus `TrustStrip` and `FeesSection` in `LandingPage.tsx`. Note: `TrustStrip` is now a plain static `<section>` (no longer wrapped in `ScrollRevealSection`, see the 2026-08-20 update) — migrate its visuals with ordinary utility classes, no reveal-hook CSS needed for it.
6. **Benefits + Platform** — `BenefitsSection` (dynamic tone classes, `data-mark` pseudo-content, photo/icon panels) and `PlatformSection` (device-phone mockup) in `LandingPage.tsx`.
7. **Trust + Learn + Join** — `TrustSection`, `LearnSection`, the inline join `ScrollRevealSection`, and `SiteFooter` in `LandingPage.tsx` (footer groups now come from `navigation.ts`'s `footerGroups` with real hrefs, not a hardcoded `href="#"` array).
8. **Auth / signup** — `SignUpForm.tsx` (tabs, fields, password checklist `data-passed`, captcha row, checkbox, status message) and `FakeCaptcha.tsx`, plus `auth/page.tsx`.
9. **Cleanup pass** — delete every now-unused rule from `globals.css`, confirm only the documented-exception CSS + `@theme` remain, full visual pass across all breakpoints (mobile ≤680px, tablet ≤920px, desktop) and `prefers-reduced-motion: reduce`.

## Files touched

- `src/app/globals.css` — rewritten down to Tailwind import, `@theme` tokens, `@layer components` hooks, keyframes, documented exceptions
- `src/app/layout.tsx`, `src/app/auth/page.tsx`, `src/app/[...slug]/page.tsx`
- `src/components/axquotes/Hero.tsx`, `Interactive.tsx`, `LandingPage.tsx`, `ScrollRevealSection.tsx` (className values only — no logic changes), `SignUpForm.tsx`, `FakeCaptcha.tsx`
- `data.ts` / `countries.ts` / `navigation.ts` are pure data modules, not touched
- `SpecularButton.tsx` — reference-only (already Tailwind, not edited)

## Verification

- `npm run dev`, walk every section at desktop, ~900px, and ~600px widths; compare against the current rendered site (baseline) for spacing, color, and typography fidelity after each phase.
- Confirm scroll-reveal animations still fire correctly (Hero headline sweep, each `ScrollRevealSection` variant, market/signup tab-switch re-entrance animation) — this is the main regression risk given the Motion class-selector coupling.
- Toggle OS-level "reduce motion" and confirm the instant/no-animation fallback still works (content visible immediately, ticker frozen).
- Exercise interactive states: mobile nav open/close + focus trap, header active-link highlighting on scroll, the desktop locale/region dropdown (hover intent, click, outside-click dismiss, multi-group vs single-group layout) and mobile locale picker active-state styling, market tabs keyboard nav, signup password checklist/show-password/captcha error/status message, footer disclosure accordion, mobile sticky CTA appearance threshold.
- Walk a section-overview subpage (e.g. `/trading`) and a leaf subpage (e.g. `/trading/instruments/crypto`) at all breakpoints — breadcrumb, heading, and overview link groups (present only on section-overview pages).
- `npm run lint` and `npm run build` at the end to catch type/lint issues introduced by the rewrite.
