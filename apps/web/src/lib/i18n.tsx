import * as React from "react"

export type Locale = "pt-BR" | "en-US"

const STORAGE_KEY = "dino-locale"

const messages = {
  "pt-BR": {
    // chrome
    "nav.skills": "Skills",
    "nav.agents": "Agents",
    "nav.home": "Home",
    "nav.search": "Buscar",
    "nav.searchAgents": "Agents",
    "search.placeholderSkills": "Buscar skills…",
    "search.placeholderAgents": "Buscar agents…",
    "search.noSkills": "Nenhuma skill encontrada.",
    "search.noAgents": "Nenhum agent encontrado.",
    "search.results": "resultados",
    "search.agents": "agents",
    "search.move": "mover",
    "search.open": "abrir",
    "search.close": "fechar",

    // home skills
    "home.titleSkills": "DINO SKILLS",
    "home.titleAgents": "DINO AGENTS",
    "home.leadSkills":
      "Pack npm com as skills do meu setup — design, marketing, código e o resto que o agent carrega quando constrói comigo.",
    "home.leadAgentsLive":
      "Claude Code, Cursor, Codex, Copilot… — agents que carregam o pack.",
    "home.leadAgentsMaint": "Área de agents temporariamente indisponível.",
    "home.howto": "How to use",
    "home.howto.installStrong": "Install",
    "home.howto.installRest": "baixa o pack no agent.",
    "home.howto.startStrong": "Start",
    "home.howto.startRest": "roda o protocol pra escolher a skill.",
    "home.howto.step1": "1 · Baixar o pack",
    "home.howto.step2": "2 · Rodar / escolher skill",
    "home.howto.prompt":
      "Rode `npx dino-skills install` e depois `npx dino-skills start` e escolha a skill certa.",
    "home.howto.flags": "Flags:",
    "home.collection": "Collection",
    "home.agentsSection": "Agents",
    "home.metaDino": "{n} dino · {total} no pack",
    "home.metaRuntimes": "{n} runtimes",
    "home.seeAll": "Ver todas as skills",
    "home.openAgents": "Abrir página de agents",
    "home.footer":
      "Dino Skills · inventário vivo · dino.blog / Clube dos Curiosos",
    "home.howto.agentsLive":
      "Escolhe o agent → vê origem + skills que encaixam. O pack é o mesmo:",

    // maintenance
    "maint.badge": "manutenção",
    "maint.title": "Em manutenção",
    "maint.lead": "Estamos em manutenção.",
    "maint.body":
      "A área de Agents (Claude Code, Cursor, Codex, Copilot e o resto) volta em breve — com a mesma estrutura de skills e o pack dino-skills.",

    // skills catalog
    "skills.discoverTitle": "Descubra o pack dino completo",
    "skills.discoverLead":
      "Uma coleção de {n} skills de qualidade para build in public — design, marketing, social, revenue e workflows de agent. Carregue com",
    "skills.emptyTopic": "Nada nessa categoria.",
    "skills.footerPack": "skills · pack",
    "skills.filterAll": "todas",
    "skills.filterDev": "dev",
    "skills.filterDesign": "design",
    "skills.filterMarketing": "marketing",
    "skills.filterSocial": "social",

    // skill detail
    "skill.install": "Install",
    "skill.origin": "origem ↗",
    "skill.moreFrom": "Mais de {source}",
    "skill.prev": "← anterior",
    "skill.next": "próxima →",
    "skill.copy": "Copy",
    "skill.copied": "Copied",

    // agents / runtimes
    "agents.title": "Agents",
    "agents.lead":
      "Agents de AI que suportam Dino Skills. Mesmo pack — instale uma vez e use no Claude Code, Cursor, Codex, Copilot e afins.",
    "agents.howto": "How to use",
    "agents.howtoBody":
      "Peça pro agent rodar o CLI primeiro pra escolher a skill certa antes de mudar código.",
    "agents.howtoFoot":
      "Ou navegue a collection abaixo pelas melhores skills pra este agent.",
    "agents.topics": "Explore topics",
    "agents.other": "Outros agents",
    "agents.skillsFor": "Skills para {name}",
    "agents.bestFor": "Mais relevante quando você trabalha com",
    "agents.backSkills": "← Skills",
    "agents.skillsMode": "← Modo Skills",
    "agents.emptyTopic": "Nenhuma skill nesse tópico.",
    "agents.prev": "← anterior",
    "agents.next": "próximo →",
    "agents.metaMaint": "Agents · Manutenção",
    "agents.skillsCount": "{n} skills",
    "topic.all": "Todas",
    "topic.dev": "Dev",
    "topic.design": "Design",
    "topic.marketing": "Marketing",
    "topic.social": "Social",

    "locale.pt": "Português",
    "locale.en": "English",
    "locale.switch": "Idioma",

    "theme.switch": "Tema",
    "theme.dark": "Black",
    "theme.light": "White",

    "updates.title": "Receba updates",
    "updates.lead": "Skills novas do dino e notas de build in public.",
    "updates.placeholder": "Seu e-mail",
    "updates.subscribe": "Inscrever",
    "updates.thanks": "Valeu — em breve te aviso.",
    "updates.soon": "Lista em breve. E-mail guardado localmente.",

    "site.browse": "Browse",
    "site.topics": "Topics",
    "site.agents": "Agents",
    "site.bestSkills": "Best skills",
    "site.more": "More",
    "site.home": "Home",
    "site.skills": "Skills",
    "site.registry": "Pack",
    "site.llms": "llms.txt",
    "site.moreTopics": "Mais tópicos",
    "site.moreAgents": "Mais agents",
    "site.work": "Trabalha com a gente?",
    "site.copy": "© {year} Dino · Clube dos Curiosos",
    "site.github": "GitHub",
    "site.x": "X",
    "site.contribute": "Contribuir skill",
  },
  "en-US": {
    "nav.skills": "Skills",
    "nav.agents": "Agents",
    "nav.home": "Home",
    "nav.search": "Search",
    "nav.searchAgents": "Agents",
    "search.placeholderSkills": "Search skills…",
    "search.placeholderAgents": "Search agents…",
    "search.noSkills": "No skills found.",
    "search.noAgents": "No agents found.",
    "search.results": "results",
    "search.agents": "agents",
    "search.move": "move",
    "search.open": "open",
    "search.close": "close",

    "home.titleSkills": "DINO SKILLS",
    "home.titleAgents": "DINO AGENTS",
    "home.leadSkills":
      "npm pack with the skills from my setup — design, marketing, code and everything the agent loads when we build in public.",
    "home.leadAgentsLive":
      "Claude Code, Cursor, Codex, Copilot… — agents that load the pack.",
    "home.leadAgentsMaint": "Agents area temporarily unavailable.",
    "home.howto": "How to use",
    "home.howto.installStrong": "Install",
    "home.howto.installRest": "downloads the pack into your agent.",
    "home.howto.startStrong": "Start",
    "home.howto.startRest": "runs the protocol to pick the right skill.",
    "home.howto.step1": "1 · Download the pack",
    "home.howto.step2": "2 · Run / pick a skill",
    "home.howto.prompt":
      "Run `npx dino-skills install` then `npx dino-skills start` and pick the right skill.",
    "home.howto.flags": "Flags:",
    "home.collection": "Collection",
    "home.agentsSection": "Agents",
    "home.metaDino": "{n} dino · {total} in pack",
    "home.metaRuntimes": "{n} runtimes",
    "home.seeAll": "See all skills",
    "home.openAgents": "Open agents page",
    "home.footer":
      "Dino Skills · living inventory · dino.blog / Clube dos Curiosos",
    "home.howto.agentsLive":
      "Pick an agent → see origin + matching skills. Same pack:",

    "maint.badge": "maintenance",
    "maint.title": "Under maintenance",
    "maint.lead": "We're under maintenance.",
    "maint.body":
      "The Agents area (Claude Code, Cursor, Codex, Copilot and the rest) will be back soon — same skills structure and dino-skills pack.",

    "skills.discoverTitle": "Discover the full dino pack",
    "skills.discoverLead":
      "A collection of {n} high-quality skills for shipping in public — design, marketing, social, revenue and agent workflows. Load with",
    "skills.emptyTopic": "Nothing in this category.",
    "skills.footerPack": "skills · pack",
    "skills.filterAll": "all",
    "skills.filterDev": "dev",
    "skills.filterDesign": "design",
    "skills.filterMarketing": "marketing",
    "skills.filterSocial": "social",

    "skill.install": "Install",
    "skill.origin": "source ↗",
    "skill.moreFrom": "More from {source}",
    "skill.prev": "← previous",
    "skill.next": "next →",
    "skill.copy": "Copy",
    "skill.copied": "Copied",

    "agents.title": "Agents",
    "agents.lead":
      "AI agents that support Dino Skills. Same pack — install once, load in Claude Code, Cursor, Codex, Copilot, and friends.",
    "agents.howto": "How to use",
    "agents.howtoBody":
      "Ask your agent to run the CLI first so it can choose the right skill before making changes.",
    "agents.howtoFoot":
      "Or browse the collection below for the best skills for this agent.",
    "agents.topics": "Explore topics",
    "agents.other": "Other agents",
    "agents.skillsFor": "Skills for {name}",
    "agents.bestFor": "Most relevant when you're working on",
    "agents.backSkills": "← Skills",
    "agents.skillsMode": "← Skills mode",
    "agents.emptyTopic": "No skills in this topic.",
    "agents.prev": "← previous",
    "agents.next": "next →",
    "agents.metaMaint": "Agents · Maintenance",
    "agents.skillsCount": "{n} skills",
    "topic.all": "All",
    "topic.dev": "Dev",
    "topic.design": "Design",
    "topic.marketing": "Marketing",
    "topic.social": "Social",

    "locale.pt": "Portuguese",
    "locale.en": "English",
    "locale.switch": "Language",

    "theme.switch": "Theme",
    "theme.dark": "Black",
    "theme.light": "White",

    "updates.title": "Get updates",
    "updates.lead": "Fresh dino skills and build-in-public notes.",
    "updates.placeholder": "Enter your email",
    "updates.subscribe": "Subscribe",
    "updates.thanks": "Thanks — we'll be in touch.",
    "updates.soon": "List coming soon. Email saved locally.",

    "site.browse": "Browse",
    "site.topics": "Topics",
    "site.agents": "Agents",
    "site.bestSkills": "Best skills",
    "site.more": "More",
    "site.home": "Home",
    "site.skills": "Skills",
    "site.registry": "Pack",
    "site.llms": "llms.txt",
    "site.moreTopics": "More topics",
    "site.moreAgents": "More agents",
    "site.work": "Work with us?",
    "site.copy": "© {year} Dino · Clube dos Curiosos",
    "site.github": "GitHub",
    "site.x": "X",
    "site.contribute": "Contribute a skill",
  },
} as const

