<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Dev server

Do not run `next dev` / `npm run dev` (or start any dev server) as part of a task. The user runs and tests the app manually after each task.

# Code conventions

See `.claude/CLAUDE.md` for the tech stack and critical rules, and `.claude/rules/` for detailed topic guides (TypeScript, components, styling, animation, lint/build).
