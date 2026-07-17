import { createFileRoute, Link } from "@tanstack/react-router"
import { SiteHeader } from "~/components/SiteHeader"

export const Route = createFileRoute("/ideias")({
  component: IdeiasPage,
})

function IdeiasPage() {
  return (
    <div className="club-page min-h-screen">
      <SiteHeader current="ideias" />
      <main id="conteudo" className="club-shell">
        <div>
          <span className="eyebrow">Reserva editorial</span>
          <h1 className="mt-2 mb-3 text-4xl font-bold tracking-tight">Ideias</h1>
          <p className="m-0 max-w-xl text-[var(--muted)] leading-relaxed">
            Conteúdo editorial do dino.blog. Port completo na Fase 4 — até lá o
            acervo vive em{" "}
            <a
              href="https://dinoclub.blog/ideias"
              className="font-bold text-[var(--green-dark)] underline underline-offset-2"
            >
              dinoclub.blog/ideias
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
