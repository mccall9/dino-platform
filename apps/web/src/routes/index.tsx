import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import * as React from "react"
import {
  RUNTIMES_CATALOG,
  SKILLS_CATALOG,
  type SkillCatalogEntry,
  type SkillCategory,
} from "@dino/shared"
import { AgentIcon } from "~/components/AgentIcon"
import { AgentsMaintenance } from "~/components/AgentsMaintenance"
import { SiteOutro } from "~/components/SiteOutro"
import { SkillSearch } from "~/components/SkillSearch"
import { SourceChip } from "~/components/SourceChip"
import { AGENTS_LIVE } from "~/lib/feature-flags"
import { useI18n } from "~/lib/i18n"
import { skillsForRuntime } from "~/lib/runtimes"
import { skillDescription } from "~/lib/skill-i18n"
import { ShellModeProvider } from "~/lib/shell-mode"

export const Route = createFileRoute("/")({
  component: DinoSkillsHome,
  head: () => ({
    meta: [
      { title: "Dino Skills" },
      {
        name: "description",
        content:
          "Coleção de skills do setup do dino — o manual que o agent usa comigo.",
      },
    ],
  }),
})

const HOW_TO_INSTALL = "npx dino-skills install"
const HOW_TO_START = "npx dino-skills start"

const OWN_SKILLS = SKILLS_CATALOG.filter(
  (s) => s.featured || s.source === "dino",
)

type HomeMode = "skills" | "agents"

