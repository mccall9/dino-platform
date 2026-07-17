import { createFileRoute, Link } from "@tanstack/react-router"
import { api } from "~/lib/api"

export const Route = createFileRoute("/runs")({
  loader: async () => {
    const { data, error } = await api.agents.runs.get()
    if (error || !data) {
      return {
        ok: false as const,
        message: "Could not load runs. Is the API up?",
      }
    }
    return { ok: true as const, runs: data.runs }
  },
  component: RunsPage,
})

function statusClass(status: string) {
  if (status === "succeeded")
    return "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
  if (status === "failed")
    return "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100"
  if (status === "running")
    return "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100"
  return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
}

function RunsPage() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Runs
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Histórico in-memory da API (reseta ao reiniciar o server). Native
          only — sem ChatGPT.
        </p>
      </div>

      {!data.ok ? (
        <p className="text-red-600">{data.message}</p>
      ) : data.runs.length === 0 ? (
        <p className="text-gray-500">
          Nenhuma run ainda.{" "}
          <Link to="/" className="text-emerald-700 underline">
            Dispare um agent
          </Link>
          .
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
          {data.runs.map((run) => (
            <li key={run.id} className="px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/agents/$id"
                  params={{ id: run.agentId }}
                  className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  {run.agentId}
                </Link>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${statusClass(run.status)}`}
                >
                  {run.status}
                </span>
                {run.output?.executed ? (
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                    executed
                    {typeof run.output.exitCode === "number"
                      ? ` · exit ${run.output.exitCode}`
                      : ""}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">dispatch</span>
                )}
                <span className="ml-auto font-mono text-[11px] text-gray-400">
                  {run.id.slice(0, 8)}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                {run.input.prompt}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(run.createdAt).toLocaleString()}
              </p>
              {run.error ? (
                <p className="mt-1 text-xs text-red-600">{run.error}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
