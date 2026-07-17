import { createFileRoute, Link } from "@tanstack/react-router"
import { api } from "~/lib/api"

export const Route = createFileRoute("/runs")({
  loader: async () => {
    const { data, error } = await api.agents.runs.get()
    if (error || !data) {
      return {
        ok: false as const,
        message: "Não foi possível carregar runs. A API está no ar?",
      }
    }
    return { ok: true as const, runs: data.runs }
  },
  component: RunsPage,
})

function statusBadge(status: string) {
  if (status === "succeeded") return "badge badge-green"
  if (status === "failed") return "badge"
  if (status === "running") return "badge badge-amber"
  return "badge"
}

function RunsPage() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Runs</h1>
        <p className="page-lead">
          Histórico in-memory da API (reseta ao reiniciar o server). Native
          only — sem ChatGPT.
        </p>
      </div>

      {!data.ok ? (
        <div className="surface-card">
          <p className="page-lead">
            Runs ficam na API em memória. Em produção na Vercel não há API —
            rode localmente com{" "}
            <code className="rounded-md bg-[var(--soft)] px-1.5 py-0.5 text-[0.85em]">
              bun run dev:api
            </code>
            .
          </p>
          <p className="page-meta">{data.message}</p>
        </div>
      ) : data.runs.length === 0 ? (
        <p className="page-meta">
          Nenhuma run ainda.{" "}
          <Link to="/" className="font-semibold text-[var(--green-dark)]">
            Dispare um agent
          </Link>
          .
        </p>
      ) : (
        <ul className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)]">
          {data.runs.map((run) => (
            <li
              key={run.id}
              className="border-b border-[var(--line)] px-4 py-3 last:border-b-0"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/agents/$id"
                  params={{ id: run.agentId }}
                  className="font-semibold text-[var(--green-dark)] hover:underline"
                >
                  {run.agentId}
                </Link>
                <span className={statusBadge(run.status)}>{run.status}</span>
                {run.output?.executed ? (
                  <span className="badge badge-amber">
                    executed
                    {typeof run.output.exitCode === "number"
                      ? ` · exit ${run.output.exitCode}`
                      : ""}
                  </span>
                ) : (
                  <span className="page-meta">dispatch</span>
                )}
                <span className="ml-auto font-mono text-[11px] text-[#8a8a8a]">
                  {run.id.slice(0, 8)}
                </span>
              </div>
              <p className="card-desc line-clamp-2">{run.input.prompt}</p>
              <p className="page-meta">
                {new Date(run.createdAt).toLocaleString()}
              </p>
              {run.error ? (
                <p className="mt-1 text-xs text-[#8b2e2e]">{run.error}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
