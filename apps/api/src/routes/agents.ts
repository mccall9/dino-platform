import { Elysia, t } from "elysia"
import {
  getAgent,
  listAgents,
  resolveProductCwd,
  runNativeAgent,
} from "@dino/agents-sdk"
import type { AgentRun } from "@dino/shared"
import { getRun, listRuns, newId, saveRun } from "../store"

export const agentsRoutes = new Elysia({ prefix: "/agents" })
  .get(
    "/",
    () => ({
      runtime: "native" as const,
      note: "Native Grok/Cursor agents only. No ChatGPT/OpenAI provider agents.",
      productRoot: resolveProductCwd() ?? process.env.DINO_PRODUCT_ROOT ?? null,
      agents: listAgents().map((a) => ({
        id: a.id,
        name: a.name,
        description: a.description,
        runtime: a.runtime,
        capabilities: a.capabilities,
        sourcePath: a.sourcePath,
        triggers: a.triggers,
        scope: a.scope,
        hasExecuteRecipe: Boolean(a.executeCommand),
        executeLabel: a.executeCommand?.label,
      })),
    }),
    {
      detail: {
        summary: "List native agents",
      },
    },
  )
  .get(
    "/runs",
    () => ({ runs: listRuns() }),
    {
      detail: { summary: "List agent runs" },
    },
  )
  .get(
    "/runs/:runId",
    ({ params, set }) => {
      const run = getRun(params.runId)
      if (!run) {
        set.status = 404
        return { error: "Run not found" }
      }
      return run
    },
    {
      params: t.Object({ runId: t.String() }),
    },
  )
  .post(
    "/runs/:runId/cancel",
    ({ params, set }) => {
      const run = getRun(params.runId)
      if (!run) {
        set.status = 404
        return { error: "Run not found" }
      }
      if (run.status === "succeeded" || run.status === "failed") {
        set.status = 409
        return { error: `Cannot cancel run in status ${run.status}` }
      }
      const updated: AgentRun = {
        ...run,
        status: "cancelled",
        updatedAt: new Date().toISOString(),
      }
      return saveRun(updated)
    },
    {
      params: t.Object({ runId: t.String() }),
    },
  )
  .get(
    "/:id",
    ({ params, set }) => {
      const agent = getAgent(params.id)
      if (!agent) {
        set.status = 404
        return { error: "Agent not found" }
      }
      return {
        id: agent.id,
        name: agent.name,
        description: agent.description,
        runtime: agent.runtime,
        capabilities: agent.capabilities,
        sourcePath: agent.sourcePath,
        triggers: agent.triggers,
        scope: agent.scope,
        forbidden: agent.forbidden,
        hasExecuteRecipe: Boolean(agent.executeCommand),
        executeLabel: agent.executeCommand?.label,
        productRoot: resolveProductCwd() ?? process.env.DINO_PRODUCT_ROOT ?? null,
      }
    },
    {
      params: t.Object({ id: t.String() }),
    },
  )
  .post(
    "/:id/runs",
    async ({ params, body, set }) => {
      const agent = getAgent(params.id)
      if (!agent) {
        set.status = 404
        return { error: "Agent not found" }
      }

      if (agent.runtime !== "native") {
        set.status = 400
        return {
          error:
            "Only native agents are allowed. External LLM API agents (ChatGPT, etc.) are disabled.",
        }
      }

      const now = new Date().toISOString()
      const run: AgentRun = {
        id: newId(),
        agentId: agent.id,
        status: "running",
        input: {
          prompt: body.prompt,
          cwd: body.cwd,
          context: body.context,
          execute: body.execute,
        },
        createdAt: now,
        updatedAt: now,
      }
      saveRun(run)

      try {
        const result = await runNativeAgent(agent, run.input)
        const failedExec =
          result.executed === true &&
          typeof result.exitCode === "number" &&
          result.exitCode !== 0
        const done: AgentRun = {
          ...run,
          status: failedExec ? "failed" : "succeeded",
          error: failedExec
            ? `Native execute exited ${result.exitCode}`
            : undefined,
          output: {
            reportMarkdown: result.reportMarkdown,
            artifacts: result.artifacts,
            dispatchHint: result.dispatchHint,
            executed: result.executed,
            exitCode: result.exitCode,
            logs: result.logs,
          },
          updatedAt: new Date().toISOString(),
        }
        return saveRun(done)
      } catch (err) {
        const failed: AgentRun = {
          ...run,
          status: "failed",
          error: err instanceof Error ? err.message : String(err),
          updatedAt: new Date().toISOString(),
        }
        return saveRun(failed)
      }
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Object({
        prompt: t.String({ minLength: 1 }),
        cwd: t.Optional(t.String()),
        context: t.Optional(t.Record(t.String(), t.Any())),
        execute: t.Optional(t.Boolean()),
      }),
    },
  )
