/**
 * Scaffold a new skill folder + append catalog entry when possible.
 *
 * Usage:
 *   node scripts/new-skill.mjs my-skill --name "My Skill" --category marketing --source dino
 *   bun run skills:new -- my-skill --name "My Skill" --category marketing
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const argv = process.argv.slice(2)

function flag(name, fallback = "") {
  const i = argv.indexOf(`--${name}`)
  if (i === -1) return fallback
  const v = argv[i + 1]
  if (!v || v.startsWith("--")) return fallback
  return v
}

const positionals = []
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith("--")) {
    // skip flag value
    if (argv[i + 1] && !argv[i + 1].startsWith("--")) i++
    continue
  }
  positionals.push(argv[i])
}

const rawId = (positionals[0] || flag("id") || "").trim()
const id = rawId.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "")

if (!id) {
  console.error(
    `Usage: bun run skills:new -- <slug> [--name "..."] [--category marketing] [--source dino]`,
  )
  process.exit(1)
}

const name =
  flag("name") ||
  id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
const category = flag("category", "developers")
const source = flag("source", "dino")

const dir = path.join(root, "packages/dino-skills/skills", id)
const mdPath = path.join(dir, "SKILL.md")
const catalogPath = path.join(root, "packages/shared/src/skills-catalog.ts")

if (fs.existsSync(mdPath)) {
  console.error(`Already exists: ${mdPath}`)
  process.exit(1)
}

const templatePath = path.join(
  root,
  "packages/dino-skills/skills/_template/SKILL.md",
)
let body = fs.existsSync(templatePath)
  ? fs.readFileSync(templatePath, "utf8")
  : `---\nname: ${id}\ndescription: >\n  TODO\n---\n\n# ${id}\n`

body = body.replaceAll("your-skill-slug", id)
body = body.replace(
  /description: >\n  One or two sentences[\s\S]*?useful\)\./m,
  `description: >\n  ${name} — describe when the agent should load this skill.`,
)

fs.mkdirSync(dir, { recursive: true })
fs.writeFileSync(mdPath, body)
console.log(`✓ wrote ${mdPath}`)

const entry = `  {
    id: "${id}",
    source: "${source}",
    name: "${name}",
    description:
      "TODO: descrição curta em português.",
    descriptionEn: "TODO: short English description.",
    category: "${category}",
    url: "https://github.com/mccall9/dino-platform/tree/master/packages/dino-skills/skills/${id}",
    status: "installable",
    install: "npx dino-skills get ${id}",
  },`

if (fs.existsSync(catalogPath)) {
  let cat = fs.readFileSync(catalogPath, "utf8")
  if (cat.includes(`id: "${id}"`)) {
    console.log(`⚠ catalog already has id "${id}" — not appending`)
  } else {
    const marker = "\n]\n\nexport const SKILLS_CATALOG_NOTE"
    if (cat.includes(marker)) {
      cat = cat.replace(
        marker,
        `\n${entry}\n]\n\nexport const SKILLS_CATALOG_NOTE`,
      )
      fs.writeFileSync(catalogPath, cat)
      console.log(`✓ appended entry to skills-catalog.ts`)
    } else {
      console.log("\nPaste this into packages/shared/src/skills-catalog.ts:\n")
      console.log(entry)
    }
  }
} else {
  console.log("\nPaste this into packages/shared/src/skills-catalog.ts:\n")
  console.log(entry)
}

console.log(`
Next:
  1. Edit SKILL.md body
  2. Fill description / descriptionEn in skills-catalog.ts
  3. bun run skills:sync
  4. bun run skills:verify
  5. Open a PR (see CONTRIBUTING.md)
`)
