import { Hono } from "hono";

const api = new Hono()

api.get('/hello', (ctx) => ctx.text('World!'))

export default api