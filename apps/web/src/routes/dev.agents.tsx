import { createFileRoute, Link } from "@tanstack/react-router"
import { api, getApiBaseUrl } from "~/lib/api"

export const Route = createFileRoute("/dev/agents")({
  loader: async () => {
    const { data, error } = await api.agents.get()
    if (error || !data) {
      return {
        ok: false as const,
        apiUrl: getApiBaseUrl(),
        message:
          error?.value && typeof error.value === "object"
            ? JSON.stringify(error.value)
            : "API unreachable. Local: bun run --filter @dino/api dev",
      }
    }
    return {
      ok: true as const,
      apiUrl: getApiBaseUrl(),
      note: data.note,
      agents: data.agents,
    }
  },
  component: DevAgentsPage,
})

function DevAgentsPage() {
  const data = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-[var(--soft)] px-4 py-8 text-[var(--ink)]">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow m-0">Dev only</p>
            <h1 className="mt-1 text-3xl font-bold">Native agents</h1>
          </div>
          <div className="flex gap-3 text-sm font-bold">
            <Link to="/" className="text-[var(--green-dark)] underline">
              ← Clube home
            </Link>
            <Link to="/dev/runs" className="text-[var(--green-dark)] underline">
              Runs
            </Link>
          </div>
        </div>

        <p className="m-0 max-w-2xl text-[var(--muted)]">
          Console de agents nativos (Grok/Cursor) + Eden Treaty. Não é a
          homepage do produto.
        </p>
        <p className="m-0 text-xs text-[var(--muted)]">API: {data.apiUrl}</p>

        {!data.ok ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
            {data.message}
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--green-dark)]">{data.note}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {data.agents.map((agent) => (
                <li key={agent.id}>
                  <Link
                    to="/dev/agents/$id"
                    params={{ id: agent.id }}
                    className="block rounded-xl border border-[var(--line)] bg-white p-4 shadow-sm transition hover:border-[var(--green)]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-bold">{agent.name}</h2>
                      <span className="rounded bg-[var(--soft)] px-1.5 py-0.5 text-[10px] uppercase">
                        {agent.runtime}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {agent.description}
                    </p>
                    <p className="mt-3 text-xs text-[var(--muted)]">
                      {agent.capabilities.join(" · ")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
