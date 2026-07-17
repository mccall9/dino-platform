import { createFileRoute, Link } from "@tanstack/react-router"
import { z } from "zod"
import { SiteHeader } from "~/components/SiteHeader"

const loginSearchSchema = z.object({
  next: z.string().optional().catch("/feed"),
})

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  component: LoginPage,
})

function LoginPage() {
  const { next } = Route.useSearch()

  return (
    <div className="club-page min-h-screen">
      <SiteHeader current="login" />
      <main id="conteudo" className="club-shell max-w-lg">
        <div className="club-card">
          <span className="eyebrow">Entrar</span>
          <h1 className="mt-2 mb-2 text-3xl font-bold tracking-tight">
            Login com email (OTP)
          </h1>
          <p className="m-0 text-[var(--muted)] leading-relaxed">
            Auth Supabase chega na <strong className="text-[var(--ink)]">Fase 2</strong>.
            Destino após login:{" "}
            <code className="rounded bg-[var(--soft)] px-1.5 py-0.5 text-sm">
              {next || "/feed"}
            </code>
          </p>
          <p className="mt-4 mb-0 text-sm text-[var(--muted)]">
            Enquanto isso, use o login em produção:
          </p>
          <a
            className="btn btn-primary mt-4 inline-flex"
            href={`https://dinoclub.blog/login?next=${encodeURIComponent(next || "/feed")}`}
          >
            Abrir login em dinoclub.blog
          </a>
          <div className="mt-4">
            <Link to="/" className="text-sm font-bold text-[var(--green-dark)] underline">
              ← Voltar ao clube
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
