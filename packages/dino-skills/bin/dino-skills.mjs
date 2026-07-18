#!/usr/bin/env node
/**
 * dino-skills — npm pack com todas as skills do dino
 *
 *   npx dino-skills install              # baixar pack → .agents/skills
 *   npx dino-skills start                # protocol / how to pick
 *   npx dino-skills list
 *   npx dino-skills get <slug>
 *   npx dino-skills path <slug>
 */
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SKILLS_DIR = path.join(ROOT, "skills")
const CATALOG_PATH = path.join(ROOT, "catalog.json")

const GREEN = "\x1b[32m"
const DIM = "\x1b[2m"
const BOLD = "\x1b[1m"
const RESET = "\x1b[0m"
const CYAN = "\x1b[36m"
const YELLOW = "\x1b[33m"

function loadCatalog() {
  if (fs.existsSync(CATALOG_PATH)) {
    return JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"))
  }
  return { name: "dino-skills", skills: [] }
}

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
  const descMatch = raw.match(
    /^description:\s*>?\s*([\s\S]*?)(?=\n[a-z-]+:|\n---)/m,
  )
  let description = descMatch?.[1]?.trim() ?? ""
  description = description.replace(/\n/g, " ").replace(/\s+/g, " ").slice(0, 220)
  return { slug, name, description, path: p, raw }
}

function printHelp() {
  const n = loadCatalog().skills?.length ?? listSkillDirs().length
  console.log(`
${BOLD}dino-skills${RESET} — pack npm com ${n} skills do dino

${CYAN}Download / install pack${RESET}
  npx dino-skills install                 # copia todas as skills → .agents/skills
  npx dino-skills install --dir ./skills  # pasta custom
  npx dino-skills install --global        # → ~/.agents/skills

${CYAN}Run${RESET}
  npx dino-skills start                   # protocol (escolher skill)
  npx dino-skills list
  npx dino-skills list --category marketing
  npx dino-skills categories
  npx dino-skills get <slug>
  npx dino-skills path <slug>

${CYAN}Alt (skills CLI)${RESET}
  npx skills add https://github.com/mccall9/dino-platform --skill dino-skills-root

${CYAN}Web${RESET}
  https://dino-platform.vercel.app
`)
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

function resolveInstallDir(argv) {
  let dir = null
  let global = false
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dir" || argv[i] === "-d") {
      dir = argv[i + 1]
      i++
    } else if (argv[i] === "--global" || argv[i] === "-g") {
      global = true
    }
  }
  if (dir) return path.resolve(process.cwd(), dir)
  if (global) {
    return path.join(os.homedir(), ".agents", "skills")
  }
  // project-local defaults (first that makes sense)
  const localAgents = path.join(process.cwd(), ".agents", "skills")
  const localClaude = path.join(process.cwd(), ".claude", "skills")
  // Prefer .agents/skills (dino / company stack)
  if (fs.existsSync(path.join(process.cwd(), ".agents"))) return localAgents
  if (fs.existsSync(path.join(process.cwd(), ".claude"))) return localClaude
  return localAgents
}

/**
 * Baixa o pack inteiro para a pasta de skills do agent.
 */
function cmdInstall(argv) {
  const target = resolveInstallDir(argv)
  const slugs = listSkillDirs()
  if (!slugs.length) {
    console.error("Pack vazio: nenhuma skill em skills/")
    process.exit(1)
  }

  console.log(`
${BOLD}${GREEN}Dino Skills · install${RESET}
${DIM}Copiando ${slugs.length} skills →${RESET}
  ${target}
`)

  let ok = 0
  for (const slug of slugs) {
    const src = path.join(SKILLS_DIR, slug)
    const dest = path.join(target, slug)
    copyDir(src, dest)
    ok++
    console.log(`  ${GREEN}✓${RESET} ${slug}`)
  }

  console.log(`
${BOLD}${ok} skills instaladas${RESET}

${CYAN}Próximo passo${RESET}
  npx dino-skills start
  # ou peça pro agent: "usa dino-skills-root e escolhe a skill certa"

${DIM}Pastas úteis${RESET}
  projeto:  npx dino-skills install
  global:   npx dino-skills install --global
  custom:   npx dino-skills install --dir ./minhas-skills
`)
}

