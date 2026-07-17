# Migração: build in public → dino-platform

**Status:** adiado de propósito.  
Este monorepo está **finalizado como base de stack**. O produto em produção continua em `build in public` até a próxima fase.

## Fonte e destino

| | Hoje (produção) | Destino |
|--|-----------------|---------|
| Pasta | `Desktop/build in public` | `Desktop/dino-platform` |
| Frontend | HTML/CSS/JS estático | `apps/web` TanStack Start + Tailwind + SSR |
| Backend | Supabase direto do browser | Elysia BFF + Supabase (RLS) + Eden Treaty |
| Deploy | Vercel static | Vercel (web) + host Bun da API (ou edge depois) |

## Ordem de cutover (quando formos)

### Fase 1 — Shell público
- Portar `/` clube, nav, CTAs, tokens CSS (`--ink`, `--green`…) para Start + Tailwind  
- SEO meta, OG, rotas limpas  

### Fase 2 — Auth
- OTP 6–8 dígitos (mesmo fluxo Supabase)  
- `?next=` seguro  
- Session no client + cookies se necessário  

### Fase 3 — Membership + feed
- Gate membros only em `/feed`  
- Conversas, likes, avatars — mesma RLS  
- APIs Elysia só se agregarem valor (BFF); writes sensíveis continuam com RLS  

### Fase 4 — Conteúdo
- `/ideias`, `/about`, `/post`  
- Redirects de `vercel.json` no router Start  

### Fase 5 — Deploy
- Preview URL monorepo  
- Smoke Playwright (recipe `ship-check` ou port tests)  
- DNS/Vercel cutover  
- Manter estático read-only por um tempo  

## O que NÃO migrar cedo
- Redesign do feed “só porque mudou stack”  
- Trocar Supabase por outro auth sem motivo  
- Agents ChatGPT na API  

## Checklist pré-cutover
- [ ] Home clube SSR pixel/CTA parity  
- [ ] Login OTP  
- [ ] Feed gate membros  
- [ ] Playwright verde  
- [ ] Env secrets só no server  
- [ ] robots Disallow private  

## Utilidade atual do monorepo até lá
- Validar stack Bun/Turbo/Elysia/Start/Treaty  
- Recipes nativos (`product-shell`, `ship-check`, …) apontando `DINO_PRODUCT_ROOT` → `build in public`  
- Console `/` e `/runs` como sandbox — **não** é o site do clube ainda  
