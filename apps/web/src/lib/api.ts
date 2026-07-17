import { treaty } from "@elysiajs/eden"
import type { App } from "@dino/api"

/**
 * Eden Treaty client → apps/api (Elysia).
 * Typed end-to-end; agents are native-only on the server.
 */
const baseUrl =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? String(import.meta.env.VITE_API_URL)
    : process.env.VITE_API_URL ?? "http://localhost:3001"

export const api = treaty<App>(baseUrl)

export function getApiBaseUrl() {
  return baseUrl
}
