/**
 * Sync all inventário skills into packages/dino-skills/skills/
 * + write catalog.json for the CLI.
 *
 * Usage: node scripts/sync-dino-skills-pack.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const home = process.env.USERPROFILE || process.env.HOME || ""
const packSkills = path.join(root, "packages/dino-skills/skills")
const catalogTs = path.join(root, "packages/shared/src/skills-catalog.ts")

const SOURCE_ROOTS = [
  path.join(root, "packages/dino-skills/skills"),
  path.join(home, ".agents", "skills"),
  path.join(home, ".grok", "skills"),
  path.join(root, ".agents", "skills"),
]

const catSrc = fs.readFileSync(catalogTs, "utf8")
const entries = []
const blockRe =
  /\{\s*id:\s*"([^"]+)"[\s\S]*?source:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]*(?:\\.[^"]*)*)"[\s\S]*?category:\s*"([^"]+)"/g

// Simpler parse: extract each id block
const idBlocks = catSrc.split(/\n  \{\n/).slice(1)
for (const block of idBlocks) {
  const id = block.match(/id:\s*"([^"]+)"/)?.[1]
  const source = block.match(/source:\s*"([^"]+)"/)?.[1]
  const name = block.match(/name:\s*"([^"]+)"/)?.[1]
  const category = block.match(/category:\s*"([^"]+)"/)?.[1]
  // description may be multi-line string
  let description = ""
  const d1 = block.match(/description:\s*\n\s*"([^"]+)"/)
  const d2 = block.match(/description:\s*"([^"]+)"/)
  description = (d1?.[1] || d2?.[1] || "").replace(/\\n/g, " ")
  if (!id) continue
  entries.push({ id, source, name, description, category })
}

function findSkillMd(id) {
  for (const r of SOURCE_ROOTS) {
    const p = path.join(r, id, "SKILL.md")
    if (fs.existsSync(p)) return p
  }
  return null
}

function fallbackMd(e) {
  return `---
name: ${e.id}
description: >
  ${e.description || e.name}
---

# ${e.name}

${e.description || ""}

## Pack

Parte do **dino-skills** (\`npx dino-skills\`).

\`\`\`
npx dino-skills get ${e.id}
npx dino-skills path ${e.id}
\`\`\`

Source: ${e.source ?? "dino"} · category: ${e.category ?? "general"}
`
}

fs.mkdirSync(packSkills, { recursive: true })

let copied = 0
let generated = 0
const catalog = []

// Root router skill always first
const rootSkillDir = path.join(packSkills, "dino-skills-root")
fs.mkdirSync(rootSkillDir, { recursive: true })
fs.writeFileSync(
  path.join(rootSkillDir, "SKILL.md"),
  `---
name: dino-skills-root
description: >
  Root router for Dino Skills. Use when the agent needs the right skill from the
  dino pack — design, marketing, social, product review, revops. Prefer loading
  the smallest useful skill via CLI before making changes.
---

# Dino Skills Root

You are the routing layer for **Dino Skills**.

Shown by \`npx dino-skills start\` and available in the pack registry.

## Protocol

1. Decide if the task needs a skill from this pack
2. If not, return \`no skill needed\`
3. Identify the likely category (developers / designers / marketing / social)
4. Inspect with the CLI: \`npx dino-skills list\` or \`categories\`
5. Select the smallest useful skill set (prefer 1)
6. Load only selected skill(s): \`npx dino-skills get <slug>\`
7. Implement using that context

## CLI

\`\`\`
npx dino-skills start
npx dino-skills categories
npx dino-skills list
npx dino-skills list --category marketing
npx dino-skills get dino-review
npx dino-skills path cro
\`\`\`

## Selection rules

- Prefer **1** skill
- Use 2 only when the task needs two clear angles
- Use 3 only for broad review / redesign / multi-surface work
- Never use more than 3
- Prefer specific skills over broad ones
- If unsure, inspect categories and pick the safest narrow skill

## Install

\`\`\`
npx dino-skills start
npx skills add https://github.com/mccall9/dino-platform --skill dino-skills-root
\`\`\`

Web catalog: https://dino-platform.vercel.app
`,
  "utf8",
)

catalog.push({
  id: "dino-skills-root",
  name: "Dino Skills Root",
  source: "dino",
  category: "developers",
  description:
    "Router do pack dino-skills — escolhe a skill certa antes de o agent sair mudando código.",
})

for (const e of entries) {
  if (e.id === "dino-skills-root") continue
  const destDir = path.join(packSkills, e.id)
  fs.mkdirSync(destDir, { recursive: true })
  const src = findSkillMd(e.id)
  if (src && path.dirname(src) !== destDir) {
    fs.copyFileSync(src, path.join(destDir, "SKILL.md"))
    copied++
  } else if (src && path.dirname(src) === destDir) {
    // already in pack
    copied++
  } else {
    fs.writeFileSync(path.join(destDir, "SKILL.md"), fallbackMd(e), "utf8")
    generated++
  }
  catalog.push({
    id: e.id,
    name: e.name,
    source: e.source,
    category: e.category,
    description: e.description,
  })
}

// de-dupe catalog by id
const seen = new Set()
const unique = []
for (const c of catalog) {
  if (seen.has(c.id)) continue
  seen.add(c.id)
  unique.push(c)
}

fs.writeFileSync(
  path.join(root, "packages/dino-skills/catalog.json"),
  JSON.stringify(
    {
      name: "dino-skills",
      version: "0.2.0",
      homepage: "https://dino-platform.vercel.app",
      skills: unique,
    },
    null,
    2,
  ),
  "utf8",
)

console.log(
  `pack sync: ${unique.length} skills · copied ${copied} · generated ${generated}`,
)
console.log(`→ ${packSkills}`)
