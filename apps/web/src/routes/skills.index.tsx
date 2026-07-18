import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import * as React from "react"
import {
  SKILLS_CATALOG,
  type SkillCatalogEntry,
  type SkillCategory,
} from "@dino/shared"
import { SiteOutro } from "~/components/SiteOutro"
import { SourceChip } from "~/components/SourceChip"
import { useI18n } from "~/lib/i18n"
import { skillDescription } from "~/lib/skill-i18n"

export const Route = createFileRoute("/skills/")({
  component: SkillsCatalogPage,
  head: () => ({
    meta: [
      { title: "All Skills · Dino Skills" },
      {
        name: "description",
        content: `Coleção de ${SKILLS_CATALOG.length} skills do pack dino.`,
      },
    ],
  }),
})

const FILTERS: Array<SkillCategory | "all"> = [
  "all",
  "developers",
  "designers",
  "marketing",
  "social",
]

function SkillsCatalogPage() {
  const { t, locale } = useI18n()
  const [filter, setFilter] = React.useState<SkillCategory | "all">("all")

  const label = (c: SkillCategory | "all") => {
    if (c === "all") return t("skills.filterAll")
    if (c === "developers") return t("skills.filterDev")
    if (c === "designers") return t("skills.filterDesign")
    if (c === "marketing") return t("skills.filterMarketing")
    if (c === "social") return t("skills.filterSocial")
    return c
  }

  const skills: SkillCatalogEntry[] =
    filter === "all"
      ? SKILLS_CATALOG
      : SKILLS_CATALOG.filter((s) => s.category === filter)

  return (
    <div className="ds-discover">
      <nav className="sk-crumb" aria-label="Breadcrumb">
        <Link to="/">{t("nav.home")}</Link>
        <span>/</span>
        <span className="sk-crumb-current">{t("nav.skills")}</span>
      </nav>

      <header className="ds-discover-hero">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("skills.discoverTitle")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("skills.discoverLead", { n: SKILLS_CATALOG.length })}{" "}
          <code className="ds-inline-code">npx dino-skills start</code>.
        </motion.p>

        <div
          className="ds-filters ds-filters-left"
          role="list"
          aria-label="Filter"
        >
          {FILTERS.map((c) => (
            <button
              key={c}
              type="button"
              role="listitem"
              className="ds-chip"
              data-active={filter === c ? "true" : "false"}
              onClick={() => setFilter(c)}
            >
              {label(c)}
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
              <p>{skillDescription(skill, locale)}</p>
              <div className="ds-card-foot">
                <SourceChip source={skill.source} />
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      {skills.length === 0 ? (
        <p className="ds-empty">{t("skills.emptyTopic")}</p>
      ) : null}

      <p className="ds-footer" style={{ borderTop: "none", paddingBottom: 0 }}>
        <strong>{skills.length}</strong> {t("skills.footerPack")}{" "}
        <code className="ds-inline-code">dino-skills</code>
        {filter !== "all" ? ` · ${label(filter)}` : ""}
      </p>

      <SiteOutro />
    </div>
  )
}
