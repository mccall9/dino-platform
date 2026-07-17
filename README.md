# dino-platform

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)

**Standalone** monorepo — stack playground + native agents console.

> **Not** the dino.blog / dinoclub.blog product.  
> Club product stays on static `build in public` (production). Font there remains **DM Sans** (live site).  
> This repo uses **Arvo** for its own console UI only.

## Stack

| Layer | Tech |
|-------|------|
| Runtime | [Bun](https://bun.sh) |
| Monorepo | [Turborepo](https://turbo.build) |
| Web + SSR | [TanStack Start](https://tanstack.com/start) + [Tailwind](https://tailwindcss.com) |
| API | [Elysia](https://elysiajs.com) |
| Client | [Eden Treaty](https://elysiajs.com/eden/overview) |

Native agents only (Grok/Cursor). No ChatGPT/OpenAI agent providers.

## Links

- **GitHub:** https://github.com/mccall9/dino-platform  
- **Vercel:** https://dino-platform.vercel.app  
- **Product (separate):** https://dinoclub.blog  

## Structure

```
dino-platform/
├── apps/api/          # Elysia · /health · /agents/*
├── apps/web/          # Agents console · / · /runs · /agents/:id
├── packages/shared/
├── packages/agents-sdk/
└── PHASES.md          # scope: standalone (not dino.blog migration)
```

## Dev

```bash
bun install
cp apps/api/.env.example apps/api/.env   # optional DINO_PRODUCT_ROOT
bun run dev
```

| App | URL |
|-----|-----|
| Web | http://localhost:3000 |
| API | http://localhost:3001 |

```bash
bun run smoke:api
```

## Stack test for dino.blog (later, other repo)

When testing a stack rewrite of the club product:

1. Create a **new GitHub repo** (do not merge into this one)  
2. Keep **live fonts/visual identity** (DM Sans, tokens from production)  
3. Deploy that repo to Vercel for preview  
4. Drive work with **agents + skills** from the product workspace  

See [PHASES.md](./PHASES.md).

## License

[MIT](./LICENSE)
