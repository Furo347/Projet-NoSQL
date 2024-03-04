import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import {readFile} from 'fs/promises';
import api from "./api/hello";

let html = await readFile("index.html", "utf8")

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

const app = new Hono()

app.route('/api/', api)
app.use('*', async (ctx, next) => {
  ctx.res.headers.set("X-Powered-By", "Hono");
  await next();
})

app.use("/assets/*", serveStatic({root: './'}))

app.get('/*', (ctx) => ctx.html(html))


export default app