import {
  SKILLS_CATALOG,
  type RuntimeId,
  type SkillCatalogEntry,
} from "@dino/shared"

/** Default: most pack skills work on all runtimes; tune by source/category. */
export function skillRuntimes(skill: SkillCatalogEntry): RuntimeId[] {
  if (skill.runtimes?.length) return skill.runtimes

  if (skill.source === "grok" || skill.id.includes("imagine")) {
    return ["grok", "claude", "gpt"]
  }
  if (skill.source === "dino") {
    return ["grok", "claude", "gpt", "kimi"]
  }
  if (skill.category === "designers") {
    return ["claude", "gpt", "grok"]
  }
  if (skill.category === "marketing" || skill.category === "social") {
    return ["claude", "gpt", "grok", "kimi"]
  }
  if (skill.category === "developers") {
    return ["claude", "gpt", "grok"]
  }
  return ["claude", "gpt", "grok", "kimi"]
}

export function skillsForRuntime(runtimeId: RuntimeId): SkillCatalogEntry[] {
  return SKILLS_CATALOG.filter((s) => skillRuntimes(s).includes(runtimeId))
}
