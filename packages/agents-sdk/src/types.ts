import type {
  AgentCapability,
  AgentDefinition,
  CreateAgentRunInput,
} from "@dino/shared"

export type NativeAgentSpec = AgentDefinition & {
  /** Zones the agent may edit (anti-conflict). */
  scope: string[]
  /** Paths/topics the agent must not touch unless explicitly asked. */
  forbidden?: string[]
  /**
   * Optional native shell recipe (no LLM).
   * argv is relative to product cwd. Windows-safe via Bun.spawn.
   */
  executeCommand?: {
    /** Human label in report */
    label: string
    /** Command argv, e.g. ["npm", "test"] */
    argv: string[]
    /** Max ms before kill (default 180_000) */
    timeoutMs?: number
  }
}

export type StubRunResult = {
  reportMarkdown: string
  artifacts: string[]
  dispatchHint: string
  executed?: boolean
  exitCode?: number
  logs?: string
}

export type AgentRunner = (
  agent: NativeAgentSpec,
  input: CreateAgentRunInput,
) => Promise<StubRunResult> | StubRunResult

export type { AgentCapability, AgentDefinition, CreateAgentRunInput }
