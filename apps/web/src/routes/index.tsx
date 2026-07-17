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
      {/* Hero — Aura structure, light green brand */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Agents nativos · Bun · Elysia · Start
        </div>
        <h1 id="hero-title" className="hero-title">
          Your agents.
          <br />
          <span className="hero-accent">Organized.</span>
        </h1>
        <p className="hero-lead">
          Console para agents nativos, skills e recipes — separado do site do
          clube em dino.blog.
        </p>
        <div className="hero-actions">
          <Link to="/skills" className="btn btn-primary">
            Ver skills →
          </Link>
          <Link to="/runs" className="btn btn-ghost">
            Histórico de runs
          </Link>
        </div>
        <p className="hero-hint">
          {data.fromApi ? "API conectada" : "Pronto para explorar"}
        </p>
      </section>

      {/* Soft status strip */}
      <div className="status-strip liquid-glass" aria-hidden="true">
        <div className="flex items-center">
          <div className="status-dots">
            <span className="r" />
            <span className="y" />
            <span className="g" />
          </div>
          <strong>dino-platform</strong>
          <span className="ml-2 hidden sm:inline">— console de agents</span>
        </div>
        <span>{data.fromApi ? "ao vivo" : "catálogo"}</span>
      </div>

      {/* Product: agent grid */}
      <section className="section" aria-labelledby="agents-label">
        <p id="agents-label" className="section-label">
          Agents
        </p>
        <p className="page-note mb-4">{data.note}</p>
        {data.productRoot ? (
          <p className="page-meta font-mono mb-4">
            DINO_PRODUCT_ROOT: {data.productRoot}
          </p>
        ) : null}

        <ul className="card-grid card-grid-3">
          {data.agents.map((agent) => (
            <li key={agent.id}>
              <Link
                to="/agents/$id"
                params={{ id: agent.id }}
                className="surface-card liquid-glass"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="card-title">{agent.name}</h2>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="badge badge-green">nativo</span>
                    {agent.hasExecuteRecipe ? (
                      <span className="badge badge-amber">recipe</span>
                    ) : null}
                  </div>
                </div>
                <p className="card-desc">{agent.description}</p>
                <p className="card-link">abrir agent →</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
