import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { RUNTIMES_CATALOG } from "@dino/shared"
import { AgentIcon } from "~/components/AgentIcon"
import { AgentsMaintenance } from "~/components/AgentsMaintenance"
import { AGENTS_LIVE } from "~/lib/feature-flags"
import { useI18n } from "~/lib/i18n"
import { skillsForRuntime } from "~/lib/runtimes"

export const Route = createFileRoute("/runtimes/")({
  component: RuntimesCatalogPage,
  head: () => ({
    meta: [
      { title: AGENTS_LIVE ? "Agents · Dino Skills" : "Agents · Manutenção" },
      {
        name: "description",
        content: AGENTS_LIVE
          ? "Browse AI agents that support Dino Skills — Claude Code, Cursor, Codex, Copilot, and more."
          : "Área de Agents em manutenção.",
      },
    ],
  }),
})

function RuntimesCatalogPage() {
  const { t } = useI18n()

  if (!AGENTS_LIVE) {
    return (
      <div className="ds-discover">
        <nav className="sk-crumb" aria-label="Breadcrumb">
          <Link to="/">{t("nav.home")}</Link>
          <span>/</span>
          <span className="sk-crumb-current">{t("nav.agents")}</span>
        </nav>
        <AgentsMaintenance />
        <footer className="ds-footer">
          <p>
            <Link to="/">{t("agents.backSkills")}</Link>
          </p>
        </footer>
      </div>
    )
  }

  return (
    <div className="ds-discover ds-discover-agent">
      <nav className="sk-crumb" aria-label="Breadcrumb">
        <Link to="/">{t("nav.home")}</Link>
        <span>/</span>
        <span className="sk-crumb-current">{t("nav.agents")}</span>
      </nav>

      <header className="ds-discover-hero">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("agents.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("agents.lead")}
        </motion.p>
      </header>

      <ul className="ds-grid ds-grid-2">
        {RUNTIMES_CATALOG.map((rt, i) => {
          const count = skillsForRuntime(rt.id).length
          return (
            <motion.li
              key={rt.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(0.04 + i * 0.04, 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to="/runtimes/$id"
                params={{ id: rt.id }}
                className="ds-card ds-card-agent"
              >
                <div className="ds-agent-card-top">
                  <AgentIcon id={rt.id} accent={rt.accent} size="md" />
                  <h3 className="ds-card-id">{rt.name}</h3>
                </div>
                <p>{rt.description}</p>
                <div className="ds-card-foot">
                  <span className="ds-source">
                    <i style={{ background: rt.accent }} aria-hidden />
                    {rt.origin}
                  </span>
                  <span className="ds-agent-count">
                    {t("agents.skillsCount", { n: count })}
                  </span>
                </div>
              </Link>
            </motion.li>
          )
        })}
      </ul>

      <footer className="ds-footer">
        <p>
          <Link to="/">{t("agents.skillsMode")}</Link>
          {" · "}
          <code className="ds-inline-code">npx dino-skills install</code>
        </p>
      </footer>
    </div>
  )
}
