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
import { SkillSearch } from "~/components/SkillSearch"
import { SourceChip } from "~/components/SourceChip"
import { skillsForRuntime } from "~/lib/runtimes"
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

const CATEGORY_LABEL: Record<SkillCategory | "all", string> = {
  all: "todas",
  developers: "dev",
  designers: "design",
  marketing: "marketing",
  social: "social",
  finance: "finance",
  "small-business": "business",
  legal: "legal",
}

const HOW_TO_INSTALL = "npx dino-skills install"
const HOW_TO_START = "npx dino-skills start"
const HOW_TO_PROMPT =
  "Run `npx dino-skills install` then `npx dino-skills start` and pick the right skill."

const OWN_SKILLS = SKILLS_CATALOG.filter(
  (s) => s.featured || s.source === "dino",
)

type HomeMode = "skills" | "agents"

function DinoSkillsHome() {
  const [mode, setMode] = React.useState<HomeMode>("skills")
  const [copied, setCopied] = React.useState<
    "install" | "start" | "prompt" | null
  >(null)
  const skills: SkillCatalogEntry[] = OWN_SKILLS
  const agentMode = mode === "agents"

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
    <ShellModeProvider mode={mode}>
    <div
      className={`ds-shell${agentMode ? " ds-mode-agent" : ""}`}
      data-mode={mode}
    >
      <div
        className={`ds-ambient${agentMode ? " ds-ambient-agent" : ""}`}
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
          Skills
        </button>
        <button
          type="button"
          className="ds-mode-btn"
          data-active={mode === "agents" ? "true" : "false"}
          onClick={() => setMode("agents")}
        >
          Agents
        </button>
      </div>

      <div className="ds-content">
        <section className="ds-hero" aria-labelledby="ds-title">
          <motion.h1
            id="ds-title"
            className="ds-title"
            key={mode}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {agentMode ? "DINO AGENTS" : "DINO SKILLS"}
          </motion.h1>

          <motion.p
            className="ds-lead"
            key={`lead-${mode}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {agentMode
              ? "Claude Code, Cursor, Codex, Copilot… — agents que carregam o pack. Mesma estrutura, modo claro + azul."
              : "Pack npm com as skills do meu setup — design, marketing, código e o resto que o agent carrega quando constrói comigo."}
          </motion.p>

          {!agentMode ? (
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
              <h2>How to use</h2>
              <p>
                <strong>Install</strong> baixa o pack no agent.{" "}
                <strong>Start</strong> roda o protocol pra escolher a skill.
              </p>
              <p className="ds-howto-label">1 · Baixar o pack</p>
              <button
                type="button"
                className="ds-cmd"
                onClick={() => copyText(HOW_TO_INSTALL, "install")}
                aria-label="Copiar comando install"
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
              <p className="ds-howto-label">2 · Rodar / escolher skill</p>
              <button
                type="button"
                className="ds-cmd"
                onClick={() => copyText(HOW_TO_START, "start")}
                aria-label="Copiar comando start"
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
                onClick={() => copyText(HOW_TO_PROMPT, "prompt")}
                aria-label="Copiar prompt de exemplo"
              >
                <code>{HOW_TO_PROMPT}</code>
                <span className="ds-cmd-icon" aria-hidden>
                  {copied === "prompt" ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}
                </span>
              </button>
              <p className="ds-howto-foot">
                Flags:{" "}
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
              <h2>How to use</h2>
              <p>
                Escolhe o agent → vê origem + skills que encaixam. O pack é o
                mesmo:{" "}
                <code className="ds-inline-code">npx dino-skills install</code>
              </p>
            </motion.div>
          )}
        </section>

        <div className="ds-collection-head" id="ds-collection">
          <div className="ds-collection-title-row">
            <h2>{agentMode ? "Agents" : "Collection"}</h2>
            <span className="ds-collection-meta">
              {agentMode
                ? `${RUNTIMES_CATALOG.length} runtimes`
                : `${OWN_SKILLS.length} dino · ${SKILLS_CATALOG.length} no pack`}
            </span>
          </div>
        </div>

        <main className="ds-main">
          {agentMode ? (
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
                        <span className="ds-agent-count">{count} skills</span>
                      </div>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
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
                      <p>{skill.description}</p>
                      <div className="ds-card-foot">
                        <SourceChip source={skill.source} />
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="ds-see-all-wrap">
                <Link to="/skills" className="ds-see-all">
                  See all skills
                  <span className="ds-see-all-count">
                    {SKILLS_CATALOG.length}
                  </span>
                </Link>
              </div>
            </>
          )}

          {agentMode ? (
            <div className="ds-see-all-wrap">
              <Link to="/runtimes" className="ds-see-all">
                Open agents page
              </Link>
            </div>
          ) : null}
        </main>

        <footer className="ds-footer">
          <p>
            <strong>Dino Skills</strong> · inventário vivo · dino.blog / Clube
            dos Curiosos
          </p>
        </footer>
      </div>
    </div>
    </ShellModeProvider>
  )
}
