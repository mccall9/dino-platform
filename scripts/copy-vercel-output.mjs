import { cpSync, existsSync, rmSync } from "node:fs"
import { join } from "node:path"

const src = join("apps", "web", ".vercel", "output")
const dest = join(".vercel", "output")

if (!existsSync(src)) {
  console.error("Missing Nitro Vercel output at", src)
  console.error("Run: cd apps/web && NITRO_PRESET=vercel bun run build")
  process.exit(1)
}

rmSync(dest, { recursive: true, force: true })
cpSync(src, dest, { recursive: true })
console.log("Copied", src, "→", dest)
