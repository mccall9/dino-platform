import { motion } from "motion/react"
import { useI18n } from "~/lib/i18n"

/** Placeholder while Agents feature is gated (full UI remains in codebase). */
export function AgentsMaintenance() {
  const { t } = useI18n()
  return (
    <motion.div
      className="ds-maintenance"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="ds-maintenance-badge">{t("maint.badge")}</span>
      <h2 className="ds-maintenance-title">{t("maint.title")}</h2>
      <p className="ds-maintenance-lead">{t("maint.lead")}</p>
      <p className="ds-maintenance-body">{t("maint.body")}</p>
    </motion.div>
  )
}
