import { createFileRoute } from "@tanstack/react-router"
import * as React from "react"
import { api, getApiBaseUrl } from "~/lib/api"

type SkillCategory =
  | "all"
  | "developers"
  | "designers"
  | "marketing"
  | "social"
  | "finance"
  | "small-business"
  | "legal"

const CATEGORY_LABEL: Record<Exclude<SkillCategory, "all">, string> = {
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
  "mcp-runtime": "mcp / runtime",
}

export const Route = createFileRoute("/skills")({
  loader: async () => {
    const { data, error } = await api.skills.get()
    if (error || !data) {
      return {
        ok: false as const,
        apiUrl: getApiBaseUrl(),
        message:
          error?.value && typeof error.value === "object"
            ? JSON.stringify(error.value)
            : "API unreachable. Start apps/api on :3001 (local only).",
      }
    }
    return {
      ok: true as const,
      apiUrl: getApiBaseUrl(),
      note: data.note,
      skills: data.skills,
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
  const [category, setCategory] = React.useState<SkillCategory>("all")

  const skills = data.ok
    ? category === "all"
      ? data.skills
      : data.skills.filter((s) => s.category === category)
    : []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Skills
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
          Inventário de skills instaláveis (packs abertos + plugins Claude).
          Mesmo padrão da home de{" "}
          <strong>Agents</strong>: card com nome, o que faz e origem — aqui com{" "}
          <strong>link externo</strong> em vez de detalhe de agent nativo.
        </p>
        <p className="mt-1 text-xs text-gray-500">API: {data.apiUrl}</p>
      </div>

      {!data.ok ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {data.message}
        </div>
      ) : (
        <>
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            {data.note}
          </p>

          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Filtrar por categoria"
          >
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
              ] as SkillCategory[]
            ).map((c) => {
              const label =
                c === "all" ? "todas" : CATEGORY_LABEL[c as Exclude<SkillCategory, "all">]
              const active = category === c
              return (
                <button
                  key={c}
                  type="button"
                  role="listitem"
                  onClick={() => setCategory(c)}
                  className={
                    active
                      ? "rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-gray-900"
                      : "rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  }
                >
                  {label}
                </button>
              )
            })}
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <li key={skill.id}>
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </h2>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gray-600 dark:bg-gray-800">
                        {CATEGORY_LABEL[skill.category]}
                      </span>
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
                        {STATUS_LABEL[skill.status] ?? skill.status}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {skill.description}
                  </p>
                  {skill.install ? (
                    <p className="mt-3 font-mono text-[11px] text-gray-500">
                      {skill.install}
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    abrir link →
                  </p>
                </a>
              </li>
            ))}
          </ul>

          {skills.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhuma skill nesta categoria.</p>
          ) : null}
        </>
      )}
    </div>
  )
}
