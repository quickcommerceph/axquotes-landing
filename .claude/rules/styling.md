# Styling

Tailwind utility classes (including arbitrary values and `data-[...]`/`aria-*` variants) are the dominant styling approach across every component — `SpecularButton.tsx` is representative of the pattern to follow, not an outlier.

`src/app/globals.css` is ~190 lines: `@import 'tailwindcss'`, an `@theme` block (colors as `--color-*`, two custom breakpoints `--breakpoint-nav` / `--breakpoint-mobile`, fonts), a legacy `:root` block still holding bare-named duplicates of the same colors plus `--font-*` / `--max-width` / `--site-chrome-height` / `--section-space*` / `--ease-out` (used by raw `var()` references), `@layer base` resets, and `@layer components` for a small set of `@apply`-based structural wrappers and animation hooks.

Remaining hand-written (non-Tailwind-directive) CSS is small and enumerable: base element resets (`*`, `html`, `body`, `a`, `button`, `img`, headings — inside `@layer base`), the global `:focus-visible` ring, `.benefit-visual::before` (`attr(data-mark)` content — documented exception, `attr()` can't be expressed as a Tailwind arbitrary value), the two bare `@keyframes` (`ticker-move`, `market-panel-enter` — not moved into `@theme`'s animation system), and the `prefers-reduced-motion: reduce` kill-switch.

Day to day: default to Tailwind utility classes directly in `className`, following `Hero.tsx` / `Interactive.tsx` / `LandingPage.tsx` / `SignUpForm.tsx` / `SpecularButton.tsx` as the pattern. The remaining semantic class names in `globals.css`/JSX (`.site-shell`, `.section`, and the animation-hook classes documented in [animation.md](animation.md)) are not a general-purpose styling system to extend — they're either thin `@apply` structural wrappers or pure Motion-selector hooks with no styling role of their own.

Read `DESIGN.md` (colors, typography scale, spacing, radii, shadows, per-component visual specs) before styling anything new.
