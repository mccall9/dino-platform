import { motion } from "motion/react"
import { AGENTS_MAINTENANCE_COPY } from "~/lib/feature-flags"

/** Placeholder while Agents feature is gated (full UI remains in codebase). */
export function AgentsMaintenance() {
  return (
    <motion.div
      className="ds-maintenance"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="ds-maintenance-badge">{AGENTS_MAINTENANCE_COPY.badge}</span>
      <h2 className="ds-maintenance-title">{AGENTS_MAINTENANCE_COPY.title}</h2>
      <p className="ds-maintenance-lead">{AGENTS_MAINTENANCE_COPY.lead}</p>
      <p className="ds-maintenance-body">{AGENTS_MAINTENANCE_COPY.body}</p>
    </motion.div>
  )
}
