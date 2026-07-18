import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import * as React from "react"
import {
  SKILLS_CATALOG,
  type SkillCatalogEntry,
  type SkillCategory,
} from "@dino/shared"

export const Route = createFileRoute("/")({
  component: DinoSkillsHome,
  head: () => ({
    meta: [
      { title: "Dino Skills" },
      {
        name: "description",
        content:
          "O que o dino já sabe fazer — skills de verdade, do jeito que eu trabalho.",
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

const STATUS_LABEL: Record<string, string> = {
  local: "no meu setup",
  installable: "instalável",
  "plugin-only": "plugin",
  "mcp-runtime": "runtime",
}

const FILTERS: Array<SkillCategory | "all"> = [
  "all",
  "developers",
  "designers",
  "marketing",
  "social",
  "finance",
  "small-business",
  "legal",
]

function DinoSkillsHome() {
  const [filter, setFilter] = React.useState<SkillCategory | "all">("all")

  const skills: SkillCatalogEntry[] =
    filter === "all"
      ? SKILLS_CATALOG
      : SKILLS_CATALOG.filter((s) => s.category === filter)

  return (
    <div className="ds-shell">
      {/* personal grain for shiny title */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="ds-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
          />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      <div className="ds-video" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
      </div>

      <div className="ds-content">
        <header className="ds-header">
          <div className="ds-header-inner">
            <Link to="/" className="ds-brand">
              Dino <span>Skills</span>
            </Link>
            <p className="ds-sig">build in public · clube dos curiosos</p>
          </div>
        </header>

        <section className="ds-hero" aria-labelledby="ds-title">
          <motion.div
            className="ds-eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <i />
            inventário vivo · do jeito que eu construo
          </motion.div>

          <motion.h1
            id="ds-title"
            className="ds-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="ds-title-line">O que o dino</span>
            <span className="ds-title-accent">já sabe.</span>
          </motion.h1>

          <motion.p
            className="ds-lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            Skills reais do meu setup — design, marketing, código e o resto que
            carrego quando construo em público. Não é marketplace. É o manual
            que o agent usa quando trabalha comigo.
          </motion.p>

          <motion.p
            className="ds-personal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
          >
            “Se eu fosse o agent, é assim que eu trabalharia.”
          </motion.p>
        </section>

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

        <main className="ds-main">
          <ul className="ds-grid">
            {skills.map((skill, i) => (
              <motion.li
                key={skill.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(0.08 + i * 0.03, 0.5),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-card liquid-glass"
                >
                  <div className="ds-card-top">
                    <h2>{skill.name}</h2>
                    <span className="ds-badge ds-badge-green">
                      {STATUS_LABEL[skill.status] ?? skill.status}
                    </span>
                  </div>
                  <p>{skill.description}</p>
                  <div className="ds-card-meta">
                    <span className="ds-badge">
                      {CATEGORY_LABEL[skill.category]}
                    </span>
                  </div>
                  {skill.install ? (
                    <p className="ds-install">{skill.install}</p>
                  ) : null}
                </a>
              </motion.li>
            ))}
          </ul>
        </main>

        <footer className="ds-footer">
          <p>
            <strong>Dino Skills</strong> · parte do mundo dino.blog / Clube dos
            Curiosos
            <br />
            sem pitch, sem botão — só o inventário
          </p>
        </footer>
      </div>
    </div>
  )
}
