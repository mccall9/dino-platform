# Fases — migração dino.blog → dino-platform

**Produção ao vivo** continua em `build in public` / dinoclub.blog até cutover.  
Este monorepo recebe o produto por fases.

---

## Fase 0 — Base de stack ✅

- Bun + Turborepo + Elysia + Eden Treaty + TanStack Start + Tailwind  
- GitHub + Vercel web  
- Agents nativos / recipes (dev)  
- Docs: README, MIGRATION, LICENSE MIT  

---

## Fase 1 — Product shell + home clube (em curso)

**Goal:** `/` no monorepo parece o clube (marketing shell), não o console de agents.

| Entrega | Detalhe |
|---------|---------|
| Shell | Header brand dino.blog, nav Ideias · Sobre · CTA |
| Home | Hero clube + seções estáticas (live/featured placeholders) |
| Assets | logo + hero no `public/assets` |
| Tokens | ink / green / paper (paridade visual) |
| Dev tools | Console agents em `/dev/agents` (não é homepage) |
| Rotas stub | `/ideias`, `/about`, `/login` (placeholder até Fase 2–3) |

**Done means:** deploy Vercel com home de clube em Arvo + tokens; produção estática intocada.

---

## Fase 2 — Auth OTP

- Supabase Auth no Start (ou BFF Elysia)  
- `/login` OTP 6–8 dígitos, `?next=` seguro  
- Session + CTA M1 (Entrar / Entrar no clube / Perfil)  

---

## Fase 3 — Membership + feed

- Join/leave Clube dos Curiosos  
- `/feed` membros only (hard gate)  
- Conversas, likes, avatars (RLS)  

---

## Fase 4 — Conteúdo + paridade

- `/ideias`, `/about`, `/post`, detalhe clube  
- Redirects de `vercel.json`  
- Playwright smoke apontando monorepo  

---

## Fase 5 — Cutover produção

- Preview parity check  
- DNS / Vercel project = monorepo  
- API Elysia se necessário em host Bun  
- Aposentar HTML estático gradualmente  

---

## Fora de fase (não bloquear)

- Redesign deep do feed  
- ChatGPT agents na API  
- Marketplace de comunidades  
