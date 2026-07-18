import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router"
import { Check, Copy } from "lucide-react"
import * as React from "react"
import {
  RUNTIMES_CATALOG,
  type RuntimeId,
  type SkillCategory,
} from "@dino/shared"
import { AgentIcon } from "~/components/AgentIcon"
import { AgentsMaintenance } from "~/components/AgentsMaintenance"
import { SourceChip } from "~/components/SourceChip"
import { AGENTS_LIVE } from "~/lib/feature-flags"
import { skillsForRuntimeTopic } from "~/lib/runtimes"

const IDS = new Set(RUNTIMES_CATALOG.map((r) => r.id))

const TOPIC_LABEL: Record<string, string> = {
  all: "All",
  developers: "Dev",
  designers: "Design",
  marketing: "Marketing",
  social: "Social",
}

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
      others: RUNTIMES_CATALOG.filter((r) => r.id !== runtime.id).slice(0, 4),
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
        content: loaderData?.runtime.description ?? "AI coding agent",
      },
    ],
  }),
  component: RuntimeDetailPage,
})

function RuntimeDetailPage() {
  const { runtime, prev, next, others } = Route.useLoaderData()
  const [topic, setTopic] = React.useState<SkillCategory | "all">("all")
  const [copied, setCopied] = React.useState<"cmd" | "prompt" | null>(null)

  if (!AGENTS_LIVE) {
    return (
      <div className="ds-discover">
        <nav className="sk-crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/runtimes">Agents</Link>
          <span>/</span>
          <span className="sk-crumb-current">{runtime.name}</span>
        </nav>
        <AgentsMaintenance />
        <footer className="ds-footer">
          <p>
            <Link to="/">← Skills</Link>
          </p>
        </footer>
      </div>
    )
  }

  const topics: Array<SkillCategory | "all"> = [
    "all",
    ...(runtime.topics as SkillCategory[]),
  ]
  // unique
  const topicList = [...new Set(topics)]

  const skills = skillsForRuntimeTopic(runtime.id, topic)

  async function copy(text: string, which: "cmd" | "prompt") {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(which)
      window.setTimeout(() => setCopied(null), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <article className="sk-detail sk-detail-agent ds-agent-detail">
      <nav className="sk-crumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/runtimes">Agents</Link>
        <span>/</span>
        <span className="sk-crumb-current">{runtime.name}</span>
      </nav>

      <header className="sk-detail-head">
        <div className="sk-title-row ds-agent-title-row">
          <AgentIcon id={runtime.id} accent={runtime.accent} size="lg" />
          <h1>{runtime.name}</h1>
        </div>

        <p className="sk-desc">{runtime.description}</p>
        {runtime.detail ? (
          <p className="sk-desc sk-desc-soft">{runtime.detail}</p>
        ) : null}
        {runtime.bestFor ? (
          <p className="ds-agent-bestfor">
            Most relevant when you’re working on{" "}
            <strong>{runtime.bestFor}</strong>.
          </p>
        ) : null}
      </header>

      <section className="ds-howto ds-howto-agent" aria-labelledby="rt-howto">
        <h2 id="rt-howto">How to use</h2>
        <p>
          Ask your agent to run the CLI first so it can choose the right skill
          before making changes.
        </p>
        <button
          type="button"
          className="ds-cmd"
          onClick={() => copy(runtime.howTo, "cmd")}
          aria-label="Copiar install"
        >
          <code>
            <span className="tok-cmd">npx</span>{" "}
            <span className="tok-sub">dino-skills</span>{" "}
            <span className="tok-sub">
              {runtime.howTo.includes("install")
                ? runtime.howTo.replace(/^npx dino-skills\s+/, "")
                : "install"}
            </span>
          </code>
          <span className="ds-cmd-icon" aria-hidden>
            {copied === "cmd" ? <Check size={15} /> : <Copy size={15} />}
          </span>
        </button>
        <button
          type="button"
          className="ds-cmd ds-cmd-secondary"
          onClick={() => copy(runtime.howToPrompt, "prompt")}
          aria-label="Copiar prompt"
        >
          <code>{runtime.howToPrompt}</code>
          <span className="ds-cmd-icon" aria-hidden>
            {copied === "prompt" ? <Check size={15} /> : <Copy size={15} />}
          </span>
        </button>
        <p className="ds-howto-foot">
          Or browse the collection below for the best skills for this agent.
        </p>
      </section>

      <section className="ds-agent-topics" aria-labelledby="rt-topics">
        <h2 id="rt-topics">Explore topics</h2>
        <div className="ds-filters ds-filters-left" role="list">
          {topicList.map((t) => (
            <button
              key={t}
              type="button"
              role="listitem"
              className="ds-chip"
              data-active={topic === t ? "true" : "false"}
              onClick={() => setTopic(t)}
            >
              {TOPIC_LABEL[t] ?? t}
            </button>
          ))}
        </div>

        <ul className="sk-related-grid ds-agent-skills-grid">
          {skills.map((s) => (
            <li key={s.id}>
              <Link
                to="/skills/$id"
                params={{ id: s.id }}
                className="sk-related-card"
              >
                <span className="sk-related-id">{s.id}</span>
                <span className="sk-related-desc">{s.description}</span>
                <span className="ds-card-foot" style={{ marginTop: "0.35rem" }}>
                  <SourceChip source={s.source} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {skills.length === 0 ? (
          <p className="ds-empty">Nenhuma skill nesse tópico.</p>
        ) : null}
      </section>

      {others.length > 0 ? (
        <section className="ds-other-agents" aria-labelledby="rt-others">
          <h2 id="rt-others">Other agents</h2>
          <ul className="ds-grid ds-grid-2">
            {others.map((rt) => (
              <li key={rt.id}>
                <Link
                  to="/runtimes/$id"
                  params={{ id: rt.id }}
                  className="ds-card ds-card-agent"
                >
                  <div className="ds-agent-card-top">
                    <AgentIcon id={rt.id} accent={rt.accent} size="sm" />
                    <h3 className="ds-card-id">{rt.name}</h3>
                  </div>
                  <p>{rt.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

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
