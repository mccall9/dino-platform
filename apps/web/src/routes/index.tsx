import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import * as React from "react"
import {
  SKILLS_CATALOG,
  type SkillCatalogEntry,
  type SkillCategory,
} from "@dino/shared"
import { SkillSearch } from "~/components/SkillSearch"

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

/** How to use: install = baixar pack · start = rodar protocol */
const HOW_TO_INSTALL = "npx dino-skills install"
const HOW_TO_START = "npx dino-skills start"
const HOW_TO_PROMPT =
  "Run `npx dino-skills install` then `npx dino-skills start` and pick the right skill."

const OWN_SKILLS = SKILLS_CATALOG.filter(
  (s) => s.featured || s.source === "dino",
)

function DinoSkillsHome() {
  const [copied, setCopied] = React.useState<
    "install" | "start" | "prompt" | null
  >(null)
  const skills: SkillCatalogEntry[] = OWN_SKILLS

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
        <section className="ds-hero" aria-labelledby="ds-title">
          <motion.h1
            id="ds-title"
            className="ds-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            DINO SKILLS
          </motion.h1>

          <motion.p
            className="ds-lead"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Pack npm com as skills do meu setup — design, marketing, código e o
            resto que o agent carrega quando constrói comigo.
          </motion.p>

          <motion.div
            className="ds-howto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
              <code className="ds-inline-code">
                install --global
              </code>{" "}
              ·{" "}
              <code className="ds-inline-code">
                install --dir ./skills
              </code>{" "}
              · collection abaixo.
            </p>
          </motion.div>
        </section>

        <div className="ds-collection-head" id="ds-collection">
          <div className="ds-collection-title-row">
            <h2>Collection</h2>
            <span className="ds-collection-meta">
              {OWN_SKILLS.length} dino · {SKILLS_CATALOG.length} no pack
            </span>
          </div>
        </div>

        <main className="ds-main">
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
                    <span className="ds-source">
                      <i aria-hidden />
                      {skill.source ?? CATEGORY_LABEL[skill.category]}
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="ds-see-all-wrap">
            <Link to="/skills" className="ds-see-all">
              See all skills
              <span className="ds-see-all-count">{SKILLS_CATALOG.length}</span>
            </Link>
          </div>
        </main>

        <footer className="ds-footer">
          <p>
            <strong>Dino Skills</strong> · inventário vivo · dino.blog / Clube
            dos Curiosos
          </p>
        </footer>
      </div>
    </div>
  )
}
