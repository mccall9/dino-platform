import { createFileRoute } from "@tanstack/react-router"
import * as React from "react"
import { api, getApiBaseUrl } from "~/lib/api"
import {
  SKILLS_CATALOG,
  SKILLS_CATALOG_NOTE,
  type SkillCatalogEntry,
  type SkillCategory as SharedCategory,
} from "@dino/shared"

type FilterCategory = "all" | SharedCategory

const CATEGORY_LABEL: Record<SharedCategory, string> = {
  developers: "Developers",
  designers: "Designers",
  marketing: "Marketing",
  social: "Social",
  finance: "Finance",
  "small-business": "Small Business",
  legal: "Legal",
}

const STATUS_LABEL: Record<string, string> = {
  local: "local",
  installable: "installable",
  "plugin-only": "plugin",
  "mcp-runtime": "mcp",
}

export const Route = createFileRoute("/skills")({
  loader: async () => {
    const { data, error } = await api.skills.get()
    if (error || !data?.skills?.length) {
      // Vercel ships web only — embedded catalog is the normal production path
      return {
        ok: true as const,
        fromApi: false as const,
        apiUrl: getApiBaseUrl(),
        note: SKILLS_CATALOG_NOTE,
        skills: SKILLS_CATALOG as SkillCatalogEntry[],
      }
    }
    return {
      ok: true as const,
      fromApi: true as const,
      apiUrl: getApiBaseUrl(),
      note: data.note,
      skills: data.skills as SkillCatalogEntry[],
    }
  },
  component: SkillsPage,
  head: () => ({
    meta: [
      { title: "Skills — dino-platform" },
      {
        name: "description",
        content:
          "Catálogo de skills instaláveis: o que cada uma faz e link de origem.",
      },
    ],
  }),
})

function SkillsPage() {
  const data = Route.useLoaderData()
  const [category, setCategory] = React.useState<FilterCategory>("all")

  const skills =
    category === "all"
      ? data.skills
      : data.skills.filter((s) => s.category === category)

  return (
    <div className="space-y-8">
      <div className="page-head">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Inventário
        </div>
        <h1 className="page-title">Skills</h1>
        <p className="page-lead">
          Packs instaláveis com link e o que cada um faz — uma ação por card.
        </p>
        <p className="page-meta">
          {data.fromApi ? `API live · ${data.apiUrl}` : "catálogo embutido"}
        </p>
      </div>

      <p className="page-note">{data.note}</p>

      <div className="chips" role="list" aria-label="Filtrar por categoria">
        {(
          [
            "all",
            "developers",
            "designers",
            "marketing",
            "social",
            "finance",
            "small-business",
            "legal",
          ] as FilterCategory[]
        ).map((c) => {
          const label =
            c === "all" ? "todas" : CATEGORY_LABEL[c as SharedCategory]
          return (
            <button
              key={c}
              type="button"
              role="listitem"
              className="chip"
              data-active={category === c ? "true" : "false"}
              onClick={() => setCategory(c)}
            >
              {label}
            </button>
          )
        })}
      </div>

      <ul className="card-grid">
        {skills.map((skill) => (
          <li key={skill.id}>
            <a
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card liquid-glass"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="card-title">{skill.name}</h2>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="badge">
                    {CATEGORY_LABEL[skill.category]}
                  </span>
                  <span className="badge badge-green">
                    {STATUS_LABEL[skill.status] ?? skill.status}
                  </span>
                </div>
              </div>
              <p className="card-desc">{skill.description}</p>
              {skill.install ? (
                <p className="card-meta font-mono">{skill.install}</p>
              ) : null}
              <p className="card-link">abrir link →</p>
            </a>
          </li>
        ))}
      </ul>

      {skills.length === 0 ? (
        <p className="page-meta">Nenhuma skill nesta categoria.</p>
      ) : null}
    </div>
  )
}
