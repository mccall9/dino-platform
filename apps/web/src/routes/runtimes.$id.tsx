import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router"
import { Check, Copy, ExternalLink } from "lucide-react"
import * as React from "react"
import {
  RUNTIMES_CATALOG,
  type RuntimeId,
} from "@dino/shared"
import { skillsForRuntime } from "~/lib/runtimes"

const IDS = new Set(RUNTIMES_CATALOG.map((r) => r.id))

export const Route = createFileRoute("/runtimes/$id")({
  loader: ({ params }) => {
    if (!IDS.has(params.id as RuntimeId)) throw notFound()
    const runtime = RUNTIMES_CATALOG.find((r) => r.id === params.id)!
    const idx = RUNTIMES_CATALOG.findIndex((r) => r.id === params.id)
    return {
      runtime,
      skills: skillsForRuntime(runtime.id),
      prev: idx > 0 ? RUNTIMES_CATALOG[idx - 1] : null,
      next:
        idx < RUNTIMES_CATALOG.length - 1 ? RUNTIMES_CATALOG[idx + 1] : null,
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.runtime.name} · Agents · Dino`
          : "Agent · Dino",
      },
      {
        name: "description",
        content: loaderData?.runtime.description ?? "AI agent runtime",
      },
    ],
  }),
  component: RuntimeDetailPage,
})

function RuntimeDetailPage() {
  const { runtime, skills, prev, next } = Route.useLoaderData()
  const [copied, setCopied] = React.useState(false)

  async function copyHowTo() {
    try {
      await navigator.clipboard.writeText(runtime.howTo)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <article className="sk-detail sk-detail-agent">
      <nav className="sk-crumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/runtimes">Agents</Link>
        <span>/</span>
        <span className="sk-crumb-current">{runtime.id}</span>
      </nav>

      <header className="sk-detail-head">
        <div className="sk-title-row">
          <h1>{runtime.name}</h1>
          <a
            href={runtime.originUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sk-gh"
            aria-label="Abrir origem"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="sk-source-line">
          <i style={{ background: runtime.accent }} aria-hidden />
          <a
            href={runtime.originUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-source-link"
          >
            {runtime.origin}
          </a>
        </div>

        <p className="sk-desc">{runtime.description}</p>

        <div className="ds-agent-tags">
          {runtime.tags.map((t) => (
            <span key={t} className="ds-chip ds-chip-static">
              {t}
            </span>
          ))}
        </div>
      </header>

      <section className="sk-install" aria-labelledby="rt-howto">
        <h2 id="rt-howto">How to use with {runtime.shortName}</h2>
        <button
          type="button"
          className="sk-install-cmd"
          onClick={copyHowTo}
          aria-label="Copiar how-to"
        >
          <code className="sk-install-code">{runtime.howTo}</code>
          <span className="sk-copy-ico" aria-hidden>
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </span>
        </button>
        <p className="ds-howto-foot" style={{ marginTop: "0.75rem" }}>
          Pack:{" "}
          <code className="ds-inline-code">npx dino-skills install</code>
        </p>
      </section>

      <section className="sk-related" aria-labelledby="rt-skills">
        <h2 id="rt-skills">Skills for {runtime.shortName}</h2>
        <ul className="sk-related-grid">
          {skills.map((s) => (
            <li key={s.id}>
              <Link
                to="/skills/$id"
                params={{ id: s.id }}
                className="sk-related-card"
              >
                <span className="sk-related-id">{s.id}</span>
                <span className="sk-related-desc">{s.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="sk-pager">
        {prev ? (
          <Link
            to="/runtimes/$id"
            params={{ id: prev.id }}
            className="sk-pager-link"
          >
            <span>← anterior</span>
            <strong>{prev.name}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/runtimes/$id"
            params={{ id: next.id }}
            className="sk-pager-link is-next"
          >
            <span>próximo →</span>
            <strong>{next.name}</strong>
          </Link>
        ) : (
          <span />
        )}
      </footer>
    </article>
  )
}
