import { useI18n, type Locale } from "~/lib/i18n"

/** BR / US flag toggle — site-wide language (default pt-BR). */
export function LocaleSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()

  function pick(next: Locale) {
    if (next !== locale) setLocale(next)
  }

  return (
    <div
      className={`ds-locale ${className}`.trim()}
      role="group"
      aria-label={t("locale.switch")}
    >
      <button
        type="button"
        className="ds-locale-btn"
        data-active={locale === "pt-BR" ? "true" : "false"}
        onClick={() => pick("pt-BR")}
        title={t("locale.pt")}
        aria-label={t("locale.pt")}
        aria-pressed={locale === "pt-BR"}
      >
        <span className="ds-flag" aria-hidden>
          🇧🇷
        </span>
        <span className="ds-locale-code">PT</span>
      </button>
      <button
        type="button"
        className="ds-locale-btn"
        data-active={locale === "en-US" ? "true" : "false"}
        onClick={() => pick("en-US")}
        title={t("locale.en")}
        aria-label={t("locale.en")}
        aria-pressed={locale === "en-US"}
      >
        <span className="ds-flag" aria-hidden>
          🇺🇸
        </span>
        <span className="ds-locale-code">EN</span>
      </button>
    </div>
  )
}
