import { createFileRoute, Link } from "@tanstack/react-router"
import { SiteHeader } from "~/components/SiteHeader"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="club-page min-h-screen">
      <SiteHeader current="about" />
      <main id="conteudo" className="club-shell">
        <div>
          <span className="eyebrow">Sobre</span>
          <h1 className="mt-2 mb-3 text-4xl font-bold tracking-tight">
            Clube dos Curiosos
          </h1>
          <p className="m-0 max-w-xl text-[var(--muted)] leading-relaxed">
            Pessoas pensando em voz alta, sem marketplace de comunidades. Página
            completa na Fase 4; versão live em{" "}
            <a
              href="https://dinoclub.blog/about"
              className="font-bold text-[var(--green-dark)] underline underline-offset-2"
            >
              dinoclub.blog/about
            </a>
            .
          </p>
          <Link to="/" className="btn btn-secondary mt-6 inline-flex">
            ← Home do clube
          </Link>
        </div>
      </main>
    </div>
  )
}
