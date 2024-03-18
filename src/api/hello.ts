import {Hono} from "hono";
import {checkWord, Themes} from "./checkWords.ts";

const api = new Hono()

api.get('/hello', (ctx) => ctx.text('World!'))
export default api;
