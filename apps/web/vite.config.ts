import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
    }),
    viteReact(),
    // Prefer Vercel Build Output API when VERCEL=1 or NITRO_PRESET=vercel
    nitro(
      process.env.VERCEL || process.env.NITRO_PRESET === 'vercel'
        ? {
            preset: 'vercel',
            // Stable Node runtime on Vercel (avoid experimental bun serverless)
            vercel: {
              functions: {
                runtime: 'nodejs22.x',
              },
            },
          }
        : {},
    ),
  ],
})

