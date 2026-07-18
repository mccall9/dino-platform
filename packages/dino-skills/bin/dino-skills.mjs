#!/usr/bin/env node
/**
 * dino-skills — CLI for Dino agent skills
 *
 *   npx dino-skills start
 *   npx dino-skills list
 *   npx dino-skills categories
 *   npx dino-skills get <slug>
 *   npx dino-skills path <slug>
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SKILLS_DIR = path.join(ROOT, "skills")

const GREEN = "\x1b[32m"
const DIM = "\x1b[2m"
const BOLD = "\x1b[1m"
const RESET = "\x1b[0m"
const CYAN = "\x1b[36m"

function listSkillDirs() {
  if (!fs.existsSync(SKILLS_DIR)) return []
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
}

function readMeta(slug) {
  const p = path.join(SKILLS_DIR, slug, "SKILL.md")
  if (!fs.existsSync(p)) return null
  const raw = fs.readFileSync(p, "utf8")
  const name = raw.match(/^name:\s*(.+)$/m)?.[1]?.trim() ?? slug
  const descMatch = raw.match(/^description:\s*>?\s*([\s\S]*?)(?=\n[a-z-]+:|\n---)/m)
  let description = descMatch?.[1]?.trim() ?? ""
  description = description
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 220)
  return { slug, name, description, path: p, raw }
}

function printHelp() {
  console.log(`
${BOLD}dino-skills${RESET} — skills do dino pra agents

${CYAN}Usage${RESET}
  npx dino-skills start              bootstrap / root skill
  npx dino-skills list               list all skills
  npx dino-skills categories         categories in this pack
  npx dino-skills get <slug>         print SKILL.md
  npx dino-skills path <slug>        absolute path to skill folder

${CYAN}Install into agent${RESET}
  npx skills add https://github.com/mccall9/dino-platform --skill dino-review

${CYAN}Web catalog${RESET}
  https://dino-platform.vercel.app
`)
}

function cmdStart() {
  const meta = readMeta("dino-review")
  console.log(`
${BOLD}${GREEN}Dino Skills${RESET} · pack ativo

${DIM}Root skill (recomendado):${RESET} ${BOLD}dino-review${RESET}
Review de produto / landing no padrão dino (princípios de ship viral).

${CYAN}Protocol${RESET}
  1. Identifica a superfície (home, pricing, hero, funnel)
  2. Lê a página real (código ou URL) — não inventa
  3. Roda o scorecard de dino-review
  4. Entrega P0 → P1 → Top 5 fixes + hero rewrite

${CYAN}CLI${RESET}
  npx dino-skills list
  npx dino-skills get dino-review
  npx dino-skills path dino-review

${CYAN}Agent install${RESET}
  npx skills add https://github.com/mccall9/dino-platform --skill dino-review

${DIM}${meta?.description ?? ""}${RESET}
`)
}

function cmdList() {
  const slugs = listSkillDirs()
  if (!slugs.length) {
    console.log("Nenhuma skill neste pack.")
    return
  }
  console.log(`\n${BOLD}Skills (${slugs.length})${RESET}\n`)
  for (const slug of slugs) {
    const m = readMeta(slug)
    console.log(`  ${GREEN}${slug}${RESET}`)
    if (m?.description) console.log(`    ${DIM}${m.description}${RESET}`)
    console.log()
  }
}

function cmdCategories() {
  console.log(`
${BOLD}Categories${RESET}
  marketing     dino-review (product / landing / conversion)
  more soon     design, social, revenue tools
`)
}

function cmdGet(slug) {
  if (!slug) {
    console.error("Usage: npx dino-skills get <slug>")
    process.exit(1)
  }
  const m = readMeta(slug)
  if (!m) {
    console.error(`Skill não encontrada: ${slug}`)
    console.error(`Disponíveis: ${listSkillDirs().join(", ") || "(none)"}`)
    process.exit(1)
  }
  process.stdout.write(m.raw)
  if (!m.raw.endsWith("\n")) process.stdout.write("\n")
}

function cmdPath(slug) {
  if (!slug) {
    console.error("Usage: npx dino-skills path <slug>")
    process.exit(1)
  }
  const dir = path.join(SKILLS_DIR, slug)
  if (!fs.existsSync(dir)) {
    console.error(`Skill não encontrada: ${slug}`)
    process.exit(1)
  }
  console.log(dir)
}

const [cmd, arg] = process.argv.slice(2)

switch (cmd) {
  case "start":
  case undefined:
    cmdStart()
    break
  case "list":
  case "ls":
    cmdList()
    break
  case "categories":
    cmdCategories()
    break
  case "get":
    cmdGet(arg)
    break
  case "path":
    cmdPath(arg)
    break
  case "help":
  case "-h":
  case "--help":
    printHelp()
    break
  default:
    console.error(`Unknown command: ${cmd}`)
    printHelp()
    process.exit(1)
}
