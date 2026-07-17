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
    description: "Layout e UI da página de conversas do clube.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/feed-designer.md",
    hasExecuteRecipe: false,
  },
  {
    id: "home-designer",
    name: "Home Designer",
    description: "Visual da home do Clube dos Curiosos.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/home-designer.md",
    hasExecuteRecipe: false,
  },
  {
    id: "product-shell",
    name: "Product Shell",
    description: "Navegação, rotas, CTAs e gates de membership.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/product-shell.md",
    hasExecuteRecipe: true,
  },
  {
    id: "supabase-guard",
    name: "Supabase Guard",
    description: "Banco, RLS, storage e migrations com segurança.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/supabase-guard.md",
    hasExecuteRecipe: true,
  },
  {
    id: "ship-check",
    name: "Ship Check",
    description: "Smoke de pré-deploy e checklist antes de ir ao ar.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/ship-check.md",
    hasExecuteRecipe: true,
  },
  {
    id: "content-builder",
    name: "Content Builder",
    description: "Posts, ideias e copy editorial do clube.",
    runtime: "native",
    capabilities: ["read", "write", "execute"],
    sourcePath: ".grok/agents/content-builder.md",
    hasExecuteRecipe: true,
  },
]

export const AGENTS_CATALOG_NOTE =
  "Agents nativos para o produto dino.blog. Execução de recipes fica no ambiente local."
