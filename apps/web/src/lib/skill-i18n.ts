import type { SkillCatalogEntry } from "@dino/shared"
import type { Locale } from "~/lib/i18n"

/** English UI copy for catalog cards (PT lives in skill.description). */
export const SKILL_DESCRIPTION_EN: Record<string, string> = {
  "dino-skills-root":
    "Router for the dino-skills npm pack — picks the right skill (design, marketing, social…) before the agent changes code.",
  "dino-review":
    "Landing/SaaS review in the dino ship style: hero, single CTA, proof, pricing, OG.",
  "create-skill":
    "Create a new Grok skill (SKILL.md + scripts) with interview and full scaffold.",
  "check-work":
    "Verify work with a subagent: diff, build, tests, and fixes before calling it done.",
  superpowers:
    "Full agentic process: brainstorm → plan → TDD → subagents → review. Stops the agent from coding blind.",
  context7:
    "Up-to-date library docs in the LLM context (anti-hallucination for old APIs). CLI or MCP.",
  imagine:
    "image_gen / image_edit workflow in Grok: prompt craft, references, and asset consistency.",
  "company-skills-catalog":
    "Map of skill packs (dev, design, marketing, social…) and how to load each one.",
  "design-taste-frontend":
    "Anti-slop for landings/portfolios: real visual direction, audit-first, no generic AI UI.",
  "frontend-design":
    "Interfaces with intentional aesthetic direction — type, color, and composition.",
  "design-brief":
    "Design brief via interview + codebase exploration — foundation before building UI.",
  "design-flow":
    "Full design→build flow: brief, tokens, frontend, review in a guided sequence.",
  "design-review":
    "Structured critique: hierarchy, consistency, responsive, a11y, and fidelity to the brief.",
  "design-tokens":
    "Generate tokens (CSS vars / Tailwind): light/dark, type ramp, spacing, components.",
  "grill-me":
    "Relentless interview until design/plan decisions are locked — zero ambiguity.",
  "brief-to-tasks":
    "Break a brief into a checklist of independent, buildable vertical slices.",
  "information-architecture":
    "Product structure: nav, hierarchy, URLs, flows — before the visuals.",
  "emil-design-eng":
    "UI polish in Emil Kowalski’s spirit: micro-detail, motion, software that feels expensive.",
  "apple-design":
    "Gestures, springs, materials, optical type — Apple-style interface foundations.",
  "transitions-dev":
    "Production micro-transitions (modal, badge, sheet…) with duration/easing tokens.",
  "improve-animations":
    "Motion audit in code + prioritized plan for what to animate (and what not to).",
  brandkit:
    "Premium brand kits: logo system, guidelines board, dark-tech / editorial identity.",
  "high-end-visual-design":
    "Agency-grade standards: type, shadow, card, spacing — blocks cheap AI defaults.",
  "product-marketing":
    "Product context (ICP, positioning) in product-marketing.md — base for other growth skills.",
  copywriting:
    "Conversion copy for home, landing, pricing, and feature pages — clear, specific, actionable.",
  cro: "Conversion rate optimization on pages and forms: what kills the click and what to fix first.",
  launch:
    "Launch plan / PH / feature release: checklist, momentum, and converting interest.",
  "marketing-plan":
    "Full AARRR plan (90 days / 12 months): acquisition, activation, retention, referral, revenue.",
  "marketing-ideas":
    "Growth ideas and tactics when you’re stuck on “how do I promote this?”.",
  offers:
    "Offer design: value stack, bonuses, guarantee, scarcity — what’s under the copy.",
  pricing:
    "Pricing decisions, packaging, freemium vs paid, and value framing.",
  revops:
    "Revenue operations: MQL/SQL, scoring, routing, pipeline, CRM, marketing→sales handoff.",
  "seo-audit":
    "Technical and on-page SEO audit: ranking, indexing, Core Web Vitals, traffic drops.",
  ads: "Paid campaigns (Google/Meta/LinkedIn): targeting, ROAS, retargeting, and budget.",
  "ab-testing":
    "Hypothesis, variants, significance, and a growth experiment backlog.",
  emails: "Sequences, drip, onboarding, and lifecycle email with automation.",
  "customer-research":
    "ICP, interviews, VOC, reviews, and mining — what the customer actually says.",
  "post-writer":
    "LinkedIn posts in your voice (about-me / voice.md) from notes or a loose idea.",
  "post-scorer":
    "Score a post against real performance history — not generic tips.",
  "content-matrix":
    "32+ post ideas crossing pillars × formats (ready monthly table).",
  "hook-generator":
    "6 two-line clickbait openings — digits, “How I”, contrast.",
  "gemini-carousel":
    "LinkedIn carousel slide by slide: brief → approval → image prompts.",
  "voice-builder":
    "Voice profile from interview + samples — base for all written content.",
  "youtube-thumbnail":
    "High-CTR thumbnail with reference photo, title, and brand colors.",
  "reels-scripting":
    "Reel script from a reference + newsletter — tone and repurpose.",
  social:
    "Multi-network content and calendar: LinkedIn, X, Reels, Shorts, scheduling.",
}

export function skillDescription(
  skill: SkillCatalogEntry,
  locale: Locale,
): string {
  if (locale === "en-US") {
    return (
      skill.descriptionEn ||
      SKILL_DESCRIPTION_EN[skill.id] ||
      skill.description
    )
  }
  // pt-BR (default): always Portuguese catalog text
  return skill.description
}

/**
 * When showing SKILL.md in pt-BR, replace English frontmatter description
 * with the Portuguese catalog blurb so the “desc” block isn’t English-only.
 */
export function localizeSkillMarkdown(
  raw: string,
  skill: SkillCatalogEntry,
  locale: Locale,
): string {
  if (locale !== "pt-BR") return raw

  const pt = skill.description.replace(/\n/g, " ").trim()
  if (!pt) return raw

  // Rewrite frontmatter description to Portuguese catalog blurb
  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3)
    if (end !== -1) {
      let fm = raw.slice(4, end).trimEnd()
      const body = raw.slice(end + 4)
      // remove existing description field (single or folded block until next key)
      fm = fm.replace(
        /^description:\s*(?:>\s*)?[\s\S]*?(?=^[a-zA-Z0-9_-]+:|\Z)/m,
        "",
      )
      fm = fm.replace(/\n{3,}/g, "\n\n").trim()
      const escaped = pt.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
      const newFm = `---\n${fm}\ndescription: "${escaped}"\n---`
      const note =
        "\n\n> **Nota (pt-BR):** a descrição acima está em português. O corpo do manual original da skill pode estar em inglês.\n"
      return newFm + note + body
    }
  }

  return raw
}
