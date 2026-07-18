import { createFileRoute, redirect } from "@tanstack/react-router"

/** Skills is the home now — keep old /skills URL working. */
export const Route = createFileRoute("/skills")({
  beforeLoad: () => {
    throw redirect({ to: "/" })
  },
  component: () => null,
})
