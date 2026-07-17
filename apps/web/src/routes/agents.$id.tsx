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
        <Link to="/" className="card-link">
          ← Agents
        </Link>
        <div className="alert alert-error">{data.message}</div>
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
        setErr(run && "error" in run ? String(run.error) : "Run failed")
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
      <Link to="/" className="card-link">
        ← Agents
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="page-title">{agent.name}</h1>
          <span className="badge badge-green">{agent.runtime}</span>
          {agent.capabilities.map((c) => (
            <span key={c} className="badge">
              {c}
            </span>
          ))}
          {hasRecipe ? (
            <span className="badge badge-amber">
              recipe:{" "}
              {"executeLabel" in agent ? String(agent.executeLabel) : "shell"}
            </span>
          ) : null}
        </div>
        <p className="page-lead">{agent.description}</p>
        <p className="page-meta font-mono">{agent.sourcePath}</p>
      </div>

      {"scope" in agent && Array.isArray(agent.scope) ? (
        <div className="surface-card">
          <h2 className="card-title">Scope</h2>
          <ul className="card-desc mt-2 list-inside list-disc">
            {agent.scope.map((s: string) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <form onSubmit={onRun} className="surface-card space-y-3">
        <label className="block text-sm font-semibold text-[var(--ink)]">
          Task (native agent — never ChatGPT API)
          <textarea
            className="textarea mt-1"
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
        <label className="block text-sm font-semibold text-[var(--ink)]">
          Product cwd (dino.blog)
          <input
            className="input mt-1 font-mono text-xs"
            value={cwd}
            onChange={(e) => setCwd(e.target.value)}
            placeholder="C:\Users\…\Desktop\build in public"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
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
          className="btn btn-primary disabled:opacity-50"
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
        <div className="flex flex-wrap gap-2">
          <span className="badge">status: {meta.status}</span>
          <span className="badge">
            executed: {String(meta.executed ?? false)}
          </span>
          {typeof meta.exitCode === "number" ? (
            <span
              className={
                meta.exitCode === 0 ? "badge badge-green" : "badge badge-amber"
              }
            >
              exit: {meta.exitCode}
            </span>
          ) : null}
          {meta.runId ? (
            <span className="badge font-mono">{meta.runId}</span>
          ) : null}
        </div>
      ) : null}

      {err ? (
        <pre className="alert alert-error overflow-x-auto whitespace-pre-wrap text-sm">
          {err}
        </pre>
      ) : null}

      {result ? (
        <article className="surface-card">
          <h2 className="card-title">Report</h2>
          <pre className="card-desc mt-2 max-h-[32rem] overflow-auto whitespace-pre-wrap">
            {result}
          </pre>
        </article>
      ) : null}
    </div>
  )
}
