import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import * as React from "react"
import {
  SKILLS_CATALOG,
  type SkillCatalogEntry,
  type SkillCategory,
} from "@dino/shared"

export const Route = createFileRoute("/skills/")({
  component: SkillsCatalogPage,
  head: () => ({
    meta: [
      { title: "All Skills · Dino Skills" },
      {
        name: "description",
        content: `Coleção de ${SKILLS_CATALOG.length} skills do pack dino — design, marketing, social e mais.`,
      },
    ],
  }),
})

const CATEGORY_LABEL: Record<SkillCategory | "all", string> = {
  all: "All",
  developers: "Dev",
  designers: "Design",
  marketing: "Marketing",
  social: "Social",
  finance: "Finance",
  "small-business": "Business",
  legal: "Legal",
}

const FILTERS: Array<SkillCategory | "all"> = [
  "all",
  "developers",
  "designers",
  "marketing",
  "social",
]

function SkillsCatalogPage() {
  const [filter, setFilter] = React.useState<SkillCategory | "all">("all")

  const skills: SkillCatalogEntry[] =
    filter === "all"
      ? SKILLS_CATALOG
      : SKILLS_CATALOG.filter((s) => s.category === filter)

  return (
    <div className="ds-discover">
      <nav className="sk-crumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span className="sk-crumb-current">Skills</span>
      </nav>

      <header className="ds-discover-hero">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Discover the full dino pack
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          A collection of {SKILLS_CATALOG.length} high-quality skills for
          shipping in public — design, marketing, social, revenue and agent
          workflows. Load with{" "}
          <code className="ds-inline-code">npx dino-skills start</code>.
        </motion.p>

        <div className="ds-filters ds-filters-left" role="list" aria-label="Filter">
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
      </header>

      <ul className="ds-grid ds-grid-3">
        {skills.map((skill, i) => (
          <motion.li
            key={skill.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: Math.min(0.03 + i * 0.015, 0.4),
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

      {skills.length === 0 ? (
        <p className="ds-empty">Nada nessa categoria.</p>
      ) : null}

      <footer className="ds-footer">
        <p>
          <strong>{skills.length}</strong> skills
          {filter !== "all" ? ` · ${CATEGORY_LABEL[filter]}` : ""} · pack{" "}
          <code className="ds-inline-code">dino-skills</code>
        </p>
      </footer>
    </div>
  )
}
