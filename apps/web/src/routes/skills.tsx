import { createFileRoute, Outlet } from "@tanstack/react-router"
import { SkillSearch } from "~/components/SkillSearch"
import { ShellModeProvider } from "~/lib/shell-mode"

/**
 * Layout for /skills (catalog) and /skills/$id (detail).
 */
export const Route = createFileRoute("/skills")({
  component: SkillsLayout,
})

function SkillsLayout() {
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
