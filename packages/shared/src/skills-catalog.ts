import type { SkillCatalogEntry } from "./index"

const GH_DINO = "https://github.com/mccall9/dino-platform"
const GH_MARKETING = "https://github.com/coreyhaines31/marketingskills"
const GH_SOCIAL = "https://github.com/charlie947/social-media-skills"
const GH_DESIGNER = "https://github.com/julianoczkowski/designer-skills"
const GH_ANTHROPIC = "https://github.com/anthropics/skills"
const GH_TASTE = "https://github.com/Leonxlnx/taste-skill"
const GH_TRANSITIONS = "https://github.com/Jakubantalik/transitions.dev"
const GH_SUPERPOWERS = "https://github.com/obra/superpowers"
const GH_CONTEXT7 = "https://github.com/upstash/context7"

/**
 * Inventário vivo — pack npm `dino-skills` com todas as skills.
 * How to use principal: npx dino-skills start
 */
export const SKILLS_CATALOG: SkillCatalogEntry[] = [
  // —— Pack root ——
  {
    id: "dino-skills-root",
    source: "dino",
    featured: true,
    name: "Dino Skills Root",
    description:
      "Router do pack npm dino-skills — escolhe a skill certa (design, marketing, social…) antes de o agent mudar código.",
    category: "developers",
    url: `${GH_DINO}/tree/master/packages/dino-skills`,
    status: "installable",
    install: "npx dino-skills start",
  },
  {
    id: "dino-review",
    source: "dino",
    featured: true,
    name: "Dino Review",
    description:
      "Review de landing/SaaS no padrão dino (ship viral): hero, CTA único, prova, pricing, OG.",
    category: "marketing",
    url: `${GH_DINO}/tree/master/packages/dino-skills/skills/dino-review`,
    status: "installable",
    install: "npx dino-skills get dino-review",
  },

  // —— Developers ——
  {
    id: "create-skill",
    source: "grok",
    name: "Create Skill",
    description:
      "Cria skill nova no Grok (SKILL.md + scripts) com entrevista e scaffold completo.",
    category: "developers",
    url: GH_DINO,
    status: "local",
    install: "~/.grok/skills/create-skill",
  },
  {
    id: "check-work",
    source: "grok",
    name: "Check Work",
    description:
      "Verifica o trabalho com subagent: diff, build, testes e correção antes de dar por pronto.",
    category: "developers",
    url: GH_DINO,
    status: "local",
    install: "/check-work · ~/.grok/skills/check-work",
  },
  {
    id: "superpowers",
    source: "obra",
    name: "Superpowers",
    description:
      "Processo agentic: brainstorm → plano → TDD → subagents → review. Evita o agent sair codando no escuro.",
    category: "developers",
    url: GH_SUPERPOWERS,
    status: "installable",
    install: "/plugin install superpowers@claude-plugins-official",
  },
  {
    id: "context7",
    source: "upstash",
    name: "Context7",
    description:
      "Docs e exemplos de libs no contexto (anti-hallucination de API antiga). CLI ou MCP.",
    category: "developers",
    url: GH_CONTEXT7,
    status: "mcp-runtime",
    install: "npx ctx7 setup",
  },
  {
    id: "imagine",
    source: "grok",
    name: "Imagine",
    description:
      "Workflow de image_gen / image_edit no Grok: prompt craft, referência e consistência de asset.",
    category: "developers",
    url: GH_DINO,
    status: "local",
    install: "~/.grok/skills/imagine",
  },
  {
    id: "company-skills-catalog",
    source: "dino",
    featured: true,
    name: "Company Skills Catalog",
    description:
      "Mapa do inventário de packs (dev, design, marketing, social…) e como carregar cada um.",
    category: "developers",
    url: GH_DINO,
    status: "local",
    install: "~/.agents/skills/company-skills-catalog",
  },

  // —— Designers ——
  {
    id: "design-taste-frontend",
    source: "taste",
    name: "Design Taste Frontend",
    description:
      "Anti-slop de landing/portfolio: direção visual real, audit-first, sem UI genérica de IA.",
    category: "designers",
    url: GH_TASTE,
    status: "installable",
    install: `npx skills add ${GH_TASTE}`,
  },
  {
    id: "frontend-design",
    source: "anthropics",
    name: "Frontend Design",
    description:
      "Interfaces com filosofia estética nomeada — tipografia, cor e composição intencional.",
    category: "designers",
    url: `${GH_ANTHROPIC}/tree/main/skills/frontend-design`,
    status: "local",
    install: `npx skills add ${GH_ANTHROPIC} --skill frontend-design`,
  },
  {
    id: "design-brief",
    source: "julian",
    name: "Design Brief",
    description:
      "Brief de design por entrevista + exploração do código — base antes de construir UI.",
    category: "designers",
    url: GH_DESIGNER,
    status: "installable",
    install: `npx skills add ${GH_DESIGNER} --skill design-brief`,
  },
  {
    id: "design-flow",
    source: "julian",
    name: "Design Flow",
    description:
      "Fluxo completo design→build: brief, tokens, frontend, review em sequência guiada.",
    category: "designers",
    url: GH_DESIGNER,
    status: "installable",
    install: `npx skills add ${GH_DESIGNER} --skill design-flow`,
  },
  {
    id: "design-review",
    source: "julian",
    name: "Design Review",
    description:
      "Crítica estruturada: hierarquia, consistência, responsivo, a11y e fidelidade ao brief.",
    category: "designers",
    url: GH_DESIGNER,
    status: "installable",
    install: `npx skills add ${GH_DESIGNER} --skill design-review`,
  },
  {
    id: "design-tokens",
    source: "julian",
    name: "Design Tokens",
    description:
      "Gera tokens (CSS vars / Tailwind): light/dark, type ramp, spacing e componentes.",
    category: "designers",
    url: GH_DESIGNER,
    status: "installable",
    install: `npx skills add ${GH_DESIGNER} --skill design-tokens`,
  },
  {
    id: "grill-me",
    source: "julian",
    name: "Grill Me",
    description:
      "Entrevista implacável até fechar decisões de design/plano — zero ambiguidade.",
    category: "designers",
    url: GH_DESIGNER,
    status: "installable",
    install: `npx skills add ${GH_DESIGNER} --skill grill-me`,
  },
  {
    id: "brief-to-tasks",
    source: "julian",
    name: "Brief → Tasks",
    description:
      "Quebra o brief em checklist de fatias verticais independentes e buildáveis.",
    category: "designers",
    url: GH_DESIGNER,
    status: "installable",
    install: `npx skills add ${GH_DESIGNER} --skill brief-to-tasks`,
  },
  {
    id: "information-architecture",
    source: "julian",
    name: "Information Architecture",
    description:
      "Estrutura do produto: nav, hierarquia, URLs, fluxos — antes do visual.",
    category: "designers",
    url: GH_DESIGNER,
    status: "installable",
    install: `npx skills add ${GH_DESIGNER} --skill information-architecture`,
  },
  {
    id: "emil-design-eng",
    source: "emil",
    name: "Emil Design Eng",
    description:
      "Polimento de UI no espírito Emil Kowalski: micro-detalhe, motion e sensação de software caro.",
    category: "designers",
    url: "https://animations.dev",
    status: "local",
    install: "~/.agents/skills/emil-design-eng",
  },
  {
    id: "apple-design",
    source: "grok",
    name: "Apple Design",
    description:
      "Gestos, springs, materiais, tipografia óptica — fundações de interface no estilo Apple.",
    category: "designers",
    url: GH_DINO,
    status: "local",
    install: "~/.grok/skills/apple-design",
  },
  {
    id: "transitions-dev",
    source: "jakub",
    name: "Transitions.dev",
    description:
      "Micro-transições de produção (modal, badge, sheet…) com tokens de duração/easing.",
    category: "designers",
    url: GH_TRANSITIONS,
    status: "installable",
    install: `npx skills add ${GH_TRANSITIONS}`,
  },
  {
    id: "improve-animations",
    source: "grok",
    name: "Improve Animations",
    description:
      "Auditoria de motion no código + plano priorizado do que animar (e do que não).",
    category: "designers",
    url: GH_DINO,
    status: "local",
    install: "~/.grok/skills/improve-animations",
  },
  {
    id: "brandkit",
    source: "dino",
    featured: true,
    name: "Brandkit",
    description:
      "Brand kits premium: logo system, guidelines board, identidade dark-tech / editorial.",
    category: "designers",
    url: GH_DINO,
    status: "local",
    install: "~/.agents/skills/brandkit",
  },
  {
    id: "high-end-visual-design",
    source: "dino",
    featured: true,
    name: "High-End Visual Design",
    description:
      "Padrões de agência: type, sombra, card, spacing — bloqueia defaults baratos de IA.",
    category: "designers",
    url: GH_DINO,
    status: "local",
    install: "~/.agents/skills/high-end-visual-design",
  },

  // —— Marketing ——
  {
    id: "product-marketing",
    source: "coreyhaines",
    name: "Product Marketing",
    description:
      "Contexto de produto (ICP, positioning) em `.agents/product-marketing.md` — base das outras skills de growth.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/product-marketing`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill product-marketing`,
  },
  {
    id: "copywriting",
    source: "coreyhaines",
    name: "Copywriting",
    description:
      "Copy de conversão para home, landing, pricing e feature pages — claro, específico, acionável.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/copywriting`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill copywriting`,
  },
  {
    id: "cro",
    source: "coreyhaines",
    name: "CRO",
    description:
      "Otimização de conversão em páginas e forms: o que mata o clique e o que consertar primeiro.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/cro`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill cro`,
  },
  {
    id: "launch",
    source: "coreyhaines",
    name: "Launch",
    description:
      "Plano de lançamento / PH / feature release: checklist, momentum e conversão de interesse.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/launch`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill launch`,
  },
  {
    id: "marketing-plan",
    source: "coreyhaines",
    name: "Marketing Plan",
    description:
      "Plano AARRR completo (90 dias / 12 meses): aquisição, ativação, retenção, referral, revenue.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/marketing-plan`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill marketing-plan`,
  },
  {
    id: "marketing-ideas",
    source: "coreyhaines",
    name: "Marketing Ideas",
    description:
      "Ideias e táticas de growth quando trava o “como divulgar isso?”.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/marketing-ideas`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill marketing-ideas`,
  },
  {
    id: "offers",
    source: "coreyhaines",
    name: "Offers",
    description:
      "Desenho de oferta: value stack, bônus, garantia, scarcity — o que está por baixo da copy.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/offers`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill offers`,
  },
  {
    id: "pricing",
    source: "coreyhaines",
    name: "Pricing",
    description:
      "Decisões de preço, packaging, freemium vs pago e framing de valor.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/pricing`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill pricing`,
  },
  {
    id: "revops",
    source: "coreyhaines",
    name: "RevOps / Revenue",
    description:
      "Revenue operations: MQL/SQL, scoring, routing, pipeline, CRM, handoff marketing→sales.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/revops`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill revops`,
  },
  {
    id: "seo-audit",
    source: "coreyhaines",
    name: "SEO Audit",
    description:
      "Auditoria técnica e on-page: ranking, indexação, Core Web Vitals e drops de tráfego.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/seo-audit`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill seo-audit`,
  },
  {
    id: "ads",
    source: "coreyhaines",
    name: "Ads",
    description:
      "Campanhas pagas (Google/Meta/LinkedIn): targeting, ROAS, retargeting e budget.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/ads`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill ads`,
  },
  {
    id: "ab-testing",
    source: "coreyhaines",
    name: "A/B Testing",
    description:
      "Hipótese, variantes, significância e backlog de experimentos de growth.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/ab-testing`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill ab-testing`,
  },
  {
    id: "emails",
    source: "coreyhaines",
    name: "Emails",
    description:
      "Sequências, drip, onboarding e lifecycle e-mail com automação.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/emails`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill emails`,
  },
  {
    id: "customer-research",
    source: "coreyhaines",
    name: "Customer Research",
    description:
      "ICP, entrevistas, VOC, reviews e mining — o que o cliente realmente diz.",
    category: "marketing",
    url: `${GH_MARKETING}/tree/main/skills/customer-research`,
    status: "installable",
    install: `npx skills add ${GH_MARKETING} --skill customer-research`,
  },

  // —— Social ——
  {
    id: "post-writer",
    source: "charlie",
    name: "Post Writer",
    description:
      "Posts LinkedIn na minha voz (about-me / voice.md) a partir de notas ou ideia solta.",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill post-writer`,
  },
  {
    id: "post-scorer",
    source: "charlie",
    name: "Post Scorer",
    description:
      "Nota o post com base no histórico real de performance — não em dica genérica.",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill post-scorer`,
  },
  {
    id: "content-matrix",
    source: "charlie",
    name: "Content Matrix",
    description:
      "32+ ideias de post cruzando pilares × formatos (tabela pronta pro mês).",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill content-matrix`,
  },
  {
    id: "hook-generator",
    source: "charlie",
    name: "Hook Generator",
    description:
      "6 aberturas clickbait no formato 2 linhas — dígitos, “How I”, contraste.",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill hook-generator`,
  },
  {
    id: "gemini-carousel",
    source: "charlie",
    name: "Gemini Carousel",
    description:
      "Carrossel LinkedIn slide a slide: brief → aprovação → prompts de imagem.",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill gemini-carousel`,
  },
  {
    id: "voice-builder",
    source: "charlie",
    name: "Voice Builder",
    description:
      "Perfil de voz a partir de entrevista + samples — base de todo conteúdo escrito.",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill voice-builder`,
  },
  {
    id: "youtube-thumbnail",
    source: "charlie",
    name: "YouTube Thumbnail",
    description:
      "Thumbnail de alta CTR com foto de referência, título e cores de marca.",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill youtube-thumbnail`,
  },
  {
    id: "reels-scripting",
    source: "charlie",
    name: "Reels Scripting",
    description:
      "Script de Reel a partir de referência + newsletter — tom e repurpose.",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill reels-scripting`,
  },
  {
    id: "social",
    source: "charlie",
    name: "Social",
    description:
      "Conteúdo e calendário multi-rede: LinkedIn, X, Reels, Shorts, scheduling.",
    category: "social",
    url: GH_SOCIAL,
    status: "installable",
    install: `npx skills add ${GH_SOCIAL} --skill social`,
  },
]

export const SKILLS_CATALOG_NOTE =
  "Inventário dino — links + install. dino-review via npx dino-skills; marketing/social/design com skills add."
