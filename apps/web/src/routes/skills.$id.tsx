import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { Check, Copy, ExternalLink } from "lucide-react"
import * as React from "react"
import { SKILLS_CATALOG, SKILLS_CONTENT } from "@dino/shared"
import { SkillSearch } from "~/components/SkillSearch"
import {
  SkillMarkdown,
  buildFallbackSkillMd,
  resolveInstallCmd,
} from "~/lib/skill-md"

export const Route = createFileRoute("/skills/$id")({
  loader: ({ params }) => {
    const skill = SKILLS_CATALOG.find((s) => s.id === params.id)
    if (!skill) throw notFound()
    const idx = SKILLS_CATALOG.findIndex((s) => s.id === params.id)
    return {
      skill,
      idx,
      prev: idx > 0 ? SKILLS_CATALOG[idx - 1] : null,
      next: idx < SKILLS_CATALOG.length - 1 ? SKILLS_CATALOG[idx + 1] : null,
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
  const { skill, prev, next } = Route.useLoaderData()
  const installCmd = resolveInstallCmd(skill)
  const md =
    SKILLS_CONTENT[skill.id] ??
    buildFallbackSkillMd(skill)

  const [copiedInstall, setCopiedInstall] = React.useState(false)
  const [copiedMd, setCopiedMd] = React.useState(false)

  async function copy(text: string, which: "install" | "md") {
    try {
      await navigator.clipboard.writeText(text)
      if (which === "install") {
        setCopiedInstall(true)
        window.setTimeout(() => setCopiedInstall(false), 1600)
      } else {
        setCopiedMd(true)
        window.setTimeout(() => setCopiedMd(false), 1600)
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="ds-shell">
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
              onClick={() => copy(installCmd, "install")}
              aria-label="Copiar comando de install"
            >
              <InstallHighlight cmd={installCmd} />
              <span className="sk-copy-ico" aria-hidden>
                {copiedInstall ? <Check size={15} /> : <Copy size={15} />}
              </span>
            </button>
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
  // Color first tokens like: npx skills add URL --skill name
  const parts = cmd.split(/(\s+)/)
  return (
    <code className="sk-install-code">
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) return <React.Fragment key={i}>{part}</React.Fragment>
        const lower = part.toLowerCase()
        if (i === 0 || lower === "npx" || lower === "bun" || lower === "npm") {
          return (
            <span key={i} className="tok-cmd">
              {part}
            </span>
          )
        }
        if (lower === "skills" || lower === "add" || lower === "install" || lower === "plugin") {
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

