import * as React from "react"
import { Cpu } from "lucide-react"
import type { RuntimeId } from "@dino/shared"

/** Brand logos (Lobe Icons monochrome SVGs) — tinted via currentColor + accent. */
const LOGO_SRC: Partial<Record<RuntimeId, string>> = {
  "claude-code": "/assets/agents/claude-code.svg",
  cursor: "/assets/agents/cursor.svg",
  codex: "/assets/agents/codex.svg",
  "github-copilot": "/assets/agents/github-copilot.svg",
  windsurf: "/assets/agents/windsurf.svg",
  gemini: "/assets/agents/gemini.svg",
  cline: "/assets/agents/cline.svg",
  grok: "/assets/agents/grok.svg",
  kimi: "/assets/agents/kimi.svg",
}

/** Brand mark for each coding agent — same tile shape, accent palette. */
export function AgentIcon({
  id,
  accent,
  size = "md",
  className = "",
}: {
  id: string
  accent?: string
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const src = LOGO_SRC[id as RuntimeId]
  const logoPct = size === "lg" ? "56%" : size === "sm" ? "54%" : "55%"

  return (
    <span
      className={`ds-agent-icon ds-agent-icon-${size} ${className}`.trim()}
      style={
        {
          "--agent-accent": accent ?? "#0ea5e9",
        } as React.CSSProperties
      }
      aria-hidden
    >
      {src ? (
        <span
          className="ds-agent-icon-logo"
          style={
            {
              width: logoPct,
              height: logoPct,
              WebkitMaskImage: `url(${src})`,
              maskImage: `url(${src})`,
            } as React.CSSProperties
          }
        />
      ) : (
        <Cpu size={size === "lg" ? 20 : size === "sm" ? 14 : 16} strokeWidth={2.1} />
      )}
    </span>
  )
}
