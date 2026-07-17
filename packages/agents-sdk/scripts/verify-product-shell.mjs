#!/usr/bin/env node
/**
 * Native shell recipe for product-shell agent.
 * Runs in product cwd (dino.blog). No LLM.
 */
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const cwd = process.cwd()
const required = [
  "index.html",
  "site-nav.js",
  "vercel.json",
  "robots.txt",
  "login.html",
  "feed.html",
  "package.json",
]

const missing = required.filter((f) => !existsSync(join(cwd, f)))
let vercelOk = false
let robotsOk = false
const notes = []

if (existsSync(join(cwd, "vercel.json"))) {
  try {
    const v = JSON.parse(readFileSync(join(cwd, "vercel.json"), "utf8"))
    vercelOk = Array.isArray(v.redirects) || Array.isArray(v.rewrites)
    if (!vercelOk) notes.push("vercel.json missing redirects/rewrites")
  } catch (e) {
    notes.push(`vercel.json parse error: ${e.message}`)
  }
}

if (existsSync(join(cwd, "robots.txt"))) {
  const robots = readFileSync(join(cwd, "robots.txt"), "utf8")
  const need = ["/login", "/feed", "/profile"]
  const missingDisallow = need.filter((p) => !robots.includes(p))
  robotsOk = missingDisallow.length === 0
  if (!robotsOk) notes.push(`robots.txt missing Disallow: ${missingDisallow.join(", ")}`)
}

console.log("## product-shell verify")
console.log(`cwd: ${cwd}`)
console.log(`files: ${missing.length === 0 ? "OK" : "MISSING " + missing.join(", ")}`)
console.log(`vercel: ${vercelOk ? "OK" : "CHECK"}`)
console.log(`robots private paths: ${robotsOk ? "OK" : "CHECK"}`)
for (const n of notes) console.log(`- ${n}`)

if (missing.length || !vercelOk || !robotsOk) {
  process.exit(1)
}
console.log("\nAll product-shell checks passed.")
