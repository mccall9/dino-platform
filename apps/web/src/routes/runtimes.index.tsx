import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { RUNTIMES_CATALOG } from "@dino/shared"
import { skillsForRuntime } from "~/lib/runtimes"

export const Route = createFileRoute("/runtimes/")({
  component: RuntimesCatalogPage,
  head: () => ({
    meta: [
      { title: "Agents · Dino Skills" },
      {
        name: "description",
        content:
          "Claude, GPT, Grok, Kimi — onde o pack dino-skills roda e quais skills cada um carrega.",
      },
    ],
  }),
})

function RuntimesCatalogPage() {
  return (
    <div className="ds-discover ds-discover-agent">
      <nav className="sk-crumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span className="sk-crumb-current">Agents</span>
      </nav>

      <header className="ds-discover-hero">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Agents that run the pack
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Claude, GPT, Grok e Kimi — cada um com origem, como instalar o pack e
          as skills que encaixam melhor. Mesma estrutura do inventário, modo
          agent.
        </motion.p>
      </header>

      <ul className="ds-grid ds-grid-2">
        {RUNTIMES_CATALOG.map((rt, i) => {
          const count = skillsForRuntime(rt.id).length
          return (
            <motion.li
              key={rt.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(0.04 + i * 0.05, 0.35),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to="/runtimes/$id"
                params={{ id: rt.id }}
                className="ds-card ds-card-agent"
              >
                <div className="ds-agent-card-top">
                  <h3 className="ds-card-id">{rt.name}</h3>
                  <span
                    className="ds-agent-dot"
                    style={{ background: rt.accent }}
                    aria-hidden
                  />
                </div>
                <p>{rt.description}</p>
                <div className="ds-card-foot">
                  <span className="ds-source">
                    <i style={{ background: rt.accent }} aria-hidden />
                    {rt.origin}
                  </span>
                  <span className="ds-agent-count">{count} skills</span>
                </div>
              </Link>
            </motion.li>
          )
        })}
      </ul>

      <footer className="ds-footer">
        <p>
          <Link to="/">← Skills mode</Link>
          {" · "}
          <code className="ds-inline-code">npx dino-skills install</code>
        </p>
      </footer>
    </div>
  )
}
