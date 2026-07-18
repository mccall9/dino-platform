# dino-skills

Pack npm com as skills do dino.

## 1) Baixar o pack (install)

Copia **todas** as skills para a pasta do agent:

```bash
npx dino-skills install
```

| Flag | Destino |
|------|---------|
| (default) | `./.agents/skills` (ou `.claude/skills` se existir) |
| `--global` / `-g` | `~/.agents/skills` |
| `--dir ./path` | pasta custom |

## 2) Rodar (protocol)

```bash
npx dino-skills start
```

Peça pro agent:

> Run `npx dino-skills install` then `npx dino-skills start` and pick the right skill.

## Outros comandos

```bash
npx dino-skills list
npx dino-skills list --category marketing
npx dino-skills get dino-review
npx dino-skills path cro
```

## Alt (skills CLI)

```bash
npx skills add https://github.com/mccall9/dino-platform --skill dino-skills-root
```

## Publish

```bash
cd packages/dino-skills
npm publish --access public
```

Até publicar: `node packages/dino-skills/bin/dino-skills.mjs install`

Catalog: https://dino-platform.vercel.app
