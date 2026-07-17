#!/usr/bin/env node
/**
 * Native shell recipe for content-builder agent.
 * Checks editorial content surfaces exist. No LLM.
 */
import { existsSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const cwd = process.cwd()
const files = ["CONTENT_IDEAS.md", "ideias.html", "post.html", "about.html"]
const missing = files.filter((f) => !existsSync(join(cwd, f)))

console.log("## content-builder verify")
console.log(`cwd: ${cwd}`)

for (const f of files) {
  const p = join(cwd, f)
  if (!existsSync(p)) {
    console.log(`❌ ${f}`)
    continue
  }
  const st = statSync(p)
  const sample = readFileSync(p, "utf8").slice(0, 80).replace(/\s+/g, " ")
  console.log(`✅ ${f} (${st.size}b) — ${sample}…`)
}

if (missing.length) {
  console.log(`\nMissing: ${missing.join(", ")}`)
  process.exit(1)
}
console.log("\nAll content surfaces present.")
