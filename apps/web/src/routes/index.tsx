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

const FILTERS: Array<SkillCategory | "all"> = [
  "all",
  "developers",
  "designers",
  "marketing",
  "social",
]

const HOW_TO_PROMPT =
  "Roda dino-review na home do dino e me dá o scorecard + top 5 fixes."

function DinoSkillsHome() {
  const [filter, setFilter] = React.useState<SkillCategory | "all">("all")
  const [copied, setCopied] = React.useState(false)

  const skills: SkillCatalogEntry[] =
    filter === "all"
      ? SKILLS_CATALOG
      : SKILLS_CATALOG.filter((s) => s.category === filter)

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(HOW_TO_PROMPT)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
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
            Coleção de skills do meu setup — design, marketing, código e o
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
              Peça pro agent carregar a skill certa antes de mudar código ou
              copy. Exemplo:
            </p>
            <button
              type="button"
              className="ds-cmd"
              onClick={copyPrompt}
              aria-label="Copiar prompt de exemplo"
            >
              <code>{HOW_TO_PROMPT}</code>
              <span className="ds-cmd-icon" aria-hidden>
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </span>
            </button>
            <p className="ds-howto-foot">
              Ou navega a collection abaixo e pede pelo nome / id da skill.
            </p>
          </motion.div>
        </section>

        <div className="ds-collection-head">
          <h2>Collection</h2>
          <div className="ds-filters" role="list" aria-label="Filtrar skills">
            {FILTERS.map((c) => (
              <button
                key={c}
                type="button"
                role="listitem"
                className="ds-chip"
                data-active={filter === c ? "true" : "false"}
                onClick={() => setFilter(c)}
              >
                {CATEGORY_LABEL[c]}
              </button>
            ))}
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
