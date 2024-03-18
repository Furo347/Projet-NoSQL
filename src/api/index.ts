import { Hono } from "hono";
import { countPoints } from "./countPoints.ts";
import {getScoreBoard, insertInMongo} from "../Mongodb/schema.ts";
import {zValidator} from "@hono/zod-validator";
import {z} from "zod";
import {setResponseInRedis} from "../Redis/clientManager.ts";

const api = new Hono();

api.get('/count', async (ctx) => {
    const pointsCount = await countPoints();
    return ctx.json({ count: pointsCount });
});

api.get('/scoreboard', async (ctx) => {
    const scoreBoard = await getScoreBoard();
    return ctx.json(scoreBoard);
});

api.post('/points', zValidator('json', z.object({
    name: z.string(),
    points: z.number().positive()
})), async (ctx) => {
    const { name, points } = ctx.req.valid('json');
    const result = await insertInMongo(name, points);
    return ctx.json(result);
});

api.post('/response', zValidator('json', z.object({
    response: z.boolean()
})), async (ctx) => {
    const { response}= ctx.req.valid('json');
    const result = await setResponseInRedis(response);
    return ctx.json(result);
});

export default api;
