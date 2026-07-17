import { createFileRoute, Link } from "@tanstack/react-router"
import * as React from "react"
import { api } from "~/lib/api"

export const Route = createFileRoute("/agents/$id")({
  loader: async ({ params }) => {
    const { data, error } = await api.agents({ id: params.id }).get()
    if (error || !data || "error" in data) {
      return {
        ok: false as const,
        id: params.id,
        message:
          data && "error" in data
            ? String(data.error)
            : "Failed to load agent",
      }
    }
    return { ok: true as const, agent: data }
  },
  component: AgentDetail,
})

type RunMeta = {
  status: string
  executed?: boolean
  exitCode?: number
  runId?: string
}

function AgentDetail() {
  const data = Route.useLoaderData()
  const [prompt, setPrompt] = React.useState("")
  const [cwd, setCwd] = React.useState("")
  const [execute, setExecute] = React.useState(true)
  const [busy, setBusy] = React.useState(false)
  const [result, setResult] = React.useState<string | null>(null)
  const [meta, setMeta] = React.useState<RunMeta | null>(null)
  const [err, setErr] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (data.ok && "productRoot" in data.agent && data.agent.productRoot) {
      setCwd(String(data.agent.productRoot))
    }
  }, [data])

  if (!data.ok) {
    return (
      <div className="space-y-4">
        <Link to="/" className="text-sm text-emerald-700">
          ← Agents
        </Link>
        <p className="text-red-600">{data.message}</p>
      </div>
    )
  }

  const { agent } = data
  const hasRecipe =
    "hasExecuteRecipe" in agent && Boolean(agent.hasExecuteRecipe)

  async function onRun(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setErr(null)
    setResult(null)
    setMeta(null)
    try {
      const { data: run, error } = await api.agents({ id: agent.id }).runs.post({
        prompt,
        cwd: cwd.trim() || undefined,
        execute,
      })
      if (error || !run || "error" in run) {
        setErr(
          run && "error" in run ? String(run.error) : "Run failed",
        )
        return
      }
      setMeta({
        status: run.status,
        executed: run.output?.executed,
        exitCode: run.output?.exitCode,
        runId: run.id,
      })
      setResult(
        run.output?.reportMarkdown ??
          `status: ${run.status}\n${JSON.stringify(run, null, 2)}`,
      )
      if (run.status === "failed" && run.error) {
        setErr(run.error)
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
      >
        ← Agents
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {agent.name}
          </h1>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            {agent.runtime}
          </span>
          {agent.capabilities.map((c) => (
            <span
              key={c}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {c}
            </span>
          ))}
          {hasRecipe ? (
            <span className="rounded bg-amber-50 px-2 py-0.5 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-100">
              recipe:{" "}
              {"executeLabel" in agent ? String(agent.executeLabel) : "shell"}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {agent.description}
        </p>
        <p className="mt-1 font-mono text-xs text-gray-500">
          {agent.sourcePath}
        </p>
      </div>

      {"scope" in agent && Array.isArray(agent.scope) ? (
        <div>
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Scope
          </h2>
          <ul className="mt-1 list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
            {agent.scope.map((s: string) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <form onSubmit={onRun} className="space-y-3">
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
          Task (native agent — never ChatGPT API)
          <textarea
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-900"
            rows={4}
            required
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              agent.id === "ship-check"
                ? "Rodar smoke Playwright e reportar bloqueios de ship"
                : "Describe what the native agent should do…"
            }
          />
        </label>
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
          Product cwd (dino.blog)
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-xs dark:border-gray-700 dark:bg-gray-900"
            value={cwd}
            onChange={(e) => setCwd(e.target.value)}
            placeholder="C:\Users\…\Desktop\build in public"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={execute}
            onChange={(e) => setExecute(e.target.checked)}
            disabled={!hasRecipe}
          />
          Execute native shell recipe
          {!hasRecipe
            ? " (indisponível — só dispatch para o TUI)"
            : " (ex.: npm test no ship-check)"}
        </label>
        <button
          type="submit"
          disabled={busy || !prompt.trim()}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {busy
            ? execute && hasRecipe
              ? "Executing…"
              : "Dispatching…"
            : execute && hasRecipe
              ? "Run native execute"
              : "Dispatch native run"}
        </button>
      </form>

      {meta ? (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
            status: {meta.status}
          </span>
          <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
            executed: {String(meta.executed ?? false)}
          </span>
          {typeof meta.exitCode === "number" ? (
            <span
              className={`rounded px-2 py-1 ${
                meta.exitCode === 0
                  ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
                  : "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100"
              }`}
            >
              exit: {meta.exitCode}
            </span>
          ) : null}
          {meta.runId ? (
            <span className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
              {meta.runId}
            </span>
          ) : null}
        </div>
      ) : null}

      {err ? (
        <pre className="overflow-x-auto rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          {err}
        </pre>
      ) : null}

      {result ? (
        <article className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            Report
          </h2>
          <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
            {result}
          </pre>
        </article>
      ) : null}
    </div>
  )
}
