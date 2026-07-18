# Contributing to Dino Skills

Want a skill to show up on [dino-platform.vercel.app](https://dino-platform.vercel.app)?  
**Open a pull request.** After merge, Vercel redeploys and the catalog updates.

## How the site gets skills

| Piece | Path | Role |
|-------|------|------|
| Skill body | `packages/dino-skills/skills/<slug>/SKILL.md` | What the agent runs |
| Catalog (site + API) | `packages/shared/src/skills-catalog.ts` | Name, description, category, install — **required for the site** |
| Embedded MD | `packages/shared/src/skills-content.ts` | Generated — do not edit by hand |
| CLI list | `packages/dino-skills/catalog.json` | Generated — do not edit by hand |

Flow after you add files:

```bash
bun run skills:sync      # rebuild content + pack catalog
bun run skills:verify    # fail if folder ↔ catalog diverge
```

## Add a skill (fork → PR)

### 1. Fork & branch

```bash
git clone https://github.com/<you>/dino-platform.git
cd dino-platform
git checkout -b skill/<your-slug>
bun install
```

### 2. Scaffold (recommended)

```bash
bun run skills:new -- my-cool-skill --name "My Cool Skill" --category marketing --source dino
```

This creates:

- `packages/dino-skills/skills/my-cool-skill/SKILL.md`
- a stub entry hint for `skills-catalog.ts`

Or copy the template:

```bash
cp packages/dino-skills/skills/_template/SKILL.md packages/dino-skills/skills/<slug>/SKILL.md
```

### 3. Write the skill

Edit `packages/dino-skills/skills/<slug>/SKILL.md`:

```yaml
---
name: my-cool-skill
description: >
  One or two sentences: when to use this skill, what it does.
---

# my-cool-skill

## When to use
...

## Steps
...

## Done means
...
```

Rules of thumb:

- **slug** = folder name = `id` in the catalog (kebab-case, no spaces)
- Description should tell the agent **when** to load the skill
- Prefer concrete steps over fluff

### 4. Register on the site catalog

Add one object to `SKILLS_CATALOG` in  
`packages/shared/src/skills-catalog.ts`:

```ts
{
  id: "my-cool-skill",
  source: "dino",          // or your origin chip
  name: "My Cool Skill",
  description: "Descrição curta em português (UI default).",
  descriptionEn: "Short English blurb for en-US UI.",
  category: "marketing",   // developers | designers | marketing | social | …
  url: "https://github.com/mccall9/dino-platform/tree/master/packages/dino-skills/skills/my-cool-skill",
  status: "installable",
  install: "npx dino-skills get my-cool-skill",
  featured: false,         // true only for dino-owned highlights on home
},
```

### 5. Sync & verify

```bash
bun run skills:sync
bun run skills:verify
```

### 6. Open the PR

```bash
git add packages/dino-skills/skills/<slug> packages/shared/src/skills-catalog.ts packages/shared/src/skills-content.ts packages/dino-skills/catalog.json
git commit -m "feat(skills): add <slug>"
git push -u origin skill/<slug>
```

Open a PR against `master` on [mccall9/dino-platform](https://github.com/mccall9/dino-platform).  
Use the **Skill** PR template if GitHub offers it.

After merge → Vercel build → skill appears under **Skills** (and under matching **Agents** if category/runtimes fit).

## Categories

| category | Typical use |
|----------|-------------|
| `developers` | tooling, review, agent workflows |
| `designers` | UI, IA, tokens, animation |
| `marketing` | CRO, offers, launch, SEO |
| `social` | posts, hooks, reels, LinkedIn |
| `finance` / `small-business` / `legal` | as needed |

## Agents (runtimes)

Coding agents on the site live in `packages/shared/src/runtimes-catalog.ts`.  
Brand icons: `apps/web/public/assets/agents/<runtime-id>.svg` (monochrome, `currentColor`).

Opening a PR that only changes agent metadata is fine; new agents need an icon SVG in the same tile format.

## What we review

- [ ] Unique `id` / folder slug  
- [ ] Useful `description` (when to use)  
- [ ] Valid `category` + `source`  
- [ ] `bun run skills:verify` passes  
- [ ] No secrets, malware, or proprietary dumps  
- [ ] MIT-compatible content (this repo is MIT)

## Local site

```bash
bun run dev:web
# http://localhost:3000
```

## License

By contributing you agree your contribution is under the same [MIT License](./LICENSE) as the repo.
