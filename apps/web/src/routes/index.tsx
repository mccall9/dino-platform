import { createFileRoute, Link } from "@tanstack/react-router"
import * as React from "react"
import {
  AGENTS_CATALOG,
  type AgentCatalogEntry,
} from "@dino/shared"
import { api, getApiBaseUrl } from "~/lib/api"

export const Route = createFileRoute("/")({
  loader: async () => {
    const { data, error } = await api.agents.get()
    if (error || !data?.agents?.length) {
      return {
        fromApi: false as const,
        apiUrl: getApiBaseUrl(),
        agents: AGENTS_CATALOG as AgentCatalogEntry[],
      }
    }
    return {
      fromApi: true as const,
      apiUrl: getApiBaseUrl(),
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

  React.useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    html.classList.add("page-lock")
    body.classList.add("page-lock")
    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
      html.classList.remove("page-lock")
      body.classList.remove("page-lock")
    }
  }, [])

  return (
    <div className="home-lock">
      <section className="hero hero-compact" aria-labelledby="hero-title">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Agents nativos · Bun · Elysia · Start
        </div>
        <h1 id="hero-title" className="hero-title">
          Your agents. <span className="hero-accent">Organized.</span>
        </h1>
        <p className="hero-lead">
          Console de agents e skills — separado do dino.blog.
        </p>
        <div className="hero-actions">
          <Link to="/skills" className="btn btn-primary">
            Ver skills →
          </Link>
          <Link to="/runs" className="btn btn-ghost">
            Runs
          </Link>
        </div>
      </section>

      <section className="home-agents" aria-label="Agents">
        <ul className="card-grid card-grid-home">
          {data.agents.map((agent) => (
            <li key={agent.id}>
              <Link
                to="/agents/$id"
                params={{ id: agent.id }}
                className="surface-card surface-card-compact liquid-glass"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="card-title">{agent.name}</h2>
                  {agent.hasExecuteRecipe ? (
                    <span className="badge badge-amber">recipe</span>
                  ) : (
                    <span className="badge badge-green">nativo</span>
                  )}
                </div>
                <p className="card-desc">{agent.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