function DinoSkillsHome() {
  const { t, locale } = useI18n()
  const desc = (s: (typeof skills)[0]) => skillDescription(s, locale)
  const [mode, setMode] = React.useState<HomeMode>("skills")
  const [copied, setCopied] = React.useState<
    "install" | "start" | "prompt" | null
  >(null)
  const skills: SkillCatalogEntry[] = OWN_SKILLS
  const agentMode = mode === "agents"
  /** Full agents UI only when flag is on; otherwise maintenance, same dark theme as skills. */
  const agentsUiLive = agentMode && AGENTS_LIVE
  const showAgentsMaintenance = agentMode && !AGENTS_LIVE
  /** Search follows agents only when the feature is live. */
  const shellMode = agentsUiLive ? "agents" : "skills"
  const howToPrompt = t("home.howto.prompt")

  async function copyText(
    text: string,
    which: "install" | "start" | "prompt",
  ) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(which)
      window.setTimeout(() => setCopied(null), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <ShellModeProvider mode={shellMode}>
    <div
      className={`ds-shell${agentsUiLive ? " ds-mode-agent" : ""}`}
      data-mode={agentsUiLive ? "agents" : "skills"}
    >
      <div
        className={`ds-ambient${agentsUiLive ? " ds-ambient-agent" : ""}`}
        aria-hidden="true"
      >
        <div className="ds-orb ds-orb-a" />
        <div className="ds-orb ds-orb-b" />
        <div className="ds-orb ds-orb-c" />
        <div className="ds-ambient-grid" />
        <div className="ds-ambient-vignette" />
      </div>

      <SkillSearch />

      <div className="ds-mode-bar">
        <button
          type="button"
          className="ds-mode-btn"
          data-active={mode === "skills" ? "true" : "false"}
          onClick={() => setMode("skills")}
        >
          {t("nav.skills")}
        </button>
        <button
          type="button"
          className="ds-mode-btn"
          data-active={mode === "agents" ? "true" : "false"}
          onClick={() => setMode("agents")}
        >
          {t("nav.agents")}
        </button>
      </div>

      <div className="ds-content">
        <section className="ds-hero" aria-labelledby="ds-title">
          <motion.h1
            id="ds-title"
            className="ds-title"
            key={`${mode}-${locale}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {agentMode ? t("home.titleAgents") : t("home.titleSkills")}
          </motion.h1>

          <motion.p
            className="ds-lead"
            key={`lead-${mode}-${locale}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {showAgentsMaintenance
              ? t("home.leadAgentsMaint")
              : agentsUiLive
                ? t("home.leadAgentsLive")
                : t("home.leadSkills")}
          </motion.p>

          {showAgentsMaintenance ? null : !agentMode ? (
            <motion.div
              className="ds-howto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h2>{t("home.howto")}</h2>
              <p>
                <strong>{t("home.howto.installStrong")}</strong>{" "}
                {t("home.howto.installRest")}{" "}
                <strong>{t("home.howto.startStrong")}</strong>{" "}
                {t("home.howto.startRest")}
              </p>
              <p className="ds-howto-label">{t("home.howto.step1")}</p>
              <button
                type="button"
                className="ds-cmd"
                onClick={() => copyText(HOW_TO_INSTALL, "install")}
                aria-label={t("home.howto.step1")}
              >
                <code>
                  <span className="tok-cmd">npx</span>{" "}
                  <span className="tok-sub">dino-skills</span>{" "}
                  <span className="tok-sub">install</span>
                </code>
                <span className="ds-cmd-icon" aria-hidden>
                  {copied === "install" ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}
                </span>
              </button>
              <p className="ds-howto-label">{t("home.howto.step2")}</p>
              <button
                type="button"
                className="ds-cmd"
                onClick={() => copyText(HOW_TO_START, "start")}
                aria-label={t("home.howto.step2")}
              >
                <code>
                  <span className="tok-cmd">npx</span>{" "}
                  <span className="tok-sub">dino-skills</span>{" "}
                  <span className="tok-sub">start</span>
                </code>
                <span className="ds-cmd-icon" aria-hidden>
                  {copied === "start" ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}
                </span>
              </button>
              <button
                type="button"
                className="ds-cmd ds-cmd-secondary"
                onClick={() => copyText(howToPrompt, "prompt")}
                aria-label={t("home.howto")}
              >
                <code>{howToPrompt}</code>
                <span className="ds-cmd-icon" aria-hidden>
                  {copied === "prompt" ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}
                </span>
              </button>
              <p className="ds-howto-foot">
                {t("home.howto.flags")}{" "}
                <code className="ds-inline-code">install --global</code> ·{" "}
                <code className="ds-inline-code">install --dir ./skills</code>
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="ds-howto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h2>{t("home.howto")}</h2>
              <p>
                {t("home.howto.agentsLive")}{" "}
                <code className="ds-inline-code">npx dino-skills install</code>
              </p>
            </motion.div>
          )}
        </section>

        {!showAgentsMaintenance ? (
          <div className="ds-collection-head" id="ds-collection">
            <div className="ds-collection-title-row">
              <h2>
                {agentsUiLive ? t("home.agentsSection") : t("home.collection")}
              </h2>
              <span className="ds-collection-meta">
                {agentsUiLive
                  ? t("home.metaRuntimes", { n: RUNTIMES_CATALOG.length })
                  : t("home.metaDino", {
                      n: OWN_SKILLS.length,
                      total: SKILLS_CATALOG.length,
                    })}
              </span>
            </div>
          </div>
        ) : null}

        <main className="ds-main">
          {showAgentsMaintenance ? (
            <AgentsMaintenance />
          ) : agentsUiLive ? (
            <>
              <ul className="ds-grid">
                {RUNTIMES_CATALOG.map((rt, i) => {
                  const count = skillsForRuntime(rt.id).length
                  return (
                    <motion.li
                      key={rt.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(0.04 + i * 0.04, 0.35),
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
                            <i
                              style={{ background: rt.accent }}
                              aria-hidden
                            />
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
              <div className="ds-see-all-wrap">
                <Link to="/runtimes" className="ds-see-all">
                  {t("home.openAgents")}
                </Link>
              </div>
            </>
          ) : (
            <>
              <ul className="ds-grid">
                {skills.map((skill, i) => (
                  <motion.li
                    key={skill.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(0.04 + i * 0.02, 0.35),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to="/skills/$id"
                      params={{ id: skill.id }}
                      className="ds-card"
                    >
                      <h3 className="ds-card-id">{skill.id}</h3>
                      <p>{desc(skill)}</p>
                      <div className="ds-card-foot">
                        <SourceChip source={skill.source} />
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="ds-see-all-wrap">
                <Link to="/skills" className="ds-see-all">
                  {t("home.seeAll")}
                  <span className="ds-see-all-count">
                    {SKILLS_CATALOG.length}
                  </span>
                </Link>
              </div>
            </>
          )}
        </main>

        {!agentMode ? <SiteOutro /> : null}
      </div>
    </div>
    </ShellModeProvider>
  )
}
