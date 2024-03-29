import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import {readFile} from 'fs/promises';
import api from "./api";
import { serve } from "@hono/node-server";
import './env'

const isProd = process.env.NODE_ENV === "production"

let html = await readFile(isProd ? "build/index.html" : "index.html", "utf8")

if (!isProd) {
  html = html.replace("<head>", `
  <head>
  <script type="module">
  import RefreshRuntime from "/@react-refresh"
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
  </script>
  
  <script type="module" src="/@vite/client"></script>
  `)
}

const app = new Hono()

app.route('/api/', api)
app.use('*', async (ctx, next) => {
  ctx.res.headers.set("X-Powered-By", "Hono");
  await next();
})

app.use("/assets/*", serveStatic({root: isProd ? 'build/' : './'}))

app.get('/*', (ctx) => ctx.html(html))

if (isProd) {
  serve({...app, port: 8080}, (info) => {
    console.info(`Server running at http://localhost:${info.port}`)
  })
}

export default app
