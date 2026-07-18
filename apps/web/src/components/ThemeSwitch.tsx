import { useTheme, type Theme } from "~/lib/theme"
import { useI18n } from "~/lib/i18n"

type Variant = "chrome" | "footer"

/**
 * Compact Black / White theme control.
 * Apple-ish: instant press feedback, high-contrast active state, tiny chrome.
 */
export function ThemeSwitch({
  className = "",
  variant = "chrome",
}: {
  className?: string
  variant?: Variant
}) {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()

  function pick(next: Theme) {
    if (next !== theme) setTheme(next)
  }

  return (
    <div
      className={`ds-theme ds-theme-${variant} ${className}`.trim()}
      role="group"
      aria-label={t("theme.switch")}
    >
      <button
        type="button"
        className="ds-theme-btn"
        data-active={theme === "dark" ? "true" : "false"}
        onClick={() => pick("dark")}
        title={t("theme.dark")}
        aria-label={t("theme.dark")}
        aria-pressed={theme === "dark"}
      >
        <span className="ds-theme-swatch ds-theme-swatch-dark" aria-hidden />
        <span className="ds-theme-code">B</span>
      </button>
      <button
        type="button"
        className="ds-theme-btn"
        data-active={theme === "light" ? "true" : "false"}
        onClick={() => pick("light")}
        title={t("theme.light")}
        aria-label={t("theme.light")}
        aria-pressed={theme === "light"}
      >
        <span className="ds-theme-swatch ds-theme-swatch-light" aria-hidden />
        <span className="ds-theme-code">W</span>
      </button>
    </div>
  )
}
