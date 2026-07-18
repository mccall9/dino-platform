# dino-platform

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)

**Dino Skills** — inventário público de skills + agents (Claude Code, Cursor, Codex, Copilot…).

Site: [dino-platform.vercel.app](https://dino-platform.vercel.app)

## Links

- **GitHub:** https://github.com/mccall9/dino-platform  
- **Vercel:** https://dino-platform.vercel.app  
- **Pack:** `npx dino-skills install` · `npx dino-skills start`  
- **Contribute a skill:** [CONTRIBUTING.md](./CONTRIBUTING.md)

## Stack

| Layer | Tech |
|-------|------|
| Runtime | [Bun](https://bun.sh) |
| Monorepo | [Turborepo](https://turbo.build) |
| Web + SSR | [TanStack Start](https://tanstack.com/start) + [Tailwind](https://tailwindcss.com) |
| API | [Elysia](https://elysiajs.com) |
| Client | [Eden Treaty](https://elysiajs.com/eden/overview) |

## Structure

```
dino-platform/
├── apps/web/                    # Site Dino Skills + Agents
├── apps/api/                    # Elysia · /health · /agents/*
├── packages/dino-skills/        # npm pack + skills/*/SKILL.md
├── packages/shared/             # catalogs (skills + runtimes)
├── packages/agents-sdk/
└── CONTRIBUTING.md              # how to add a skill via PR
```

## Dev

```bash
bun install
bun run dev:web                  # http://localhost:3000
```

| App | URL |
|-----|-----|
| Web | http://localhost:3000 |
| API | http://localhost:3001 (`bun run dev:api`) |

## Add a skill (appears on the site after merge)

```bash
bun run skills:new -- my-skill --name "My Skill" --category marketing
# edit SKILL.md + catalog descriptions
bun run skills:sync
bun run skills:verify
# open PR → merge → Vercel deploy → live on /skills/my-skill
```

Full guide: [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
