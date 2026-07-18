import { Link } from "@tanstack/react-router"
import * as React from "react"
import { RUNTIMES_CATALOG, SKILLS_CATALOG } from "@dino/shared"
import { LocaleSwitch } from "~/components/LocaleSwitch"
import { useI18n } from "~/lib/i18n"

const EMAIL_KEY = "dino-skills-subscribe-email"

/**
 * After “See all skills”: Get updates + multi-column site footer.
 * Dark theme (same as skills). Motion polish later.
 */
export function SiteOutro() {
  const { t } = useI18n()
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "ok">("idle")

  const bestSkills = React.useMemo(
    () =>
      SKILLS_CATALOG.filter((s) => s.featured || s.source === "dino").slice(
        0,
        5,
      ),
    [],
  )
  const agents = RUNTIMES_CATALOG.slice(0, 5)

  function onSubscribe(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!value || !value.includes("@")) return
    try {
      localStorage.setItem(EMAIL_KEY, value)
    } catch {
      /* ignore */
    }
    setStatus("ok")
    setEmail("")
  }

  const year = new Date().getFullYear()

  return (
    <div className="ds-outro">
      <div className="ds-outro-rule" aria-hidden />

      <section className="ds-updates" aria-labelledby="ds-updates-title">
        <h2 id="ds-updates-title">{t("updates.title")}</h2>
        <p className="ds-updates-lead">{t("updates.lead")}</p>

        {status === "ok" ? (
          <p className="ds-updates-thanks">{t("updates.soon")}</p>
        ) : (
          <form className="ds-updates-form" onSubmit={onSubscribe}>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={t("updates.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ds-updates-input"
              aria-label={t("updates.placeholder")}
            />
            <button type="submit" className="ds-updates-submit">
              {t("updates.subscribe")}
            </button>
          </form>
        )}
      </section>

      <div className="ds-outro-rule" aria-hidden />

      <nav className="ds-site-nav" aria-label="Site">
        <div className="ds-site-col">
          <h3>{t("site.browse")}</h3>
          <ul>
            <li>
              <Link to="/">{t("site.home")}</Link>
            </li>
            <li>
              <Link to="/skills">{t("site.skills")}</Link>
            </li>
            <li>
              <Link to="/runtimes">{t("site.agents")}</Link>
            </li>
            <li>
              <a
                href="https://github.com/mccall9/dino-platform/tree/master/packages/dino-skills"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("site.registry")}
              </a>
            </li>
          </ul>
        </div>

        <div className="ds-site-col">
          <h3>{t("site.topics")}</h3>
          <ul>
            <li>
              <Link to="/skills">{t("skills.filterDev")}</Link>
            </li>
            <li>
              <Link to="/skills">{t("skills.filterDesign")}</Link>
            </li>
            <li>
              <Link to="/skills">{t("skills.filterMarketing")}</Link>
            </li>
            <li>
              <Link to="/skills">{t("skills.filterSocial")}</Link>
            </li>
            <li>
              <Link to="/skills">{t("site.moreTopics")}</Link>
            </li>
          </ul>
        </div>

        <div className="ds-site-col">
          <h3>{t("site.agents")}</h3>
          <ul>
            {agents.map((a) => (
              <li key={a.id}>
                <Link to="/runtimes/$id" params={{ id: a.id }}>
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/runtimes">{t("site.moreAgents")}</Link>
            </li>
          </ul>
        </div>

        <div className="ds-site-col">
          <h3>{t("site.bestSkills")}</h3>
          <ul>
            {bestSkills.map((s) => (
              <li key={s.id}>
                <Link to="/skills/$id" params={{ id: s.id }}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ds-site-col">
          <h3>{t("site.more")}</h3>
          <ul>
            <li>
              <a
                href="https://github.com/mccall9/dino-platform"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("site.github")}
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("site.x")}
              </a>
            </li>
            <li>
              <a href="https://dino.blog" target="_blank" rel="noopener noreferrer">
                dino.blog
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="ds-outro-bottom">
        <p>{t("site.copy", { year })}</p>
        <div className="ds-outro-bottom-right">
          <LocaleSwitch />
          <a href="mailto:hello@dino.blog">{t("site.work")}</a>
        </div>
      </div>
    </div>
  )
}
