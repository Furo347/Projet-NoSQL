import { Hono } from 'hono';
import { getResponseFromRedis } from '../util/redis.ts';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getScoreBoard, insertInMongo } from '../util/mongo.ts';

async function countPoints(name: string) {
    let points = 0;
    const response = await getResponseFromRedis(name);
    if (response !== null) {
        points = (response.match(/true/g) || []).length;
    }
    return points * 10;
}

const points = new Hono()
    .get('/scoreboard', async (ctx) => {
        const scoreBoard = await getScoreBoard();
        return ctx.json(scoreBoard);
    })
    .post('/setPoints/:name', zValidator('param', z.object({
        name: z.string()
    })), async (ctx) => {
        const { name } = ctx.req.valid('param');
        const points = await countPoints(name);
        const result = await insertInMongo(name, points);
        return ctx.json({name: result.name, points: result.points});
    });

export default points
