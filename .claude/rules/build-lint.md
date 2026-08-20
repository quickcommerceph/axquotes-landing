# Lint, Format, Build

- ESLint flat config (`eslint.config.mjs`): `eslint-config-next`'s `core-web-vitals` + `typescript` presets, no custom rules. Run via `npm run lint` (no `--fix`, no path args).
- No Prettier is configured. Match existing formatting by eye: 2-space indent, single quotes, semicolons, trailing commas.
- `npm run build` runs `next build --webpack` (Turbopack is explicitly not used) followed by `node scripts/inject-design-contract.mjs`. Don't change the build script without a clear reason — the webpack flag and the post-build script are both intentional.
- Never run `next dev` / `npm run dev` or any dev server as part of a task — the user runs and tests manually (also stated in `AGENTS.md`).
