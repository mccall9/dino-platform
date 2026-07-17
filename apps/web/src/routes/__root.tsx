/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import * as React from "react"
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary"
import { NotFound } from "~/components/NotFound"
import appCss from "~/styles/app.css?url"
import { seo } from "~/utils/seo"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "dino-platform · Native agents console",
        description:
          "Standalone monorepo: TanStack Start + Elysia + Eden Treaty. Not the dino.blog product site.",
      }),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function NavLink({
  to,
  children,
  exact,
}: {
  to: "/" | "/skills" | "/runs"
  children: React.ReactNode
  exact?: boolean
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const active = exact
    ? pathname === to
    : pathname === to || pathname.startsWith(`${to}/`)

  return (
    <Link to={to} data-active={active ? "true" : "false"}>
      {children}
    </Link>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="platform-shell">
          <div className="platform-ambient" aria-hidden="true" />

          <div className="platform-content">
            <header className="platform-header">
              <div className="platform-header-inner">
                <Link to="/" className="platform-brand">
                  dino-platform
                </Link>
                <nav className="platform-nav" aria-label="Principal">
                  <NavLink to="/" exact>
                    Agents
                  </NavLink>
                  <NavLink to="/skills">Skills</NavLink>
                  <NavLink to="/runs">Runs</NavLink>
                </nav>
                <span className="platform-pill">standalone · not dino.blog</span>
              </div>
            </header>
            <main className="platform-main">{children}</main>
          </div>
        </div>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
