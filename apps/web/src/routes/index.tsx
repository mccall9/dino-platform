import { createFileRoute, Link } from "@tanstack/react-router"
import {
  AGENTS_CATALOG,
  AGENTS_CATALOG_NOTE,
  type AgentCatalogEntry,
} from "@dino/shared"
import { api, getApiBaseUrl } from "~/lib/api"

export const Route = createFileRoute("/")({
  loader: async () => {
    const { data, error } = await api.agents.get()
    if (error || !data?.agents?.length) {
      // Production (Vercel) often has no API — show catalog, not a red error
      return {
        ok: true as const,
        fromApi: false as const,
        apiUrl: getApiBaseUrl(),
        note: AGENTS_CATALOG_NOTE,
        productRoot: null as string | null,
        agents: AGENTS_CATALOG as AgentCatalogEntry[],
      }
    }
    return {
      ok: true as const,
      fromApi: true as const,
      apiUrl: getApiBaseUrl(),
      note: data.note,
      productRoot:
        "productRoot" in data ? (data.productRoot as string | null) : null,
      agents: data.agents.map((a) => ({
        id: a.id,
        name: a.name,
        description: a.description,
        runtime: a.runtime as "native",
        capabilities: a.capabilities as AgentCatalogEntry["capabilities"],
        sourcePath: a.sourcePath,
        hasExecuteRecipe: Boolean(
          "hasExecuteRecipe" in a && a.hasExecuteRecipe,
        ),
      })),
    }
  },
  component: AgentsHome,
})

function AgentsHome() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Native agents</h1>
        <p className="page-lead">
          Console tipado via Eden Treaty →{" "}
          <code className="rounded-md bg-[var(--soft)] px-1.5 py-0.5 text-[0.85em]">
            /agents
          </code>
          . Stack playground (Bun · Elysia · Start · Tailwind).{" "}
          <strong className="font-semibold text-[var(--ink)]">
            Não é o site do dino.blog
          </strong>{" "}
          — o clube continua no repositório estático / dinoclub.blog.
        </p>
        <p className="page-meta">
          API: {data.apiUrl}
          {data.fromApi ? " · live" : " · catálogo embutido"}
        </p>
        {data.productRoot ? (
          <p className="page-meta font-mono">
            DINO_PRODUCT_ROOT: {data.productRoot}
          </p>
        ) : null}
      </div>

      <p className="page-note">{data.note}</p>

      <ul className="card-grid">
        {data.agents.map((agent) => (
          <li key={agent.id}>
            <Link
              to="/agents/$id"
              params={{ id: agent.id }}
              className="surface-card"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="card-title">{agent.name}</h2>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="badge">{agent.runtime}</span>
                  {agent.hasExecuteRecipe ? (
                    <span className="badge badge-amber">shell recipe</span>
                  ) : null}
                </div>
              </div>
              <p className="card-desc">{agent.description}</p>
              <p className="card-meta">
                caps: {agent.capabilities.join(" · ")}
              </p>
              <p className="card-meta font-mono">{agent.sourcePath}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
