import { createFileRoute, Outlet } from "@tanstack/react-router"
import { SkillSearch } from "~/components/SkillSearch"

/** Layout for /runtimes (agents mode) — light shell via data-mode */
export const Route = createFileRoute("/runtimes")({
  component: RuntimesLayout,
})

function RuntimesLayout() {
  return (
    <div className="ds-shell ds-mode-agent" data-mode="agent">
      <div className="ds-ambient ds-ambient-agent" aria-hidden="true">
        <div className="ds-orb ds-orb-a" />
        <div className="ds-orb ds-orb-b" />
        <div className="ds-orb ds-orb-c" />
        <div className="ds-ambient-grid" />
        <div className="ds-ambient-vignette" />
      </div>
      <SkillSearch />
      <div className="ds-content">
        <Outlet />
      </div>
    </div>
  )
}
