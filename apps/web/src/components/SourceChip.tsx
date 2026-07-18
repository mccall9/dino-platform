import { resolveSourceOrigin } from "@dino/shared"

/** Origin chip — links to real source when known. */
export function SourceChip({
  source,
  className = "",
}: {
  source?: string
  className?: string
}) {
  const origin = resolveSourceOrigin(source)
  const label = origin?.label ?? source ?? "unknown"
  const inner = (
    <>
      <i aria-hidden />
      {label}
    </>
  )

  if (origin?.url) {
    return (
      <a
        className={`ds-source ds-source-link ${className}`.trim()}
        href={origin.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        {inner}
      </a>
    )
  }

  return <span className={`ds-source ${className}`.trim()}>{inner}</span>
}
