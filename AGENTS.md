<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# open-daycare

Daycare app. Next.js 16.3.2 (App Router only, `app/`) + React 19 + Tailwind CSS v4 + TypeScript strict. Fresh scaffold: no backend or tests yet.

## Commands

- `npm run dev` / `build` / `start` / `lint` (eslint). No test framework installed.
- Typecheck has no npm script — run `npx tsc --noEmit`.

## Framework gotchas

- Tailwind v4 is configured in CSS (`@theme inline` in `app/globals.css`); there is no `tailwind.config` file.
- Generated route types are used directly, e.g. layouts take `LayoutProps<"/">`, not inline `{ children }` props.
- Path alias: `@/*` maps to the repo root.

## Design reference

- `references/pantallas/*.dc.html` are standalone HTML mockups of every screen (login, feed, niños, publicaciones, avisos…; UI text is Spanish). Treat them as the source of truth for UI/features; rendered screenshots live in `references/screenshots/`.
- Never edit `references/pantallas/support.js` — it is a generated runtime bundle.

## Conventions

- Playwright MCP artifacts (screenshots, snapshots, logs) must be saved inside `.playwright-mcp/`.
- Use the Context7 MCP for current framework/library docs instead of relying on training data.
- `CLAUDE.md` just imports this file (`@AGENTS.md`) — keep AGENTS.md the single source of agent instructions.

## Spec Driven Development
- /spec Usaremos esta habilidad para crear las especificaciones.
- /spec-impl Usaremos esta habilidad para crear la implementación de las especificaciones
