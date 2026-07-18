import * as React from "react"
import { useI18n, type Locale } from "~/lib/i18n"

const CHOSEN_KEY = "dino-locale-chosen"

/**
 * First-visit language popup (BR / US).
 * Preference still lives in i18n localStorage; this only gates the welcome modal.
 */
export function LocaleGate() {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    try {
      if (!localStorage.getItem(CHOSEN_KEY)) {
        setOpen(true)
        document.body.style.overflow = "hidden"
      }
    } catch {
      /* ignore */
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  function choose(next: Locale) {
    setLocale(next)
    try {
      localStorage.setItem(CHOSEN_KEY, "1")
    } catch {
      /* ignore */
    }
    document.body.style.overflow = ""
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="ds-locale-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ds-locale-gate-title"
    >
      <div className="ds-locale-gate-card">
        <p className="ds-locale-gate-kicker">Dino Skills</p>
        <h2 id="ds-locale-gate-title" className="ds-locale-gate-title">
          {locale === "en-US" ? "Choose your language" : "Escolha o idioma"}
        </h2>
        <p className="ds-locale-gate-lead">
          {locale === "en-US"
            ? "You can change this anytime in the footer."
            : "Você pode mudar depois no rodapé do site."}
        </p>

        <div className="ds-locale-gate-actions">
          <button
            type="button"
            className="ds-locale-gate-btn"
            data-active={locale === "pt-BR" ? "true" : "false"}
            onClick={() => choose("pt-BR")}
          >
            <span className="ds-flag" aria-hidden>
              🇧🇷
            </span>
            <span className="ds-locale-gate-btn-text">
              <strong>Português</strong>
              <span>Brasil · PT-BR</span>
            </span>
          </button>
          <button
            type="button"
            className="ds-locale-gate-btn"
            data-active={locale === "en-US" ? "true" : "false"}
            onClick={() => choose("en-US")}
          >
            <span className="ds-flag" aria-hidden>
              🇺🇸
            </span>
            <span className="ds-locale-gate-btn-text">
              <strong>English</strong>
              <span>United States · EN</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
