/** Shared contracts for native agents + API (no third-party LLM provider types). */

export type AgentRuntime = "native"

/** What the native agent host (Grok / Cursor) is allowed to do. */
export type AgentCapability = "read" | "write" | "execute"

export type AgentRunStatus =
  | "queued"
  | "dispatched"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled"

export type AgentDefinition = {
  id: string
  name: string
  description: string
  /** Always native — Grok/Cursor agents, never ChatGPT-style external API agents. */
  runtime: AgentRuntime
  capabilities: AgentCapability[]
  /** Relative path to the agent prompt file in the product repo. */
  sourcePath: string
  /** Optional slash / mention triggers. */
  triggers?: string[]
}

export type CreateAgentRunInput = {
  /** Free-text task for the native agent. */
  prompt: string
  /** Optional workspace root the agent should operate in. */
  cwd?: string
  /** Extra context (files, URLs) — host decides how to load. */
  context?: Record<string, unknown>
  /**
   * When true and agent has `execute`, run local shell scripts in cwd.
   * Never calls ChatGPT/OpenAI — only native workspace commands.
   */
  execute?: boolean
}

export type AgentRunOutput = {
  reportMarkdown?: string
  artifacts?: string[]
  /** Instruction for the native host (TUI / Cursor) if API only queued the job. */
  dispatchHint?: string
  /** Whether a local shell command ran (native execute). */
  executed?: boolean
  /** Shell exit code when executed. */
  exitCode?: number
  /** Truncated stdout+stderr from execute. */
  logs?: string
}

export type AgentRun = {
  id: string
  agentId: string
  status: AgentRunStatus
  input: CreateAgentRunInput
  output?: AgentRunOutput
  error?: string
  createdAt: string
  updatedAt: string
}

export type HealthResponse = {
  ok: true
  service: "dino-api"
  runtime: "bun"
  productRoot?: string | null
  agentsNote: string
}

/** Install / availability status for skills catalog (platform console). */
export type SkillStatus =
  | "local"
  | "installable"
  | "plugin-only"
  | "mcp-runtime"

export type SkillCategory =
  | "developers"
  | "designers"
  | "marketing"
  | "social"
  | "finance"
  | "small-business"
  | "legal"

export type SkillCatalogEntry = {
  id: string
  name: string
  description: string
  category: SkillCategory
  /** Public link when it exists; empty for local-only skills. */
  url?: string
  status: SkillStatus
  /** Short install / path hint. */
  install?: string
}

export type SkillsListResponse = {
  note: string
  skills: SkillCatalogEntry[]
}

export { SKILLS_CATALOG, SKILLS_CATALOG_NOTE } from "./skills-catalog"
export {
  AGENTS_CATALOG,
  AGENTS_CATALOG_NOTE,
  type AgentCatalogEntry,
} from "./agents-catalog"
