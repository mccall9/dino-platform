import { existsSync } from "node:fs"
import { resolve } from "node:path"
import type { CreateAgentRunInput } from "@dino/shared"
import type { AgentRunner, NativeAgentSpec, StubRunResult } from "./types"

const LOG_CAP = 24_000

export function resolveProductCwd(inputCwd?: string): string | null {
  const raw =
    inputCwd?.trim() ||
    process.env.DINO_PRODUCT_ROOT?.trim() ||
    ""
  if (!raw) return null
  const abs = resolve(raw)
  return existsSync(abs) ? abs : null
}

function buildDispatch(
  agent: NativeAgentSpec,
  input: CreateAgentRunInput,
  cwdLabel: string,
): Pick<StubRunResult, "reportMarkdown" | "artifacts" | "dispatchHint"> {
  const caps = agent.capabilities.join(", ")
  const reportMarkdown = [
    `## Native agent dispatch: \`${agent.id}\``,
    "",
    `**Runtime:** native (Grok/Cursor) — not ChatGPT/OpenAI API`,
    `**Capabilities:** ${caps}`,
    `**Source:** \`${agent.sourcePath}\``,
    `**Cwd:** ${cwdLabel}`,
    "",
    "### Task",
    "",
    input.prompt.trim() || "_(empty prompt)_",
    "",
    "### How to execute (native host)",
    "",
    "1. Open the product repo (dino.blog).",
    `2. Load agent: \`${agent.sourcePath}\` (or \`.cursor/agents/\` twin).`,
    "3. Paste the task; allow **execute** for shell/tests.",
    "4. Respect scope / forbidden paths.",
    "",
    "### Scope",
    "",
    ...agent.scope.map((s) => `- ${s}`),
    ...(agent.forbidden?.length
      ? ["", "### Forbidden", "", ...agent.forbidden.map((f) => `- ${f}`)]
      : []),
  ].join("\n")

  return {
    reportMarkdown,
    artifacts: [agent.sourcePath],
    dispatchHint: [
      `native://${agent.id}`,
      `source=${agent.sourcePath}`,
      `prompt=${JSON.stringify(input.prompt)}`,
    ].join(" "),
  }
}

function spawnArgv(argv: string[]): string[] {
  // Windows: Bun cannot uv_spawn bare `npm` — use cmd /c so .cmd shims resolve.
  if (process.platform === "win32") {
    return ["cmd", "/c", argv.join(" ")]
  }
  return argv
}

async function runShell(
  cwd: string,
  argv: string[],
  timeoutMs: number,
): Promise<{ exitCode: number; logs: string }> {
  const spawnArgs = spawnArgv(argv)
  const proc = Bun.spawn(spawnArgs, {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env, FORCE_COLOR: "0", CI: "1" },
  })

  const timer = setTimeout(() => {
    try {
      proc.kill()
    } catch {
      /* ignore */
    }
  }, timeoutMs)

  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  clearTimeout(timer)

  let logs = [`$ ${argv.join(" ")}`, "", stdout, stderr].join("\n").trim()
  if (logs.length > LOG_CAP) {
    logs = `${logs.slice(0, LOG_CAP)}\n\n…[truncated]…`
  }
  return { exitCode, logs }
}

/**
 * Native-only runner.
 * - Always builds a dispatch package for Grok/Cursor.
 * - If execute=true + agent has executeCommand + valid cwd → runs shell locally.
 * - Never calls OpenAI / ChatGPT / external LLM APIs.
 */
export const nativeDispatchRunner: AgentRunner = async (
  agent: NativeAgentSpec,
  input: CreateAgentRunInput,
): Promise<StubRunResult> => {
  const cwd = resolveProductCwd(input.cwd)
  const cwdLabel =
    cwd ??
    (input.cwd?.trim() ||
      process.env.DINO_PRODUCT_ROOT ||
      "(no product cwd)")
  const base = buildDispatch(agent, input, cwdLabel)

  const hasRecipe = Boolean(agent.executeCommand)
  const canExecute = agent.capabilities.includes("execute") && hasRecipe
  const wantExecute = input.execute !== false && canExecute

  if (!wantExecute) {
    const reason = !hasRecipe
      ? "_No shell recipe for this agent — dispatch only. Load native agent in TUI to work._"
      : input.execute === false
        ? "_Execute skipped (execute=false)._"
        : "_Execute skipped._"
    return {
      ...base,
      executed: false,
      reportMarkdown: [
        base.reportMarkdown,
        "",
        "### Execute",
        "",
        reason,
      ].join("\n"),
    }
  }

  if (!cwd) {
    return {
      ...base,
      executed: false,
      exitCode: 1,
      reportMarkdown: [
        base.reportMarkdown,
        "",
        "### Execute",
        "",
        "❌ **No valid product cwd.** Set `cwd` on the run or env `DINO_PRODUCT_ROOT`.",
      ].join("\n"),
    }
  }

  const recipe = agent.executeCommand!
  const { exitCode, logs } = await runShell(
    cwd,
    recipe.argv,
    recipe.timeoutMs ?? 180_000,
  )

  const ok = exitCode === 0
  return {
    ...base,
    executed: true,
    exitCode,
    logs,
    artifacts: [...base.artifacts, ...(ok ? [] : ["execute-failed"])],
    reportMarkdown: [
      base.reportMarkdown,
      "",
      "### Execute (native shell)",
      "",
      `**Recipe:** ${recipe.label}`,
      `**Command:** \`${recipe.argv.join(" ")}\``,
      `**Cwd:** \`${cwd}\``,
      `**Exit:** ${exitCode} ${ok ? "✅" : "❌"}`,
      "",
      "```text",
      logs || "(no output)",
      "```",
    ].join("\n"),
  }
}

export async function runNativeAgent(
  agent: NativeAgentSpec,
  input: CreateAgentRunInput,
  runner: AgentRunner = nativeDispatchRunner,
): Promise<StubRunResult> {
  return runner(agent, input)
}
