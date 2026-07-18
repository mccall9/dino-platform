import { createFileRoute, Outlet } from "@tanstack/react-router"
import { SkillSearch } from "~/components/SkillSearch"
import { AGENTS_LIVE } from "~/lib/feature-flags"
import { ShellModeProvider } from "~/lib/shell-mode"

/**
 * Layout for /runtimes.
 * Full agents UI is preserved; AGENTS_LIVE=false → dark shell + maintenance.
 * Flip flag in feature-flags.ts to restore light agent theme + catalog.
 */
export const Route = createFileRoute("/runtimes")({
  component: RuntimesLayout,
})

function RuntimesLayout() {
  if (!AGENTS_LIVE) {
    return (
      <ShellModeProvider mode="skills">
        <div className="ds-shell" data-mode="skills">
          <div className="ds-ambient" aria-hidden="true">
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
      </ShellModeProvider>
    )
  }

  return (
    <ShellModeProvider mode="agents">
      <div className="ds-shell ds-mode-agent" data-mode="agents">
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
    </ShellModeProvider>
  )
}
