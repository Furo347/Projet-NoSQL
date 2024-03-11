import {Hono} from "hono";
import {checkWord, Themes} from "./checkWords.ts";

const api = new Hono()

api.get('/hello', (ctx) => ctx.text('World!'))
console.log(await checkWord('crocodile',Themes.Animal))
export default api;
