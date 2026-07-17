import type { AgentRun } from "@dino/shared"

/** In-memory run store (v0). Replace with SQLite later. */
const runs = new Map<string, AgentRun>()

export function saveRun(run: AgentRun): AgentRun {
  runs.set(run.id, run)
  return run
}

export function getRun(id: string): AgentRun | undefined {
  return runs.get(id)
}

export function listRuns(): AgentRun[] {
  return [...runs.values()].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )
}

export function newId(): string {
  return crypto.randomUUID()
}
