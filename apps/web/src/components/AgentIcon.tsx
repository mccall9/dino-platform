import * as React from "react"
import {
  Bot,
  Code2,
  Command,
  Cpu,
  Moon,
  MousePointer2,
  Sparkles,
  Terminal,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react"
import type { RuntimeId } from "@dino/shared"

const ICONS: Record<RuntimeId, LucideIcon> = {
  "claude-code": Bot,
  cursor: MousePointer2,
  codex: Code2,
  "github-copilot": Command,
  windsurf: Waves,
  gemini: Sparkles,
  cline: Terminal,
  grok: Zap,
  kimi: Moon,
}

/** Brand-ish icon mark for each coding agent. */
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
  const Icon = ICONS[id as RuntimeId] ?? Cpu
  const px = size === "lg" ? 20 : size === "sm" ? 14 : 16

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
      <Icon size={px} strokeWidth={2.1} />
    </span>
  )
}

