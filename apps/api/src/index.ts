import { app } from "./app"

// Bun auto-loads apps/api/.env when cwd is apps/api
const port = Number(process.env.PORT ?? 3001)
const product = process.env.DINO_PRODUCT_ROOT ?? "(unset)"

app.listen(port)

console.log(
  `🦕 dino-api http://localhost:${port} · /health · /agents/* · native only`,
)
console.log(`   DINO_PRODUCT_ROOT=${product}`)
