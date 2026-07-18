/**
 * AI agent runtimes (Claude, GPT, Grok, Kimi…) — not native dino product agents.
 * Each runtime has a profile page + skills that work well with it.
 */
export type RuntimeId = "claude" | "gpt" | "grok" | "kimi"

export type RuntimeCatalogEntry = {
  id: RuntimeId
  name: string
  shortName: string
  description: string
  /** Vendor / origin label */
  origin: string
  /** Public homepage */
  originUrl: string
  /** Soft accent for chips / lights */
  accent: string
  /** How to load dino-skills with this agent */
  howTo: string
  tags: string[]
}

export const RUNTIMES_CATALOG: RuntimeCatalogEntry[] = [
  {
    id: "claude",
    name: "Claude",
    shortName: "Claude",
    description:
      "Anthropic — forte em código, design systems e skills agentic longas. Melhor casa pro pack dino-skills no Claude Code / Cowork.",
    origin: "Anthropic",
    originUrl: "https://claude.ai",
    accent: "#d97757",
    howTo:
      "npx dino-skills install · peça pro Claude: “usa dino-skills-root e escolhe a skill certa”",
    tags: ["code", "design", "agentic", "long-context"],
  },
  {
    id: "gpt",
    name: "GPT",
    shortName: "GPT",
    description:
      "OpenAI — Codex, ChatGPT, Cursor com GPT. Bom pra copy, product e execução rápida com skills de marketing/social.",
    origin: "OpenAI",
    originUrl: "https://openai.com",
    accent: "#10a37f",
    howTo:
      "npx dino-skills install · no system prompt: “load skills via npx dino-skills get <slug>”",
    tags: ["copy", "product", "codex", "cursor"],
  },
  {
    id: "grok",
    name: "Grok",
    shortName: "Grok",
    description:
      "xAI — build in public, Grok Build, skills locais em ~/.grok/skills. Casa natural do dino-review e do inventário vivo.",
    origin: "xAI",
    originUrl: "https://x.ai",
    accent: "#1da1f2",
    howTo:
      "npx dino-skills install --global · ou skills em ~/.grok/skills · /dino-review",
    tags: ["build-in-public", "local-skills", "x"],
  },
  {
    id: "kimi",
    name: "Kimi",
    shortName: "Kimi",
    description:
      "Moonshot — contexto longo e research. Bom com skills de customer-research, seo e content matrix.",
    origin: "Moonshot",
    originUrl: "https://www.moonshot.cn",
    accent: "#5b7cfa",
    howTo:
      "npx dino-skills install · cole o SKILL.md (npx dino-skills get <slug>) no contexto do Kimi",
    tags: ["research", "long-context", "seo"],
  },
]

export const RUNTIMES_CATALOG_NOTE =
  "Runtimes de AI onde o pack dino-skills roda — Claude, GPT, Grok, Kimi."

/** Map skill `source` chip → real origin URL */
export const SOURCE_ORIGINS: Record<
  string,
  { label: string; url: string }
> = {
  dino: {
    label: "dino",
    url: "https://github.com/mccall9/dino-platform/tree/master/packages/dino-skills",
  },
  grok: { label: "grok / xAI", url: "https://x.ai" },
  obra: { label: "obra", url: "https://github.com/obra/superpowers" },
  upstash: { label: "upstash", url: "https://github.com/upstash/context7" },
  taste: { label: "taste", url: "https://github.com/Leonxlnx/taste-skill" },
  anthropics: {
    label: "anthropics",
    url: "https://github.com/anthropics/skills",
  },
  julian: {
    label: "julianoczkowski",
    url: "https://github.com/julianoczkowski/designer-skills",
  },
  emil: { label: "emil / animations.dev", url: "https://animations.dev" },
  jakub: {
    label: "transitions.dev",
    url: "https://github.com/Jakubantalik/transitions.dev",
  },
  coreyhaines: {
    label: "coreyhaines",
    url: "https://github.com/coreyhaines31/marketingskills",
  },
  charlie: {
    label: "charlie / social-media-skills",
    url: "https://github.com/charlie947/social-media-skills",
  },
  "Marc Lou": {
    label: "Marc Lou lineage → dino",
    url: "https://github.com/mccall9/dino-platform/tree/master/packages/dino-skills/skills/dino-review",
  },
}

export function resolveSourceOrigin(source?: string) {
  if (!source) return null
  return SOURCE_ORIGINS[source] ?? null
}
