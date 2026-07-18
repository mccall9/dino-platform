# dino-skills

Pack npm com **todas** as skills do inventário dino (design, marketing, social, review, revops…).

## How to use

```bash
npx dino-skills start
```

Peça pro agent:

> Run `npx dino-skills start` and pick the right skill before changing anything.

## CLI

```bash
npx dino-skills categories
npx dino-skills list
npx dino-skills list --category marketing
npx dino-skills get dino-review
npx dino-skills get revops
npx dino-skills path cro
```

## Install into agent

```bash
npx skills add https://github.com/mccall9/dino-platform --skill dino-skills-root
# or a specific skill
npx skills add https://github.com/mccall9/dino-platform --skill dino-review
```

## Sync (monorepo)

```bash
node scripts/sync-dino-skills-pack.mjs
```

Catalog web: [dino-platform.vercel.app](https://dino-platform.vercel.app)
