/**
 * Coding agents that can load dino-skills (UI Skills “Agents” pattern).
 * Not native dino product agents — tools / runtimes where the pack installs.
 */
export type RuntimeId =
  | "claude-code"
  | "cursor"
  | "codex"
  | "github-copilot"
  | "windsurf"
  | "gemini"
  | "cline"
  | "grok"
  | "kimi"

export type RuntimeCatalogEntry = {
  id: RuntimeId
  name: string
  shortName: string
  description: string
  /** Extra blurb on detail page */
  detail?: string
  /** When this agent is most relevant */
  bestFor?: string
  origin: string
  originUrl: string
  /** Emoji / simple mark (no external logo deps) */
  mark: string
  accent: string
  /** Install / how-to with dino-skills */
  howTo: string
  howToPrompt: string
  tags: string[]
  /** Skill category filters that make sense for this agent */
  topics: string[]
}

export const RUNTIMES_CATALOG: RuntimeCatalogEntry[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    shortName: "Claude Code",
    description:
      "Anthropic’s official terminal agent. Skills installed via the skills CLI become procedural knowledge across every Claude Code session in the project.",
    detail:
      "Dino Skills helps Claude Code pick the right skill (design, marketing, review) before changing code or copy.",
    bestFor: "Terminal, CLI, monorepo, long agentic runs",
    origin: "Anthropic",
    originUrl: "https://docs.anthropic.com/en/docs/claude-code",
    mark: "AI",
    accent: "#d97757",
    howTo: "npx dino-skills install",
    howToPrompt:
      "Run `npx dino-skills start` and pick the right skill before making changes.",
    tags: ["terminal", "agentic", "skills-cli"],
    topics: ["developers", "designers", "marketing"],
  },
  {
    id: "cursor",
    name: "Cursor",
    shortName: "Cursor",
    description:
      "AI-first code editor with deep agent integration. Skills CLI installs SKILL.md so Cursor can reference them in project context.",
    detail:
      "Drop the pack into .agents/skills or .cursor rules and ask the agent to load dino-skills-root first.",
    bestFor: "Editor, multi-file edits, design + product in one session",
    origin: "Cursor",
    originUrl: "https://cursor.com",
    mark: "◆",
    accent: "#7c6af7",
    howTo: "npx dino-skills install",
    howToPrompt:
      "Run `npx dino-skills install` then load dino-skills-root before editing UI or copy.",
    tags: ["editor", "agent", "skills-cli"],
    topics: ["designers", "developers", "marketing"],
  },
  {
    id: "codex",
    name: "Codex",
    shortName: "Codex",
    description:
      "OpenAI’s coding agent. Compatible with the skills CLI for reusable procedural knowledge — performance rules, design, growth.",
    detail:
      "Install the pack once; Codex can pull SKILL.md via get or project skills folder.",
    bestFor: "Repo tasks, product copy, shipping features",
    origin: "OpenAI",
    originUrl: "https://openai.com/codex",
    mark: "◎",
    accent: "#10a37f",
    howTo: "npx dino-skills install",
    howToPrompt:
      "Run `npx dino-skills start` then choose a skill (e.g. dino-review, cro).",
    tags: ["openai", "coding-agent", "skills-cli"],
    topics: ["developers", "marketing", "social"],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    shortName: "Copilot",
    description:
      "GitHub’s AI coding assistant. Skills installed via the CLI augment project context with structured guidance for the model.",
    detail:
      "Use install into .github or .agents/skills so Copilot chat/agent modes can see the pack.",
    bestFor: "PR, IDE chat, repo-wide guidance",
    origin: "GitHub",
    originUrl: "https://github.com/features/copilot",
    mark: "⌘",
    accent: "#24292f",
    howTo: "npx dino-skills install --dir .agents/skills",
    howToPrompt:
      "Install dino-skills then ask Copilot to follow dino-skills-root routing.",
    tags: ["github", "ide", "skills-cli"],
    topics: ["developers", "designers"],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    shortName: "Windsurf",
    description:
      "Codeium’s agentic IDE. Skills give Windsurf project-specific procedural knowledge that persists across sessions.",
    detail:
      "Install SKILL.md files so cascades load dino pack knowledge without re-pasting.",
    bestFor: "Cascade agent, full-project refactors",
    origin: "Codeium",
    originUrl: "https://windsurf.com",
    mark: "◈",
    accent: "#0ea5e9",
    howTo: "npx dino-skills install",
    howToPrompt:
      "Run `npx dino-skills install` then start with dino-skills-root.",
    tags: ["ide", "cascade", "skills-cli"],
    topics: ["developers", "designers", "marketing"],
  },
  {
    id: "gemini",
    name: "Gemini",
    shortName: "Gemini",
    description:
      "Google’s Gemini family of agents. Compatible with skills CLI for repo-scoped skill installation — including CLI workflows.",
    detail:
      "Paste or install SKILL.md into the workspace Gemini can read for multi-modal + code tasks.",
    bestFor: "Research, long context, multi-modal product work",
    origin: "Google",
    originUrl: "https://gemini.google.com",
    mark: "✦",
    accent: "#8ab4f8",
    howTo: "npx dino-skills install",
    howToPrompt:
      "Install dino-skills then `npx dino-skills get <slug>` into context.",
    tags: ["google", "long-context", "skills-cli"],
    topics: ["marketing", "social", "designers"],
  },
  {
    id: "cline",
    name: "Cline",
    shortName: "Cline",
    description:
      "Open-source autonomous coding agent for VS Code. Reads SKILL.md installed via the skills CLI for project-specific patterns.",
    detail:
      "Point Cline at .agents/skills after install so it loads dino pack skills on demand.",
    bestFor: "VS Code, autonomous edits, open source stack",
    origin: "Cline",
    originUrl: "https://github.com/cline/cline",
    mark: "◎",
    accent: "#f59e0b",
    howTo: "npx dino-skills install",
    howToPrompt:
      "Run `npx dino-skills install` then ask Cline to use dino-skills-root.",
    tags: ["vscode", "open-source", "skills-cli"],
    topics: ["developers", "designers"],
  },
  {
    id: "grok",
    name: "Grok",
    shortName: "Grok",
    description:
      "xAI Grok / Grok Build. Natural home for dino-review and local ~/.grok/skills — build in public stack.",
    detail:
      "Install globally or into the monorepo; Grok loads dino pack skills like marclou-lineage dino-review.",
    bestFor: "Build in public, Grok Build, local skills",
    origin: "xAI",
    originUrl: "https://x.ai",
    mark: "𝕏",
    accent: "#1da1f2",
    howTo: "npx dino-skills install --global",
    howToPrompt:
      "Run `npx dino-skills install --global` then /dino-review or dino-skills start.",
    tags: ["xai", "local-skills", "build-in-public"],
    topics: ["marketing", "designers", "developers", "social"],
  },
  {
    id: "kimi",
    name: "Kimi",
    shortName: "Kimi",
    description:
      "Moonshot Kimi — long context and research. Strong with customer-research, seo-audit and content matrix skills.",
    detail:
      "Install pack then paste get <slug> output into Kimi when you need deep research + shipping docs.",
    bestFor: "Research, long docs, SEO, social planning",
    origin: "Moonshot",
    originUrl: "https://www.moonshot.cn",
    mark: "K",
    accent: "#5b7cfa",
    howTo: "npx dino-skills install",
    howToPrompt:
      "Install dino-skills then `npx dino-skills get customer-research`.",
    tags: ["research", "long-context"],
    topics: ["marketing", "social"],
  },
]

export const RUNTIMES_CATALOG_NOTE =
  "Coding agents that load dino-skills — Claude Code, Cursor, Codex, Copilot, Windsurf, Gemini, Cline, Grok, Kimi."

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
