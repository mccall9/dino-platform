## Skill PR

<!-- Use this template when adding or updating a skill in the pack. -->

### Summary

- **slug / id:** `…`
- **category:** `developers | designers | marketing | social | …`
- **source:** `dino | …`

### Checklist

- [ ] Added `packages/dino-skills/skills/<slug>/SKILL.md`
- [ ] Registered entry in `packages/shared/src/skills-catalog.ts`
- [ ] Ran `bun run skills:sync`
- [ ] Ran `bun run skills:verify` (passes)
- [ ] Description explains *when* the agent should load the skill
- [ ] No secrets / proprietary dumps

### How it appears on the site

After merge, Vercel redeploys. The skill shows on:

- `/skills` and `/skills/<slug>`
- Matching agent pages under `/runtimes/*` (by category / `runtimes` field)

### Test plan

- [ ] Local: `bun run dev:web` → open skill page
- [ ] Optional: `npx dino-skills get <slug>` after pack sync
