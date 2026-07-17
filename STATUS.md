# Status — dino-platform (finalize)

**Data:** 2026-07-17  
**Fase:** **1 em curso** (product shell + home clube). Ver PHASES.md.

## Done
- [x] Monorepo Bun + Turborepo  
- [x] `apps/api` Elysia + CORS + `/health` + `/agents/*`  
- [x] Eden Treaty no `apps/web`  
- [x] TanStack Start + Tailwind  
- [x] Agents nativos only (sem ChatGPT API)  
- [x] Execute recipes: product-shell, content-builder, supabase-guard, ship-check  
- [x] UI Agents + Runs  
- [x] `DINO_PRODUCT_ROOT` → build in public  
- [x] README + MIGRATION.md + smoke-api  
- [x] Git repo inicial  
- [x] **GitHub** https://github.com/mccall9/dino-platform (MIT)  
- [x] **Vercel prod** https://dino-platform.vercel.app  

## Not done (de propósito)
- [ ] Portar dino.blog de `build in public`  
- [ ] Rotas de clube no Start  
- [ ] Persistência de runs (SQLite)  
- [ ] API Elysia hospedada em produção (web na Vercel; API ainda local / host Bun)  

## Como subir
```bash
cd Desktop/dino-platform
bun install
bun run dev
# API :3001 · Web :3000
bun run smoke:api
```
