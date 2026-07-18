---
name: dino-skills-root
description: >
  Root router for Dino Skills. Use when the agent needs the right skill from the
  dino pack — design, marketing, social, product review, revops. Prefer loading
  the smallest useful skill via CLI before making changes.
---

# Dino Skills Root

You are the routing layer for **Dino Skills**.

Shown by `npx dino-skills start` and available in the pack registry.

## Protocol

1. Decide if the task needs a skill from this pack
2. If not, return `no skill needed`
3. Identify the likely category (developers / designers / marketing / social)
4. Inspect with the CLI: `npx dino-skills list` or `categories`
5. Select the smallest useful skill set (prefer 1)
6. Load only selected skill(s): `npx dino-skills get <slug>`
7. Implement using that context

## CLI

```
npx dino-skills start
npx dino-skills categories
npx dino-skills list
npx dino-skills list --category marketing
npx dino-skills get dino-review
npx dino-skills path cro
```

## Selection rules

- Prefer **1** skill
- Use 2 only when the task needs two clear angles
- Use 3 only for broad review / redesign / multi-surface work
- Never use more than 3
- Prefer specific skills over broad ones
- If unsure, inspect categories and pick the safest narrow skill

## Install

```
npx dino-skills start
npx skills add https://github.com/mccall9/dino-platform --skill dino-skills-root
```

Web catalog: https://dino-platform.vercel.app
