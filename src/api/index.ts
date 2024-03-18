import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator";
import {z} from "zod";
import {setResponseInRedis} from "../Redis/clientManager.ts";
import points from "./points.ts";
import word from "./word.ts";

const api = new Hono()
    
const routes = api
    .post('/response', zValidator('json', z.object({
        response: z.boolean()
    })), async (ctx) => {
        const { response }= ctx.req.valid('json');
        const result = await setResponseInRedis(response);
        return ctx.json(result);
    })
    .route('/', points)
    .route('/', word)

export type APIType = typeof routes;
export default api;
