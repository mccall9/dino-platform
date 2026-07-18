/**
 * Feature flags — turn product slices on/off without deleting code.
 *
 * Agents mode (full UI) is implemented and preserved:
 * - Home toggle → light/blue agent shell + runtime cards
 * - /runtimes catalog (Claude Code, Cursor, Codex, …)
 * - /runtimes/$id detail (how-to, topics, skills, other agents)
 * - Agent icons, origin links, search palette in agent mode
 *
 * Set AGENTS_LIVE = true to re-enable the full experience.
 */
export const AGENTS_LIVE = false

export const AGENTS_MAINTENANCE_COPY = {
  title: "Em manutenção",
  lead: "Estamos em manutenção.",
  body: "A área de Agents (Claude Code, Cursor, Codex, Copilot e o resto) volta em breve — com a mesma estrutura de skills e o pack dino-skills.",
  badge: "manutenção",
} as const
