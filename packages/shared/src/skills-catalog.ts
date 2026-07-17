import type { SkillCatalogEntry } from "./index"

/**
 * Installable / catalog skills for the platform console.
 * Source of truth mirrored from company skills inventory (scraped packs).
 */
export const SKILLS_CATALOG: SkillCatalogEntry[] = [
  // —— Developers ——
  {
    id: "superpowers",
    name: "Superpowers",
    description:
      "Metodologia agentic completa: brainstorm → plano → TDD → subagents → code review. Faz o agente seguir processo em vez de sair codando.",
    category: "developers",
    url: "https://github.com/obra/superpowers",
    status: "installable",
    install: "/plugin install superpowers@claude-plugins-official",
  },
  {
    id: "context7",
    name: "Context7",
    description:
      "Docs e exemplos de libs atualizados no contexto do LLM (anti-hallucination de APIs antigas). CLI ctx7 ou MCP.",
    category: "developers",
    url: "https://github.com/upstash/context7",
    status: "mcp-runtime",
    install: "npx ctx7 setup",
  },
  {
    id: "skill-creator",
    name: "Skill Creator",
    description:
      "Cria e melhora Agent Skills (SKILL.md, description, evals) no padrão Anthropic.",
    category: "developers",
    url: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
    status: "local",
    install: "Já em .agents/skills/skill-creator",
  },
  {
    id: "mcp-builder",
    name: "MCP Builder",
    description:
      "Scaffold de servidores MCP (Python FastMCP / TypeScript SDK) com boas práticas.",
    category: "developers",
    url: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder",
    status: "local",
    install: "Já em .agents/skills/mcp-builder",
  },
  {
    id: "webapp-testing",
    name: "Webapp Testing",
    description:
      "Testes de apps locais com Playwright: smoke UI, screenshots e logs do browser.",
    category: "developers",
    url: "https://github.com/anthropics/skills/tree/main/skills/webapp-testing",
    status: "local",
    install: "Já em .agents/skills/webapp-testing",
  },
  {
    id: "claude-mem",
    name: "Claude-Mem",
    description:
      "Memória persistente entre sessões: captura trabalho do agent, comprime e injeta contexto nas próximas rodadas.",
    category: "developers",
    url: "https://github.com/thedotmack/claude-mem",
    status: "mcp-runtime",
    install: "npx claude-mem install",
  },

  // —— Designers ——
  {
    id: "ui-ux-pro-max",
    name: "UI UX Pro Max",
    description:
      "Inteligência de design: 84 estilos, paletas, tipografia e design system gerado por produto/indústria.",
    category: "designers",
    url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    status: "local",
    install: "uipro init --ai claude (ou já em .agents/skills)",
  },
  {
    id: "taste-skill",
    name: "Taste Skill",
    description:
      "Anti-slop de frontend: layout, type, motion e densidade com gosto — evita UI genérica de IA.",
    category: "designers",
    url: "https://github.com/Leonxlnx/taste-skill",
    status: "installable",
    install: "npx skills add Leonxlnx/taste-skill",
  },
  {
    id: "frontend-design",
    name: "Frontend Design",
    description:
      "Frontends com direção visual intencional (Anthropic): tipografia, cor e composição sem template genérico.",
    category: "designers",
    url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
    status: "local",
    install: "Já em .agents/skills/frontend-design",
  },
  {
    id: "transitions-dev",
    name: "Transitions.dev",
    description:
      "Biblioteca de micro-transições CSS (modal, badge, dropdown, shake…) coláveis e skill para o agent aplicar.",
    category: "designers",
    url: "https://github.com/Jakubantalik/transitions.dev",
    status: "local",
    install: "npx skills add Jakubantalik/transitions.dev",
  },
  {
    id: "web-artifacts-builder",
    name: "Web Artifacts",
    description:
      "Artifacts HTML multi-componente com React + Tailwind + shadcn para protótipos ricos.",
    category: "designers",
    url: "https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder",
    status: "local",
    install: "Já em .agents/skills/web-artifacts-builder",
  },
  {
    id: "brand-guidelines",
    name: "Brand Guidelines",
    description:
      "Aplica cores e tipografia de marca (padrão Anthropic) a qualquer artefato visual.",
    category: "designers",
    url: "https://github.com/anthropics/skills/tree/main/skills/brand-guidelines",
    status: "local",
    install: "Já em .agents/skills/brand-guidelines",
  },

  // —— Marketing ——
  {
    id: "marketing-skills",
    name: "Marketing Skills (~45)",
    description:
      "CRO, copywriting, SEO, ads, e-mail, launch, pricing, revops e growth — pack Corey Haines para agents.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "installable",
    install: "npx skills add coreyhaines31/marketingskills",
  },

  // —— Social ——
  {
    id: "social-media-skills",
    name: "Social Media Skills (~17)",
    description:
      "Voz, posts LinkedIn, Reels, thumbnails YouTube, scoring e content ops (Charlie Hills).",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "installable",
    install:
      "/plugin marketplace add charlie947/social-media-skills · ou copiar skills/",
  },

  // —— Finance / SMB / Legal (Claude plugins) ——
  {
    id: "finance-plugin",
    name: "Finance (~8)",
    description:
      "Lançamentos, reconciliação, DRE, análise de variação e SOX — workflows de close financeiro.",
    category: "finance",
    url: "https://claude.com/plugins/finance",
    status: "plugin-only",
    install: "Claude Cowork / plugins marketplace · revisão humana obrigatória",
  },
  {
    id: "small-business-plugin",
    name: "Small Business (~31)",
    description:
      "Caixa, payroll, close mensal, campanhas e operações de PME com comandos tipo /plan-payroll.",
    category: "small-business",
    url: "https://claude.com/plugins/small-business",
    status: "plugin-only",
    install: "Claude Cowork · /smb-onboard",
  },
  {
    id: "legal-plugin",
    name: "Legal (~9)",
    description:
      "Review de contratos, triagem de NDA, compliance e briefings — playbook configurável.",
    category: "legal",
    url: "https://claude.com/plugins/legal",
    status: "plugin-only",
    install: "Claude Cowork · revisão por advogado",
  },
]

export const SKILLS_CATALOG_NOTE =
  "Catálogo de skills instaláveis (não são agents nativos). Links públicos + o que cada pack faz. Fonte: inventário company skills."
