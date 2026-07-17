import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

/** Absolute path to packages/agents-sdk/scripts */
export function agentsScriptsDir(): string {
  // src/scripts-path.ts → ../scripts
  const here = dirname(fileURLToPath(import.meta.url))
  return join(here, "..", "scripts")
}

export function scriptPath(name: string): string {
  return join(agentsScriptsDir(), name)
}
