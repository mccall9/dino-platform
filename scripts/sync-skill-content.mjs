import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const catalogPath = path.join(root, "packages/shared/src/skills-catalog.ts")
const cat = fs.readFileSync(catalogPath, "utf8")
const ids = [...cat.matchAll(/id: "([^"]+)"/g)].map((m) => m[1])

const home = process.env.USERPROFILE || process.env.HOME || ""
const roots = [
  path.join(root, "packages", "dino-skills", "skills"),
  path.join(home, ".agents", "skills"),
  path.join(home, ".grok", "skills"),
  path.join(root, ".agents", "skills"),
]

/** @type {Record<string, string>} */
const out = {}
const found = []
const missing = []

for (const id of ids) {
  let body = null
  let from = null
  for (const r of roots) {
    const p = path.join(r, id, "SKILL.md")
    if (fs.existsSync(p)) {
      body = fs.readFileSync(p, "utf8")
      from = p
      break
    }
  }
  if (body) {
    out[id] = body
    found.push(`${id} <- ${from}`)
  } else {
    missing.push(id)
  }
}

const dest = path.join(root, "packages/shared/src/skills-content.ts")
const file =
  "/** Auto-generated local SKILL.md bodies. Re-run: node scripts/sync-skill-content.mjs */\n" +
  "export const SKILLS_CONTENT: Record<string, string> = " +
  JSON.stringify(out, null, 2) +
  " as const\n"

fs.writeFileSync(dest, file)
console.log(`found ${found.length}`)
for (const f of found) console.log(f)
console.log(`missing: ${missing.join(", ") || "(none)"}`)
console.log(`wrote ${dest} (${file.length} bytes)`)
