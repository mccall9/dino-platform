# dino-platform

**Base monorepo da futura stack do [dino.blog](https://dinoclub.blog)** (dinoclub.blog).

| Agora | Depois |
|-------|--------|
| Stack pronta + tools de verify nativos | Migrar produto de `build in public` (HTML estático) → este monorepo |

## Stack (produto)

| Camada | Tecnologia |
|--------|------------|
| Runtime / PM | **Bun** |
| Monorepo | **Turborepo** |
| Web + SSR | **TanStack Start** + **Tailwind** |
| API | **Elysia** |
| Client tipado | **Eden Treaty** |
| Dados (produto) | **Supabase** (Auth + RLS) — no app estático atual; mesma regra no cutover |

**Não** usamos ChatGPT/OpenAI como “agents API”. Agents de dev são **nativos** (Grok/Cursor em `.grok/agents`).

## Estrutura

```
dino-platform/
├── apps/
│   ├── api/          # Elysia · /health · /agents/* (verify nativo hoje)
│   └── web/          # TanStack Start · console agents/runs (depois: clube)
├── packages/
│   ├── shared/       # tipos compartilhados
│   ├── agents-sdk/   # registry + execute recipes (sem LLM)
│   └── tsconfig/
├── scripts/
│   └── smoke-api.ts
├── MIGRATION.md      # plano cutover build in public → monorepo
└── README.md
```

## Dev

```bash
# Bun no PATH (Windows: %USERPROFILE%\.bun\bin)
cd dino-platform
bun install

# apps/api/.env — DINO_PRODUCT_ROOT aponta ao produto estático atual
cp apps/api/.env.example apps/api/.env
# edite DINO_PRODUCT_ROOT se o path for diferente

bun run dev
```

| App | URL |
|-----|-----|
| Web | http://localhost:3000 |
| API | http://localhost:3001 |

```bash
bun run smoke:api   # health + product-shell execute
```

## API (hoje)

| Método | Path | Uso |
|--------|------|-----|
| GET | `/health` | liveness + productRoot |
| GET | `/agents` | catálogo nativo |
| GET | `/agents/:id` | detalhe |
| POST | `/agents/:id/runs` | `{ prompt, cwd?, execute? }` |
| GET | `/agents/runs` | histórico in-memory |
| GET | `/agents/runs/:runId` | detalhe run |

### Execute recipes (shell no product cwd)

| Agent | Recipe |
|-------|--------|
| `product-shell` | files + vercel + robots |
| `content-builder` | superfícies de conteúdo |
| `supabase-guard` | layout + migrations |
| `ship-check` | `npm test` (Playwright) |
| feed/home-designer | dispatch only → TUI nativo |

## Relação com `build in public`

| Repo / pasta | Papel **agora** |
|--------------|-----------------|
| `Desktop/build in public` | **Produção** dino.blog (estático + Supabase + Vercel) |
| `Desktop/dino-platform` | **Base da próxima stack** — não substitui o deploy ainda |

Quando migrarmos o produto, o fluxo está em **[MIGRATION.md](./MIGRATION.md)**.

## Princípios

1. Stack do monorepo = stack futura do dino.blog  
2. Zero service role no browser  
3. Agents de produto no TUI nativo; recipes da API só shell/verify  
4. Não reescrever produção até cutover consciente  

## Scripts root

| Script | Descrição |
|--------|-----------|
| `bun run dev` | API + web em paralelo (turbo) |
| `bun run build` | build workspaces |
| `bun run smoke:api` | smoke da API |
