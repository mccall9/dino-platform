# dino-platform

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)

Monorepo da **próxima stack** do [dino.blog](https://dinoclub.blog) / dinoclub.blog.

> **Produção hoje:** site estático + Supabase em outro repositório.  
> **Este repo:** Bun · Turborepo · Elysia · Eden Treaty · TanStack Start · Tailwind — base pronta para migrar o produto.

## Stack

| Layer | Tech |
|-------|------|
| Runtime / packages | [Bun](https://bun.sh) |
| Monorepo | [Turborepo](https://turbo.build) |
| Web + SSR | [TanStack Start](https://tanstack.com/start) + [Tailwind CSS](https://tailwindcss.com) |
| API | [Elysia](https://elysiajs.com) |
| Typed client | [Eden Treaty](https://elysiajs.com/eden/overview) |

Agents de produto ficam no **TUI nativo** (Grok/Cursor). A API **não** integra ChatGPT/OpenAI como “agent provider”.

## Repo layout

```
dino-platform/
├── apps/
│   ├── api/     # Elysia — /health, /agents/* (native verify recipes)
│   └── web/     # TanStack Start — agents console + /runs (club UI later)
├── packages/
│   ├── shared/
│   ├── agents-sdk/
│   └── tsconfig/
├── scripts/smoke-api.ts
├── MIGRATION.md
└── LICENSE      # MIT
```

## Quick start

```bash
# requires Bun: https://bun.sh
bun install

# optional: product path for native shell recipes
cp apps/api/.env.example apps/api/.env

bun run dev
```

| App | URL |
|-----|-----|
| Web | http://localhost:3000 |
| API | http://localhost:3001 |

```bash
bun run smoke:api
```

## API (current)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Liveness + product root |
| `GET` | `/agents` | Native agent catalog |
| `GET` | `/agents/:id` | Agent detail |
| `POST` | `/agents/:id/runs` | `{ prompt, cwd?, execute? }` |
| `GET` | `/agents/runs` | In-memory run history |
| `GET` | `/agents/runs/:runId` | Run detail |

### Native execute recipes

| Agent | Recipe |
|-------|--------|
| `product-shell` | files + vercel.json + robots |
| `content-builder` | content surfaces |
| `supabase-guard` | migrations layout |
| `ship-check` | `npm test` (Playwright) |
| `feed-designer` / `home-designer` | dispatch only → native TUI |

## Deploy

- **Web (Vercel):** monorepo root → builds `apps/web` (TanStack Start / Nitro).  
- **API:** run with Bun (`apps/api`) on a Bun-friendly host; set `VITE_API_URL` on the web project to that URL.  
- Product cutover plan: [MIGRATION.md](./MIGRATION.md).

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | API + web (turbo parallel) |
| `bun run build` | Build workspaces |
| `bun run smoke:api` | Health + product-shell execute |

## License

[MIT](./LICENSE) — permissive, standard for open-source product foundations (simple reuse, commercial OK, no warranty).

## Related

- Live club product: [dinoclub.blog](https://dinoclub.blog)  
- Migration notes: [MIGRATION.md](./MIGRATION.md) · [STATUS.md](./STATUS.md)
