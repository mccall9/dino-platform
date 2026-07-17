# dino-platform — escopo (standalone)

Este monorepo **não é o dino.blog**.  
Não misturar UI, rotas, auth, feed ou cutover de produção do clube.

| Repo / pasta | Papel |
|--------------|--------|
| `build in public` / dinoclub.blog | **Produto** clube (produção). Fonte: **DM Sans** (como no site online). |
| `dino-platform` | **Playground de stack** + console de agents nativos (Arvo ok aqui). |
| Futuro repo de **stack test** | Clone/migração experimental do dino.blog com Bun/Elysia/Start — **outro repo**, Vercel à parte. Agents + skills guiam esse teste. |

## O que este repo faz

1. Validar Bun · Turborepo · Elysia · Eden Treaty · TanStack Start · Tailwind  
2. Catálogo `/agents` + recipes shell nativos (sem ChatGPT API)  
3. Deploy web na Vercel: https://dino-platform.vercel.app  

## O que este repo NÃO faz

- Não vira home do Clube dos Curiosos  
- Não altera fonte/tokens do dino.blog em produção  
- Não faz cutover de DNS do clube  

## Próximo (fora deste repo)

Quando for o **teste de troca de stack do dino.blog**:

1. Criar **novo repositório** (ex. `dino-blog-stack-test`)  
2. Portar shell do clube **mantendo DM Sans + identidade visual do site online**  
3. Subir na Vercel (preview)  
4. Orquestrar com **agents** (`.grok/agents`) e **skills** do monorepo do produto  
