import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

/**
 * Layout for /skills and /skills/$id.
 * Only exact /skills redirects home — child routes must render via Outlet.
 */
export const Route = createFileRoute("/skills")({
  beforeLoad: ({ location }) => {
    const path = location.pathname.replace(/\/$/, "") || "/"
    if (path === "/skills") {
      throw redirect({ to: "/" })
    }
  },
  component: SkillsLayout,
})

function SkillsLayout() {
  return <Outlet />
}
