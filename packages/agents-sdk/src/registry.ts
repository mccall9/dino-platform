import type { NativeAgentSpec } from "./types"
import { scriptPath } from "./scripts-path"

/**
 * Native dino.blog agents — same personas as `.grok/agents` / `.cursor/agents`.
 * Runtime is always "native" (Grok/Cursor). No OpenAI/ChatGPT provider agents.
 * executeCommand = real workspace shell (no LLM).
 */
export const NATIVE_AGENTS: NativeAgentSpec[] = [
  {
    id: "feed-designer",
    name: "Feed Designer",
    description:
      "UI/UX da página /feed (Conversas). Markup e CSS feed; sem auth/Supabase.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/feed-designer.md",
    triggers: ["feed-designer", "/feed design"],
    scope: ["feed.html", "feed.js (markup only)", "styles.css .feed-*"],
    forbidden: ["auth-service.js", "conversation-service.js", "migrations"],
  },
  {
    id: "home-designer",
    name: "Home Designer",
    description: "Visual da home clube `/` — index.html e CSS club-*.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/home-designer.md",
    triggers: ["home-designer"],
    scope: ["index.html", "community.js markup", "styles.css .club-*"],
  },
  {
    id: "product-shell",
    name: "Product Shell",
    description: "Nav, rotas, CTAs, join→feed, vercel, gates de membership.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/product-shell.md",
    triggers: ["product-shell"],
    scope: ["site-nav.js", "vercel.json", "gates"],
    executeCommand: {
      label: "Verify shell files + robots/vercel",
      argv: ["node", scriptPath("verify-product-shell.mjs")],
      timeoutMs: 15_000,
    },
  },
  {
    id: "supabase-guard",
    name: "Supabase Guard",
    description: "DB, RLS, RPC, Storage, migrations e services de dados.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/supabase-guard.md",
    triggers: ["supabase-guard"],
    scope: ["supabase/migrations", "*-service.js", "supabase-client.js"],
    executeCommand: {
      label: "Verify supabase layout + migrations",
      argv: ["node", scriptPath("verify-supabase-layout.mjs")],
      timeoutMs: 15_000,
    },
  },
  {
    id: "ship-check",
    name: "Ship Check",
    description:
      "Pré-deploy: Playwright smoke, SEO privado, vercel — com execução de testes.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/ship-check.md",
    triggers: ["ship-check", "/ship"],
    scope: ["tests/", "vercel.json", "robots.txt", "sitemap.xml"],
    executeCommand: {
      label: "Playwright smoke (npm test)",
      argv: ["npm", "test"],
      timeoutMs: 180_000,
    },
  },
  {
    id: "content-builder",
    name: "Content Builder",
    description: "Posts, ideias, copy editorial (CONTENT_IDEAS, ideias, post).",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/content-builder.md",
    triggers: ["content-builder"],
    scope: ["CONTENT_IDEAS.md", "ideias.html", "post.html"],
    executeCommand: {
      label: "Verify content surfaces exist",
      argv: ["node", scriptPath("verify-content.mjs")],
      timeoutMs: 15_000,
    },
  },
]

export function listAgents(): NativeAgentSpec[] {
  return NATIVE_AGENTS
}

export function getAgent(id: string): NativeAgentSpec | undefined {
  return NATIVE_AGENTS.find((a) => a.id === id)
}
