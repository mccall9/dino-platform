import type { SkillCatalogEntry } from "./index"

/**
 * Inventário vivo do setup do dino — o que está instalado e em uso
 * (`.agents/skills`, `~/.grok/skills`, skills do projeto).
 * Não é marketplace genérico: é o manual real do agent.
 */
export const SKILLS_CATALOG: SkillCatalogEntry[] = [
  // —— Developers / agent ops ——
  {
    id: "create-skill",
    name: "Create Skill",
    description:
      "Cria skill nova no Grok (SKILL.md + scripts) com entrevista e scaffold completo.",
    category: "developers",
    url: "",
    status: "local",
    install: "~/.grok/skills/create-skill",
  },
  {
    id: "check-work",
    name: "Check Work",
    description:
      "Verifica o trabalho com subagent: diff, build, testes e correção antes de dar por pronto.",
    category: "developers",
    url: "",
    status: "local",
    install: "~/.grok/skills/check-work · /check-work",
  },
  {
    id: "superpowers",
    name: "Superpowers",
    description:
      "Processo agentic: brainstorm → plano → TDD → subagents → review. Evita o agent sair codando no escuro.",
    category: "developers",
    url: "https://github.com/obra/superpowers",
    status: "installable",
    install: "/plugin install superpowers@claude-plugins-official",
  },
  {
    id: "context7",
    name: "Context7",
    description:
      "Docs e exemplos de libs no contexto (anti-hallucination de API antiga). CLI ou MCP.",
    category: "developers",
    url: "https://github.com/upstash/context7",
    status: "mcp-runtime",
    install: "npx ctx7 setup",
  },
  {
    id: "imagine",
    name: "Imagine",
    description:
      "Workflow de image_gen / image_edit no Grok: prompt craft, referência e consistência de asset.",
    category: "developers",
    url: "",
    status: "local",
    install: "~/.grok/skills/imagine",
  },
  {
    id: "company-skills-catalog",
    name: "Company Skills Catalog",
    description:
      "Mapa do inventário de packs (dev, design, marketing, social…) e como carregar cada um.",
    category: "developers",
    url: "",
    status: "local",
    install: "~/.agents/skills/company-skills-catalog",
  },

  // —— Designers ——
  {
    id: "design-taste-frontend",
    name: "Design Taste Frontend",
    description:
      "Anti-slop de landing/portfolio: direção visual real, audit-first, sem UI genérica de IA.",
    category: "designers",
    url: "",
    status: "local",
    install: "~/.agents/skills/design-taste-frontend",
  },
  {
    id: "frontend-design",
    name: "Frontend Design",
    description:
      "Interfaces com filosofia estética nomeada — tipografia, cor e composição intencional.",
    category: "designers",
    url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
    status: "local",
    install: "dino-platform/.agents/skills/frontend-design",
  },
  {
    id: "design-brief",
    name: "Design Brief",
    description:
      "Brief de design por entrevista + exploração do código — base antes de construir UI.",
    category: "designers",
    url: "https://github.com/julianoczkowski/designer-skills",
    status: "local",
    install: "dino-platform/.agents/skills/design-brief",
  },
  {
    id: "design-flow",
    name: "Design Flow",
    description:
      "Fluxo completo design→build: brief, tokens, frontend, review em sequência guiada.",
    category: "designers",
    url: "https://github.com/julianoczkowski/designer-skills",
    status: "local",
    install: "dino-platform/.agents/skills/design-flow",
  },
  {
    id: "design-review",
    name: "Design Review",
    description:
      "Crítica estruturada: hierarquia, consistência, responsivo, a11y e fidelidade ao brief.",
    category: "designers",
    url: "https://github.com/julianoczkowski/designer-skills",
    status: "local",
    install: "dino-platform/.agents/skills/design-review",
  },
  {
    id: "design-tokens",
    name: "Design Tokens",
    description:
      "Gera tokens (CSS vars / Tailwind): light/dark, type ramp, spacing e componentes.",
    category: "designers",
    url: "https://github.com/julianoczkowski/designer-skills",
    status: "local",
    install: "dino-platform/.agents/skills/design-tokens",
  },
  {
    id: "grill-me",
    name: "Grill Me",
    description:
      "Entrevista implacável até fechar decisões de design/plano — zero ambiguidade.",
    category: "designers",
    url: "https://github.com/julianoczkowski/designer-skills",
    status: "local",
    install: ".agents/skills/grill-me",
  },
  {
    id: "brief-to-tasks",
    name: "Brief → Tasks",
    description:
      "Quebra o brief em checklist de fatias verticais independentes e buildáveis.",
    category: "designers",
    url: "https://github.com/julianoczkowski/designer-skills",
    status: "local",
    install: "dino-platform/.agents/skills/brief-to-tasks",
  },
  {
    id: "information-architecture",
    name: "Information Architecture",
    description:
      "Estrutura do produto: nav, hierarquia, URLs, fluxos — antes do visual.",
    category: "designers",
    url: "https://github.com/julianoczkowski/designer-skills",
    status: "local",
    install: "dino-platform/.agents/skills/information-architecture",
  },
  {
    id: "emil-design-eng",
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
    name: "Apple Design",
    description:
      "Gestos, springs, materiais, tipografia óptica — fundações de interface no estilo Apple.",
    category: "designers",
    url: "",
    status: "local",
    install: "~/.grok/skills/apple-design",
  },
  {
    id: "transitions-dev",
    name: "Transitions.dev",
    description:
      "Micro-transições de produção (modal, badge, sheet…) com tokens de duração/easing.",
    category: "designers",
    url: "https://github.com/Jakubantalik/transitions.dev",
    status: "local",
    install: "~/.agents/skills/transitions-dev",
  },
  {
    id: "improve-animations",
    name: "Improve Animations",
    description:
      "Auditoria de motion no código + plano priorizado do que animar (e do que não).",
    category: "designers",
    url: "",
    status: "local",
    install: "~/.grok/skills/improve-animations",
  },
  {
    id: "brandkit",
    name: "Brandkit",
    description:
      "Brand kits premium: logo system, guidelines board, identidade dark-tech / editorial.",
    category: "designers",
    url: "",
    status: "local",
    install: "~/.agents/skills/brandkit",
  },
  {
    id: "high-end-visual-design",
    name: "High-End Visual Design",
    description:
      "Padrões de agência: type, sombra, card, spacing — bloqueia defaults baratos de IA.",
    category: "designers",
    url: "",
    status: "local",
    install: "~/.agents/skills/high-end-visual-design",
  },

  // —— Marketing (pack Corey + Marc Lou) ——
  {
    id: "marclou-review",
    name: "Marc Lou Review",
    description:
      "Review brutal de landing/SaaS no estilo Marc Lou: hero, CTA único, prova, pricing, OG e copy viral.",
    category: "marketing",
    url: "",
    status: "local",
    install: "~/.grok/skills/marclou-review · /marclou-review",
  },
  {
    id: "product-marketing",
    name: "Product Marketing",
    description:
      "Contexto de produto (ICP, positioning) em `.agents/product-marketing.md` — base das outras skills de growth.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/product-marketing",
  },
  {
    id: "copywriting",
    name: "Copywriting",
    description:
      "Copy de conversão para home, landing, pricing e feature pages — claro, específico, acionável.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/copywriting",
  },
  {
    id: "cro",
    name: "CRO",
    description:
      "Otimização de conversão em páginas e forms: o que mata o clique e o que consertar primeiro.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/cro",
  },
  {
    id: "launch",
    name: "Launch",
    description:
      "Plano de lançamento / PH / feature release: checklist, momentum e conversão de interesse.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/launch",
  },
  {
    id: "marketing-plan",
    name: "Marketing Plan",
    description:
      "Plano AARRR completo (90 dias / 12 meses): aquisição, ativação, retenção, referral, revenue.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/marketing-plan",
  },
  {
    id: "marketing-ideas",
    name: "Marketing Ideas",
    description:
      "Ideias e táticas de growth quando trava o “como divulgar isso?”.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/marketing-ideas",
  },
  {
    id: "offers",
    name: "Offers",
    description:
      "Desenho de oferta: value stack, bônus, garantia, scarcity — o que está por baixo da copy.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/offers",
  },
  {
    id: "pricing",
    name: "Pricing",
    description:
      "Decisões de preço, packaging, freemium vs pago e framing de valor.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/pricing",
  },
  {
    id: "seo-audit",
    name: "SEO Audit",
    description:
      "Auditoria técnica e on-page: ranking, indexação, Core Web Vitals e drops de tráfego.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/seo-audit",
  },
  {
    id: "ads",
    name: "Ads",
    description:
      "Campanhas pagas (Google/Meta/LinkedIn): targeting, ROAS, retargeting e budget.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/ads",
  },
  {
    id: "ab-testing",
    name: "A/B Testing",
    description:
      "Hipótese, variantes, significância e backlog de experimentos de growth.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/ab-testing",
  },
  {
    id: "emails",
    name: "Emails",
    description:
      "Sequências, drip, onboarding e lifecycle e-mail com automação.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/emails",
  },
  {
    id: "customer-research",
    name: "Customer Research",
    description:
      "ICP, entrevistas, VOC, reviews e mining — o que o cliente realmente diz.",
    category: "marketing",
    url: "https://github.com/coreyhaines31/marketingskills",
    status: "local",
    install: "~/.agents/skills/customer-research",
  },

  // —— Social ——
  {
    id: "post-writer",
    name: "Post Writer",
    description:
      "Posts LinkedIn na minha voz (about-me / voice.md) a partir de notas ou ideia solta.",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/post-writer",
  },
  {
    id: "post-scorer",
    name: "Post Scorer",
    description:
      "Nota o post com base no histórico real de performance — não em dica genérica.",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/post-scorer",
  },
  {
    id: "content-matrix",
    name: "Content Matrix",
    description:
      "32+ ideias de post cruzando pilares × formatos (tabela pronta pro mês).",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/content-matrix",
  },
  {
    id: "hook-generator",
    name: "Hook Generator",
    description:
      "6 aberturas clickbait no formato 2 linhas — dígitos, “How I”, contraste.",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/hook-generator",
  },
  {
    id: "gemini-carousel",
    name: "Gemini Carousel",
    description:
      "Carrossel LinkedIn slide a slide: brief → aprovação → prompts de imagem.",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/gemini-carousel",
  },
  {
    id: "voice-builder",
    name: "Voice Builder",
    description:
      "Perfil de voz a partir de entrevista + samples — base de todo conteúdo escrito.",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/voice-builder",
  },
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail",
    description:
      "Thumbnail de alta CTR com foto de referência, título e cores de marca.",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/youtube-thumbnail",
  },
  {
    id: "reels-scripting",
    name: "Reels Scripting",
    description:
      "Script de Reel a partir de referência + newsletter — tom e repurpose.",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/reels-scripting",
  },
  {
    id: "social",
    name: "Social",
    description:
      "Conteúdo e calendário multi-rede: LinkedIn, X, Reels, Shorts, scheduling.",
    category: "social",
    url: "https://github.com/charlie947/social-media-skills",
    status: "local",
    install: "~/.agents/skills/social",
  },
]

export const SKILLS_CATALOG_NOTE =
  "Inventário vivo do setup do dino — skills instaladas em .agents/skills e ~/.grok/skills (inclui Marc Lou, marketing pack, design e social)."
