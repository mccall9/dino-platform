/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
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
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased">
        <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-emerald-700 dark:text-emerald-400"
            >
              dino-platform
            </Link>
            <nav className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
              <Link
                to="/"
                activeProps={{
                  className: "font-semibold text-gray-900 dark:text-white",
                }}
                activeOptions={{ exact: true }}
              >
                Agents
              </Link>
              <Link
                to="/skills"
                activeProps={{
                  className: "font-semibold text-gray-900 dark:text-white",
                }}
              >
                Skills
              </Link>
              <Link
                to="/runs"
                activeProps={{
                  className: "font-semibold text-gray-900 dark:text-white",
                }}
              >
                Runs
              </Link>
            </nav>
            <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
              standalone · not dino.blog
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
