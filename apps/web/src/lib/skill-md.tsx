import * as React from "react"

/** Split YAML frontmatter from markdown body. */
export function splitSkillMd(raw: string): { frontmatter: string; body: string } {
  const text = raw.replace(/^\uFEFF/, "")
  if (!text.startsWith("---")) {
    return { frontmatter: "", body: text }
  }
  const end = text.indexOf("\n---", 3)
  if (end === -1) return { frontmatter: "", body: text }
  const frontmatter = text.slice(4, end).trim()
  const body = text.slice(end + 4).replace(/^\s*\n/, "")
  return { frontmatter, body }
}

function highlightYaml(line: string): React.ReactNode {
  const m = line.match(/^([A-Za-z0-9_-]+):(.*)$/)
  if (!m) return line
  return (
    <>
      <span className="sk-yaml-key">{m[1]}</span>
      <span className="sk-yaml-colon">:</span>
      <span className="sk-yaml-val">{m[2]}</span>
    </>
  )
}

/** Minimal markdown → React (enough for SKILL.md docs). */
export function SkillMarkdown({ source }: { source: string }) {
  const { frontmatter, body } = React.useMemo(() => splitSkillMd(source), [source])
  const blocks = React.useMemo(() => parseBlocks(body), [body])

  return (
    <div className="sk-md">
      {frontmatter ? (
        <pre className="sk-frontmatter">
          <code>
            <span className="sk-yaml-fence">---</span>
            {"\n"}
            {frontmatter.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {highlightYaml(line)}
                {"\n"}
              </React.Fragment>
            ))}
            <span className="sk-yaml-fence">---</span>
          </code>
        </pre>
      ) : null}
      <div className="sk-body">{blocks.map((b, i) => renderBlock(b, i))}</div>
    </div>
  )
}

type Block =
  | { type: "h1" | "h2" | "h3" | "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "hr" }
  | { type: "blockquote"; text: string }

function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr" })
      i++
      continue
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const buf: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i])
        i++
      }
      i++ // closing fence
      blocks.push({ type: "code", lang, code: buf.join("\n") })
      continue
    }

    const hm = line.match(/^(#{1,4})\s+(.+)$/)
    if (hm) {
      const level = hm[1].length as 1 | 2 | 3 | 4
      blocks.push({ type: `h${level}` as "h1" | "h2" | "h3" | "h4", text: hm[2] })
      i++
      continue
    }

    if (line.startsWith(">")) {
      const buf: string[] = [line.replace(/^>\s?/, "")]
      i++
      while (i < lines.length && lines[i].startsWith(">")) {
        buf.push(lines[i].replace(/^>\s?/, ""))
        i++
      }
      blocks.push({ type: "blockquote", text: buf.join(" ") })
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""))
        i++
      }
      blocks.push({ type: "ul", items })
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""))
        i++
      }
      blocks.push({ type: "ol", items })
      continue
    }

    const buf: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith(">") &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      buf.push(lines[i])
      i++
    }
    blocks.push({ type: "p", text: buf.join(" ") })
  }

  return blocks
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const token = m[0]
    if (token.startsWith("**")) {
      parts.push(<strong key={k++}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith("`")) {
      parts.push(
        <code key={k++} className="sk-inline-code">
          {token.slice(1, -1)}
        </code>,
      )
    } else {
      const lm = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (lm) {
        parts.push(
          <a key={k++} href={lm[2]} target="_blank" rel="noopener noreferrer">
            {lm[1]}
          </a>,
        )
      }
    }
    last = m.index + token.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function renderBlock(b: Block, i: number): React.ReactNode {
  switch (b.type) {
    case "h1":
      return <h1 key={i}>{renderInline(b.text)}</h1>
    case "h2":
      return <h2 key={i}>{renderInline(b.text)}</h2>
    case "h3":
      return <h3 key={i}>{renderInline(b.text)}</h3>
    case "h4":
      return <h4 key={i}>{renderInline(b.text)}</h4>
    case "p":
      return <p key={i}>{renderInline(b.text)}</p>
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it, j) => (
            <li key={j}>{renderInline(it)}</li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol key={i}>
          {b.items.map((it, j) => (
            <li key={j}>{renderInline(it)}</li>
          ))}
        </ol>
      )
    case "code":
      return (
        <pre key={i} className="sk-code">
          <code>{b.code}</code>
        </pre>
      )
    case "hr":
      return <hr key={i} />
    case "blockquote":
      return <blockquote key={i}>{renderInline(b.text)}</blockquote>
  }
}

export function buildFallbackSkillMd(skill: {
  id: string
  name: string
  description: string
  install?: string
}): string {
  return `---
name: ${skill.id}
description: ${skill.description}
---

# ${skill.name}

${skill.description}

${skill.install ? `## Install\n\n\`${skill.install}\`\n` : ""}
`
}

export function resolveInstallCmd(skill: {
  id: string
  install?: string
  url?: string
  status: string
}): string {
  const raw = skill.install?.split("·")[0]?.trim()
  if (
    raw &&
    (/^(npx|\/plugin|bun|npm)/.test(raw) || raw.includes("skills add"))
  ) {
    return raw
  }
  if (skill.id === "dino-skills-root") {
    return "npx dino-skills install"
  }
  if (skill.id === "dino-review") {
    return "npx dino-skills get dino-review"
  }
  if (skill.url?.includes("github.com")) {
    const base = skill.url.replace(/\/tree\/[^/]+.*$/, "")
    return `npx skills add ${base} --skill ${skill.id}`
  }
  if (raw) return raw
  return `já no setup · ${skill.id}`
}

/** Optional second install line (agent registry style). */
export function resolveAltInstallCmd(skill: {
  id: string
  url?: string
}): string | null {
  if (skill.id === "dino-skills-root") {
    return "npx dino-skills start"
  }
  if (skill.id === "dino-review") {
    return "npx skills add https://github.com/mccall9/dino-platform --skill dino-review"
  }
  // Any skill in the pack can be loaded via get
  return `npx dino-skills get ${skill.id}`
}
