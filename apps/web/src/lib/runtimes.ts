import {
  SKILLS_CATALOG,
  type RuntimeId,
  type SkillCatalogEntry,
  type SkillCategory,
} from "@dino/shared"

const ALL: RuntimeId[] = [
  "claude-code",
  "cursor",
  "codex",
  "github-copilot",
  "windsurf",
  "gemini",
  "cline",
  "grok",
  "kimi",
]

/** Default: pack skills work across coding agents; light tuning by source/category. */
export function skillRuntimes(skill: SkillCatalogEntry): RuntimeId[] {
  if (skill.runtimes?.length) {
    return skill.runtimes as RuntimeId[]
  }

  if (skill.source === "grok" || skill.id === "dino-review") {
    return ["grok", "claude-code", "cursor", "codex", "cline"]
  }
  if (skill.source === "dino") {
    return ALL
  }
  if (skill.category === "designers") {
    return [
      "claude-code",
      "cursor",
      "codex",
      "windsurf",
      "gemini",
      "cline",
      "grok",
    ]
  }
  if (skill.category === "marketing" || skill.category === "social") {
    return [
      "claude-code",
      "cursor",
      "codex",
      "gemini",
      "grok",
      "kimi",
      "windsurf",
    ]
  }
  if (skill.category === "developers") {
    return [
      "claude-code",
      "cursor",
      "codex",
      "github-copilot",
      "windsurf",
      "cline",
      "grok",
    ]
  }
  return ALL
}

export function skillsForRuntime(runtimeId: RuntimeId): SkillCatalogEntry[] {
  return SKILLS_CATALOG.filter((s) => skillRuntimes(s).includes(runtimeId))
}

export function skillsForRuntimeTopic(
  runtimeId: RuntimeId,
  topic: SkillCategory | "all",
): SkillCatalogEntry[] {
  const list = skillsForRuntime(runtimeId)
  if (topic === "all") return list
  return list.filter((s) => s.category === topic)
}
