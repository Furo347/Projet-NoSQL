import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import fs from 'fs/promises'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'build',
  },
  plugins: [react(), devServer({
    entry: 'src/server.ts',
    exclude: [
      /.*\.tsx?($|\?)/,
      /.*\.(s?css|less)($|\?)/,
      /.*\.(svg|png)($|\?)/,
      /^\/@.+$/,
      /^\/favicon\.ico$/,
      /^\/(public|assets|static)\/.+/,
      /^\/node_modules\/.*/
    ],
    injectClientScript: false,
    env: async () => {
      const envFile = await fs.readFile('.env', 'utf-8')
      const env: Record<string, string> = {}

      for (const line of envFile.split(/\n|\r\n/)) {
        const [key, val] = line.split('=')
        env[key] = val
      }

      return env
    }
  })],
  envPrefix: ['CLIENT_']
})