export type MessageKey = keyof (typeof messages)["pt-BR"]

type Vars = Record<string, string | number>

function interpolate(template: string, vars?: Vars) {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    vars[k] !== undefined ? String(vars[k]) : `{${k}}`,
  )
}

type I18nCtx = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: MessageKey, vars?: Vars) => string
}

const I18nContext = React.createContext<I18nCtx | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "pt-BR"
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === "en-US" || v === "pt-BR") return v
  } catch {
    /* ignore */
  }
  return "pt-BR"
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("pt-BR")
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const stored = readStoredLocale()
    setLocaleState(stored)
    document.documentElement.lang = stored === "pt-BR" ? "pt-BR" : "en"
    setReady(true)
  }, [])

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l === "pt-BR" ? "pt-BR" : "en"
  }, [])

  const t = React.useCallback(
    (key: MessageKey, vars?: Vars) => {
      const table = messages[locale] ?? messages["pt-BR"]
      const raw = table[key] ?? messages["pt-BR"][key] ?? key
      return interpolate(raw, vars)
    },
    [locale],
  )

  const value = React.useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  )

  // Avoid flash of wrong locale on client after hydrate
  if (!ready && typeof window !== "undefined") {
    // still render with default pt-BR; effect will sync
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = React.useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return ctx
}
