#!/usr/bin/env node
/**
 * Native shell recipe for supabase-guard agent.
 * Layout/migration presence only — does not hit remote DB. No LLM.
 */
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const cwd = process.cwd()
const must = [
  "supabase-client.js",
  "auth-service.js",
  "conversation-service.js",
  "community-service.js",
  "supabase/migrations",
]

const missing = must.filter((f) => !existsSync(join(cwd, f)))
let migrations = []
const migDir = join(cwd, "supabase", "migrations")
if (existsSync(migDir)) {
  migrations = readdirSync(migDir).filter((f) => f.endsWith(".sql"))
}

console.log("## supabase-guard layout verify")
console.log(`cwd: ${cwd}`)
console.log(
  missing.length === 0
    ? "core files: OK"
    : `core files MISSING: ${missing.join(", ")}`,
)
console.log(`migrations: ${migrations.length}`)
for (const m of migrations) console.log(`  - ${m}`)

if (missing.length || migrations.length === 0) {
  process.exit(1)
}
console.log("\nSupabase layout OK (local files only).")
