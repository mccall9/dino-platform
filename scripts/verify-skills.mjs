/**
 * Ensure skill folders, skills-catalog.ts, and catalog.json stay aligned.
 * Exit 1 on mismatch — used in CI and local pre-PR checks.
 *
 * Usage: node scripts/verify-skills.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const packSkills = path.join(root, "packages/dino-skills/skills")
const catalogTs = path.join(root, "packages/shared/src/skills-catalog.ts")
const catalogJson = path.join(root, "packages/dino-skills/catalog.json")

const SKIP_DIRS = new Set(["_template", "node_modules"])

function die(msg) {
  console.error(`✗ ${msg}`)
  process.exitCode = 1
}

function ok(msg) {
  console.log(`✓ ${msg}`)
}

if (!fs.existsSync(catalogTs)) {
  die(`missing ${catalogTs}`)
  process.exit(1)
}

const catSrc = fs.readFileSync(catalogTs, "utf8")
const catalogIds = [...catSrc.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1])
const uniqueCatalog = [...new Set(catalogIds)]

if (catalogIds.length !== uniqueCatalog.length) {
  const dupes = catalogIds.filter((id, i) => catalogIds.indexOf(id) !== i)
  die(`duplicate ids in skills-catalog.ts: ${[...new Set(dupes)].join(", ")}`)
}

const folderIds = fs
  .readdirSync(packSkills, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !SKIP_DIRS.has(d.name) && !d.name.startsWith("."))
  .map((d) => d.name)
  .sort()

const catalogSet = new Set(uniqueCatalog)
const folderSet = new Set(folderIds)

const missingMd = []
const emptyMd = []
for (const id of folderIds) {
  const md = path.join(packSkills, id, "SKILL.md")
  if (!fs.existsSync(md)) {
    missingMd.push(id)
    continue
  }
  const body = fs.readFileSync(md, "utf8").trim()
  if (body.length < 40) emptyMd.push(id)
}

const inFolderNotCatalog = folderIds.filter((id) => !catalogSet.has(id))
const inCatalogNotFolder = uniqueCatalog.filter((id) => !folderSet.has(id))

// Folders without catalog entry = won't show on site
if (inFolderNotCatalog.length) {
  die(
    `skill folder(s) missing from skills-catalog.ts (won't appear on site):\n  - ${inFolderNotCatalog.join("\n  - ")}`,
  )
} else {
  ok(`all ${folderIds.length} skill folders registered in skills-catalog.ts`)
}

// Catalog entries without a pack folder — warn hard (site can still list them if content exists elsewhere)
if (inCatalogNotFolder.length) {
  console.warn(
    `⚠ catalog entries without packages/dino-skills/skills/<id>/:\n  - ${inCatalogNotFolder.join("\n  - ")}\n  (ok if content lives only under ~/.agents or is external; prefer packing installable skills)`,
  )
} else {
  ok("every catalog id has a pack folder")
}

if (missingMd.length) {
  die(`missing SKILL.md:\n  - ${missingMd.join("\n  - ")}`)
} else {
  ok("every pack folder has SKILL.md")
}

if (emptyMd.length) {
  die(`SKILL.md too short (<40 chars):\n  - ${emptyMd.join("\n  - ")}`)
}

// catalog.json should list same ids as pack folders that are in catalog
if (fs.existsSync(catalogJson)) {
  try {
    const json = JSON.parse(fs.readFileSync(catalogJson, "utf8"))
    const jsonIds = (json.skills || []).map((s) => s.id)
    const jsonSet = new Set(jsonIds)
    const packedAndCataloged = folderIds.filter((id) => catalogSet.has(id))
    const missingInJson = packedAndCataloged.filter((id) => !jsonSet.has(id))
    if (missingInJson.length) {
      die(
        `catalog.json out of date (run bun run skills:sync):\n  - ${missingInJson.join("\n  - ")}`,
      )
    } else {
      ok(`catalog.json has ${jsonIds.length} skills`)
    }
  } catch (e) {
    die(`invalid catalog.json: ${e.message}`)
  }
} else {
  console.warn("⚠ packages/dino-skills/catalog.json missing — run bun run skills:sync")
}

if (process.exitCode) {
  console.error("\nskills:verify failed")
  process.exit(1)
}

console.log("\nskills:verify ok")
