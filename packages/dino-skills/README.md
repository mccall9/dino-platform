# dino-skills

CLI + agent skills do **dino** (Clube dos Curiosos / dino.blog).

## Quick start

```bash
npx dino-skills start
npx dino-skills list
npx dino-skills get dino-review
```

## Install skill into an agent

```bash
npx skills add https://github.com/mccall9/dino-platform --skill dino-review
```

## Skills in this pack

| Skill | What |
|-------|------|
| `dino-review` | Product / landing review no padrão dino (ship viral, checklist de conversão). |

Catalog: [dino-platform.vercel.app](https://dino-platform.vercel.app)

## Local monorepo

```bash
node packages/dino-skills/bin/dino-skills.mjs start
```
