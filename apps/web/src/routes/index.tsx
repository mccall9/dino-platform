import { createFileRoute, Link } from "@tanstack/react-router"
import { api, getApiBaseUrl } from "~/lib/api"

export const Route = createFileRoute("/")({
  loader: async () => {
    const { data, error } = await api.agents.get()
    if (error || !data) {
      return {
        ok: false as const,
        apiUrl: getApiBaseUrl(),
        message:
          error?.value && typeof error.value === "object"
            ? JSON.stringify(error.value)
            : "API unreachable. Start apps/api on :3001 (local only).",
      }
    }
    return {
      ok: true as const,
      apiUrl: getApiBaseUrl(),
      runtime: data.runtime,
      note: data.note,
      productRoot:
        "productRoot" in data ? (data.productRoot as string | null) : null,
      agents: data.agents,
    }
  },
  component: AgentsHome,
})

function AgentsHome() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Native agents
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
          Console tipado via{" "}
          <code className="rounded bg-gray-100 px-1 text-sm dark:bg-gray-800">
            Eden Treaty
          </code>{" "}
          →{" "}
          <code className="rounded bg-gray-100 px-1 text-sm dark:bg-gray-800">
            /agents
          </code>
          . Stack playground (Bun · Elysia · Start · Tailwind).{" "}
          <strong>Não é o site do dino.blog</strong> — o clube continua no
          repositório estático / dinoclub.blog.
        </p>
        <p className="mt-1 text-xs text-gray-500">API: {data.apiUrl}</p>
        {data.ok && data.productRoot ? (
          <p className="mt-1 font-mono text-xs text-gray-500">
            DINO_PRODUCT_ROOT: {data.productRoot}
          </p>
        ) : null}
      </div>

      {!data.ok ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {data.message}
        </div>
      ) : (
        <>
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            {data.note}
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {data.agents.map((agent) => (
              <li key={agent.id}>
                <Link
                  to="/agents/$id"
                  params={{ id: agent.id }}
                  className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {agent.name}
                    </h2>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gray-600 dark:bg-gray-800">
                        {agent.runtime}
                      </span>
                      {"hasExecuteRecipe" in agent && agent.hasExecuteRecipe ? (
                        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                          shell recipe
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {agent.description}
                  </p>
                  <p className="mt-3 text-xs text-gray-500">
                    caps: {agent.capabilities.join(" · ")}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-gray-400">
                    {agent.sourcePath}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
