import {
  createFileRoute,
  Link,
  notFound,
  redirect,
} from "@tanstack/react-router"
import { Check, Copy, ExternalLink } from "lucide-react"
import * as React from "react"
import { SKILLS_CATALOG, SKILLS_CONTENT } from "@dino/shared"
import { SkillSearch } from "~/components/SkillSearch"
import {
  SkillMarkdown,
  buildFallbackSkillMd,
  resolveAltInstallCmd,
  resolveInstallCmd,
} from "~/lib/skill-md"

const ALIASES: Record<string, string> = {
  "marclou-review": "dino-review",
  marclou: "dino-review",
  revenue: "revops",
}

export const Route = createFileRoute("/skills/$id")({
  loader: ({ params }) => {
    const alias = ALIASES[params.id]
    if (alias) {
      throw redirect({ to: "/skills/$id", params: { id: alias } })
    }
    const skill = SKILLS_CATALOG.find((s) => s.id === params.id)
    if (!skill) throw notFound()
    const idx = SKILLS_CATALOG.findIndex((s) => s.id === params.id)
    const related = SKILLS_CATALOG.filter(
      (s) =>
        s.id !== skill.id &&
        skill.source &&
        s.source === skill.source,
    ).slice(0, 6)
    return {
      skill,
      idx,
      prev: idx > 0 ? SKILLS_CATALOG[idx - 1] : null,
      next: idx < SKILLS_CATALOG.length - 1 ? SKILLS_CATALOG[idx + 1] : null,
      related,
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.skill.id} · Dino Skills`
          : "Skill · Dino Skills",
      },
      {
        name: "description",
        content: loaderData?.skill.description ?? "Skill do setup do dino",
      },
    ],
  }),
  component: SkillDetailPage,
})

function SkillDetailPage() {
  const { skill, prev, next, related } = Route.useLoaderData()
  const installCmd = resolveInstallCmd(skill)
  const altInstall = resolveAltInstallCmd(skill)
  const md = SKILLS_CONTENT[skill.id] ?? buildFallbackSkillMd(skill)

  const [copiedInstall, setCopiedInstall] = React.useState<"main" | "alt" | null>(
    null,
  )
  const [copiedMd, setCopiedMd] = React.useState(false)

  async function copy(text: string, which: "main" | "alt" | "md") {
    try {
      await navigator.clipboard.writeText(text)
      if (which === "md") {
        setCopiedMd(true)
        window.setTimeout(() => setCopiedMd(false), 1600)
      } else {
        setCopiedInstall(which)
        window.setTimeout(() => setCopiedInstall(null), 1600)
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="ds-shell">
      <div className="ds-ambient" aria-hidden="true">
        <div className="ds-orb ds-orb-a" />
        <div className="ds-orb ds-orb-b" />
        <div className="ds-orb ds-orb-c" />
        <div className="ds-ambient-grid" />
        <div className="ds-ambient-vignette" />
      </div>

      <SkillSearch />

      <div className="ds-content">
        <article className="sk-detail">
          <nav className="sk-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/">Skills</Link>
            <span>/</span>
            <span className="sk-crumb-current">{skill.id}</span>
          </nav>

          <header className="sk-detail-head">
            <div className="sk-title-row">
              <h1>{skill.id}</h1>
              {skill.url ? (
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sk-gh"
                  aria-label="Abrir fonte"
                >
                  <ExternalLink size={16} />
                </a>
              ) : null}
            </div>

            <div className="sk-source-line">
              <i aria-hidden />
              <span>{skill.source ?? skill.category}</span>
            </div>

            <p className="sk-desc">{skill.description}</p>
          </header>

          <section className="sk-install" aria-labelledby="sk-install-title">
            <h2 id="sk-install-title">Install</h2>
            <button
              type="button"
              className="sk-install-cmd"
              onClick={() => copy(installCmd, "main")}
              aria-label="Copiar comando de install"
            >
              <InstallHighlight cmd={installCmd} />
              <span className="sk-copy-ico" aria-hidden>
                {copiedInstall === "main" ? (
                  <Check size={15} />
                ) : (
                  <Copy size={15} />
                )}
              </span>
            </button>
            {altInstall ? (
              <button
                type="button"
                className="sk-install-cmd sk-install-cmd-alt"
                onClick={() => copy(altInstall, "alt")}
                aria-label="Copiar comando alternativo"
              >
                <InstallHighlight cmd={altInstall} />
                <span className="sk-copy-ico" aria-hidden>
                  {copiedInstall === "alt" ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}
                </span>
              </button>
            ) : null}
          </section>

          <section className="sk-doc" aria-label={`SKILL.md de ${skill.id}`}>
            <button
              type="button"
              className="sk-doc-copy"
              onClick={() => copy(md, "md")}
            >
              {copiedMd ? "Copied" : "Copy"}
            </button>
            <SkillMarkdown source={md} />
          </section>

          {related.length > 0 ? (
            <section className="sk-related" aria-labelledby="sk-related-title">
              <h2 id="sk-related-title">
                More from {skill.source ?? "collection"}
              </h2>
              <ul className="sk-related-grid">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to="/skills/$id"
                      params={{ id: r.id }}
                      className="sk-related-card"
                    >
                      <span className="sk-related-id">
                        {skill.source ? `${skill.source}/${r.id}` : r.id}
                      </span>
                      <span className="sk-related-desc">{r.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <footer className="sk-pager">
            {prev ? (
              <Link
                to="/skills/$id"
                params={{ id: prev.id }}
                className="sk-pager-link"
              >
                <span>← anterior</span>
                <strong>{prev.id}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to="/skills/$id"
                params={{ id: next.id }}
                className="sk-pager-link is-next"
              >
                <span>próxima →</span>
                <strong>{next.id}</strong>
              </Link>
            ) : (
              <span />
            )}
          </footer>
        </article>
      </div>
    </div>
  )
}

function InstallHighlight({ cmd }: { cmd: string }) {
  const parts = cmd.split(/(\s+)/)
  return (
    <code className="sk-install-code">
      {parts.map((part, i) => {
        if (/^\s+$/.test(part))
          return <React.Fragment key={i}>{part}</React.Fragment>
        const lower = part.toLowerCase()
        if (
          i === 0 ||
          lower === "npx" ||
          lower === "bun" ||
          lower === "npm"
        ) {
          return (
            <span key={i} className="tok-cmd">
              {part}
            </span>
          )
        }
        if (
          lower === "skills" ||
          lower === "dino-skills" ||
          lower === "add" ||
          lower === "install" ||
          lower === "plugin" ||
          lower === "start" ||
          lower === "get" ||
          lower === "list"
        ) {
          return (
            <span key={i} className="tok-sub">
              {part}
            </span>
          )
        }
        if (part.startsWith("--")) {
          return (
            <span key={i} className="tok-flag">
              {part}
            </span>
          )
        }
        if (part.startsWith("http") || part.startsWith("github")) {
          return (
            <span key={i} className="tok-url">
              {part}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </code>
  )
}
