/**
 * Static agent cards for the platform console when API is not reachable
 * (e.g. Vercel production only ships the web app).
 * Keep in sync with packages/agents-sdk registry display fields.
 */
export type AgentCatalogEntry = {
  id: string
  name: string
  description: string
  runtime: "native"
  capabilities: Array<"read" | "write" | "execute">
  sourcePath: string
  hasExecuteRecipe: boolean
}

export const AGENTS_CATALOG: AgentCatalogEntry[] = [
  {
    id: "feed-designer",
    name: "Feed Designer",
    description:
      "UI/UX da página /feed (Conversas). Markup e CSS feed; sem auth/Supabase.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/feed-designer.md",
    hasExecuteRecipe: false,
  },
  {
    id: "home-designer",
    name: "Home Designer",
    description: "Visual da home clube `/` — index.html e CSS club-*.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/home-designer.md",
    hasExecuteRecipe: false,
  },
  {
    id: "product-shell",
    name: "Product Shell",
    description: "Nav, rotas, CTAs, join→feed, vercel, gates de membership.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/product-shell.md",
    hasExecuteRecipe: true,
  },
  {
    id: "supabase-guard",
    name: "Supabase Guard",
    description: "DB, RLS, RPC, Storage, migrations e services de dados.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/supabase-guard.md",
    hasExecuteRecipe: true,
  },
  {
    id: "ship-check",
    name: "Ship Check",
    description:
      "Pré-deploy: Playwright smoke, SEO privado, vercel — com execução de testes.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/ship-check.md",
    hasExecuteRecipe: true,
  },
  {
    id: "content-builder",
    name: "Content Builder",
    description: "Posts, ideias, copy editorial (CONTENT_IDEAS, ideias, post).",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/content-builder.md",
    hasExecuteRecipe: true,
  },
]

export const AGENTS_CATALOG_NOTE =
  "Agents nativos (Grok/Cursor). Na Vercel só o front sobe — catálogo embutido. Runs/execute pedem API local (apps/api)."
