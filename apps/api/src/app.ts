import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { resolveProductCwd } from "@dino/agents-sdk"
import { agentsRoutes } from "./routes/agents"
import { skillsRoutes } from "./routes/skills"
import type { HealthResponse } from "@dino/shared"

/**
 * Elysia app — export type App for Eden Treaty.
 * Agents are native-only (Grok/Cursor). No ChatGPT provider integration.
 */
export const app = new Elysia()
  .use(
    cors({
      origin: true,
      methods: ["GET", "POST", "OPTIONS"],
    }),
  )
  .get("/health", (): HealthResponse => ({
    ok: true,
    service: "dino-api",
    runtime: "bun",
    productRoot: resolveProductCwd() ?? process.env.DINO_PRODUCT_ROOT ?? null,
    agentsNote:
      "Native Grok/Cursor agents only. execute=shell recipes (e.g. ship-check npm test). No ChatGPT API.",
  }))
  .use(agentsRoutes)
  .use(skillsRoutes)

export type App = typeof app
