import { createFileRoute, Link } from "@tanstack/react-router"
import { SiteHeader } from "~/components/SiteHeader"

export const Route = createFileRoute("/")({
  component: ClubHome,
  head: () => ({
    meta: [
      { title: "dino.blog — Clube dos Curiosos" },
      {
        name: "description",
        content:
          "O Clube dos Curiosos no dino.blog: pessoas pensando em voz alta, fazendo perguntas e construindo coisas agora.",
      },
    ],
  }),
})

function ClubHome() {
  return (
    <div className="club-page">
      <SiteHeader current="home" />

      <main id="conteudo" className="club-shell">
        <section className="club-hero" aria-labelledby="club-hero-title">
          <div>
            <span className="eyebrow">Clube dos Curiosos</span>
            <h1 id="club-hero-title">
              Onde a curiosidade
              <br />
              encontra companhia
            </h1>
            <p className="club-hero-lede">
              Pessoas pensando em voz alta, fazendo perguntas e mostrando o que
              ainda está em construção — agora.
            </p>
            <ul className="club-hero-points" aria-label="O que acontece aqui">
              <li>Ideias e projetos em andamento</li>
              <li>Perguntas sem pose de especialista</li>
              <li>Conversas reais, não catálogo de clubes</li>
            </ul>
            <div className="club-hero-actions">
              <Link to="/login" search={{ next: "/feed" }} className="btn btn-primary">
                Entrar para participar
              </Link>
              <Link to="/about" className="btn btn-secondary">
                A história do clube
              </Link>
            </div>
          </div>
          <figure className="club-hero-art">
            <img
              src="/assets/dino-blog-hero.png"
              alt="Dino investigando uma ideia entre livros, uma lâmpada e objetos curiosos"
              width={1984}
              height={793}
            />
          </figure>
        </section>

        <section aria-labelledby="club-live-title">
          <div className="club-section-head">
            <div>
              <span className="eyebrow">Acontecendo agora</span>
              <h2 id="club-live-title">Conversas recentes</h2>
              <p>
                Prova de vida do clube — prévia pública do que a gente está
                pensando e construindo.
              </p>
            </div>
            <Link
              to="/login"
              search={{ next: "/feed" }}
              className="shrink-0 text-sm font-bold text-[var(--green-dark)]"
            >
              Entrar para participar →
            </Link>
          </div>
          <div className="club-card club-card-muted">
            <p className="m-0">
              <strong className="text-[var(--ink)]">Fase 1</strong> — as
              prévias ao vivo (Supabase) chegam na Fase 3. No produto estático
              atual isso já roda em{" "}
              <a
                className="font-bold text-[var(--green-dark)] underline underline-offset-2"
                href="https://dinoclub.blog"
                target="_blank"
                rel="noreferrer"
              >
                dinoclub.blog
              </a>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="featured-club-title">
          <div className="club-section-head">
            <div>
              <span className="eyebrow">Um só espaço</span>
              <h2 id="featured-club-title">A história do clube</h2>
              <p>
                Entre para ler e participar das conversas. Aqui fica o contexto
                — quem somos e como convivemos.
              </p>
            </div>
          </div>
          <article className="club-card">
            <h3 className="mt-0 mb-2 text-xl font-bold">Clube dos Curiosos</h3>
            <p className="m-0 text-[var(--muted)] leading-relaxed">
              Um espaço para curiosidade sem performance. Na Fase 2–3 ligamos
              login, membership e o feed de conversas neste monorepo.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/login" search={{ next: "/feed" }} className="btn btn-primary">
                Entrar para participar
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Sobre
              </Link>
            </div>
          </article>
        </section>

        <footer className="border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>dino.blog · monorepo Fase 1</span>
            <Link
              to="/dev/agents"
              className="text-[var(--green-dark)] underline underline-offset-2"
            >
              Dev: agents console
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
