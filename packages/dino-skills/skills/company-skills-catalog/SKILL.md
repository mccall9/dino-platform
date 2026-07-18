---
name: company-skills-catalog
description: >
  Inventory index for installable “run the company” skill packs
  (developers, design, marketing, social, finance, SMB, legal).
  Use when choosing which skill pack to load, install Superpowers/Context7/Taste/Marketing/Social,
  or when the user asks for the company skills inventory.
---

# Company Skills Catalog

Full scraped inventory: `docs/SKILLS_INVENTORY_COMPANY.md` (also `~/.grok/docs/SKILLS_INVENTORY_COMPANY.md`).

## Quick map

| Area | Pack | How to load |
|------|------|-------------|
| Dev process | Superpowers | `/plugin install superpowers@claude-plugins-official` |
| Live docs | Context7 | `npx ctx7 setup` |
| Meta skills | skill-creator, mcp-builder | already local |
| UI test | webapp-testing | already local |
| Memory | Claude-Mem | `npx claude-mem install` |
| UI system | ui-ux-pro-max | already local |
| Taste / anti-slop | taste-skill | `npx skills add Leonxlnx/taste-skill` |
| Motion CSS | transitions.dev | already local (`transitions-dev`) |
| Marketing (~45) | marketingskills | `npx skills add coreyhaines31/marketingskills` |
| Social (~17) | social-media-skills | clone / Claude plugin marketplace |
| Finance (~8) | Claude plugin | https://claude.com/plugins/finance |
| SMB (~31) | Claude plugin | https://claude.com/plugins/small-business |
| Legal (~9) | Claude plugin | https://claude.com/plugins/legal |

## Rules

1. Prefer **local** skills already under `.agents/skills/` when overlap exists.
2. Do **not** invent finance/legal advice as final truth — plugins require human review.
3. For dino.blog stack-test, prioritize: Superpowers, Context7, UI/Taste/Transitions, Marketing, Social, Claude-Mem.
