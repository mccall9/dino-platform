import { useNavigate } from "@tanstack/react-router"
import { Search } from "lucide-react"
import * as React from "react"
import { SKILLS_CATALOG, type SkillCatalogEntry } from "@dino/shared"

function filterSkills(query: string): SkillCatalogEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return SKILLS_CATALOG
  return SKILLS_CATALOG.filter(
    (s) =>
      s.id.includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.source?.toLowerCase().includes(q) ?? false) ||
      s.category.includes(q),
  )
}

function isModK(e: KeyboardEvent) {
  return (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"
}

/** Floating Search button (top-right) + command palette modal. */
export function SkillSearch() {
  const [open, setOpen] = React.useState(false)
  const isMac = React.useMemo(() => {
    if (typeof navigator === "undefined") return false
    return /Mac|iPhone|iPad/.test(navigator.platform)
  }, [])

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (isModK(e)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        className="ds-search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Buscar skills"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Search size={14} strokeWidth={2} aria-hidden />
        <span>Search</span>
        <kbd className="ds-search-kbd">{isMac ? "⌘K" : "Ctrl K"}</kbd>
      </button>

      {open ? <SkillSearchPalette onClose={() => setOpen(false)} /> : null}
    </>
  )
}

function SkillSearchPalette({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const results = React.useMemo(() => filterSkills(query), [query])

  React.useEffect(() => {
    inputRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  React.useEffect(() => {
    setActive(0)
  }, [query])

  React.useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${active}"]`,
    )
    el?.scrollIntoView({ block: "nearest" })
  }, [active])

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  function openSkill(skill: SkillCatalogEntry) {
    onClose()
    void navigate({ to: "/skills/$id", params: { id: skill.id } })
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const skill = results[active]
      if (skill) openSkill(skill)
    }
  }

  return (
    <div
      className="ds-palette-root"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="ds-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Buscar skills"
      >
        <div className="ds-palette-search">
          <Search size={16} strokeWidth={2} aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search skills..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="ds-palette-list" ref={listRef} role="listbox">
          {results.length === 0 ? (
            <p className="ds-palette-empty">Nenhuma skill encontrada.</p>
          ) : (
            results.map((skill, i) => (
              <button
                key={skill.id}
                type="button"
                role="option"
                aria-selected={i === active}
                data-idx={i}
                data-active={i === active ? "true" : "false"}
                className="ds-palette-item"
                onMouseEnter={() => setActive(i)}
                onClick={() => openSkill(skill)}
              >
                <span className="ds-palette-item-id">{skill.id}</span>
                <span className="ds-palette-item-src">
                  {skill.source ?? skill.category}
                </span>
                <span className="ds-palette-item-desc">{skill.description}</span>
              </button>
            ))
          )}
        </div>

        <div className="ds-palette-foot">
          <span>{results.length} results</span>
          <span className="ds-palette-hints">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <span>move</span>
            <kbd>Enter</kbd>
            <span>open</span>
            <kbd>Esc</kbd>
            <span>close</span>
          </span>
        </div>
      </div>
    </div>
  )
}
