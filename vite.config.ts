import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return ({
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
    env,
  })],
  envPrefix: ['CLIENT_'],
  define: mode === 'development' ? {
    'process.env': env
  } : {}
})})