function cmdStart() {
  const cat = loadCatalog()
  const n = cat.skills?.length ?? listSkillDirs().length
  console.log(`
${BOLD}${GREEN}Dino Skills${RESET} · pack npm (${n} skills)

${CYAN}1) Baixar o pack (se ainda não instalou)${RESET}
  npx dino-skills install

${CYAN}2) Protocol (escolher skill)${RESET}
  1. Decide se a task precisa de skill do pack
  2. Se não, retorna no skill needed
  3. Identifica a category (dev / design / marketing / social)
  4. Inspeciona: npx dino-skills list --category <cat>
  5. Escolhe o menor set útil (prefer 1 skill)
  6. Carrega: npx dino-skills get <slug>
  7. Implementa com esse contexto

${CYAN}CLI${RESET}
  npx dino-skills install
  npx dino-skills categories
  npx dino-skills list
  npx dino-skills get dino-review
  npx dino-skills get revops

${DIM}Catalog → https://dino-platform.vercel.app${RESET}
`)
}

function parseListArgs(argv) {
  let category = null
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--category" || argv[i] === "-c") {
      category = argv[i + 1] ?? null
      i++
    }
  }
  return { category }
}

function cmdList(argv) {
  const { category } = parseListArgs(argv)
  const cat = loadCatalog()
  let skills = cat.skills?.length
    ? cat.skills
    : listSkillDirs().map((id) => ({ id, ...readMeta(id) }))

  if (category) {
    skills = skills.filter(
      (s) => (s.category || "").toLowerCase() === category.toLowerCase(),
    )
  }

  if (!skills.length) {
    console.log(
      category
        ? `Nenhuma skill em category="${category}".`
        : "Nenhuma skill neste pack.",
    )
    return
  }

  const label = category ? ` · ${category}` : ""
  console.log(`\n${BOLD}Skills (${skills.length}${label})${RESET}\n`)
  for (const s of skills) {
    const id = s.id || s.slug
    const meta = readMeta(id)
    console.log(`  ${GREEN}${id}${RESET}`)
    if (s.source || s.category) {
      console.log(
        `    ${DIM}${[s.source, s.category].filter(Boolean).join(" · ")}${RESET}`,
      )
    }
    const desc = s.description || meta?.description
    if (desc) console.log(`    ${DIM}${desc}${RESET}`)
    console.log()
  }
}

function cmdCategories() {
  const cat = loadCatalog()
  const skills = cat.skills || []
  const counts = {}
  for (const s of skills) {
    const c = s.category || "other"
    counts[c] = (counts[c] || 0) + 1
  }
  console.log(`\n${BOLD}Categories${RESET}\n`)
  for (const [c, n] of Object.entries(counts).sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    console.log(`  ${CYAN}${c.padEnd(14)}${RESET} ${n}`)
  }
  console.log(`\n  ${DIM}total ${skills.length}${RESET}\n`)
  console.log(`${YELLOW}npx dino-skills list --category marketing${RESET}\n`)
}

function cmdGet(slug) {
  if (!slug) {
    console.error("Usage: npx dino-skills get <slug>")
    process.exit(1)
  }
  const m = readMeta(slug)
  if (!m) {
    console.error(`Skill não encontrada: ${slug}`)
    console.error(`Tenta: npx dino-skills list`)
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

const argv = process.argv.slice(2)
const [cmd, ...rest] = argv

switch (cmd) {
  case "install":
  case "i":
  case "add":
    cmdInstall(rest)
    break
  case "start":
  case undefined:
    cmdStart()
    break
  case "list":
  case "ls":
    cmdList(rest)
    break
  case "categories":
  case "cats":
    cmdCategories()
    break
  case "get":
    cmdGet(rest[0])
    break
  case "path":
    cmdPath(rest[0])
    break
  case "help":
  case "-h":
  case "--help":
    printHelp()
    break
  default:
    if (fs.existsSync(path.join(SKILLS_DIR, cmd, "SKILL.md"))) {
      cmdGet(cmd)
    } else {
      console.error(`Unknown command: ${cmd}`)
      printHelp()
      process.exit(1)
    }
}
