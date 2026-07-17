/**
 * Quick smoke for apps/api (native agents stack). No LLM.
 * Usage: bun run scripts/smoke-api.ts
 */
const base = process.env.API_URL ?? "http://localhost:3001"

async function main() {
  const health = await fetch(`${base}/health`)
  if (!health.ok) throw new Error(`/health ${health.status}`)
  const h = (await health.json()) as { ok: boolean }
  if (!h.ok) throw new Error("health not ok")

  const agents = await fetch(`${base}/agents`)
  if (!agents.ok) throw new Error(`/agents ${agents.status}`)
  const list = (await agents.json()) as { agents: { id: string }[] }
  if (!list.agents?.length) throw new Error("no agents")

  const run = await fetch(`${base}/agents/product-shell/runs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      prompt: "smoke finalize",
      execute: true,
    }),
  })
  if (!run.ok) throw new Error(`run ${run.status}`)
  const body = (await run.json()) as {
    status: string
    output?: { executed?: boolean; exitCode?: number }
  }
  if (body.status !== "succeeded" || body.output?.exitCode !== 0) {
    throw new Error(`run failed: ${JSON.stringify(body)}`)
  }

  console.log("smoke-api OK", {
    agents: list.agents.length,
    productShell: body.status,
    exit: body.output?.exitCode,
  })
}

main().catch((e) => {
  console.error("smoke-api FAIL", e)
  process.exit(1)
})
