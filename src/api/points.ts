import { Hono } from 'hono';
import { getResponseFromRedis } from '../util/redis.ts';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getScoreBoard, insertInMongo } from '../util/mongo.ts';

async function countPoints() {
    let points = 0;
    const response = await getResponseFromRedis();
    if (response !== null) {
        points = (response.match(/true/g) || []).length;
    }
    return points * 10;
}

const points = new Hono()
    .get('/count', async (ctx) => {
        const pointsCount = await countPoints();
        return ctx.json({ count: pointsCount });
    }).get('/scoreboard', async (ctx) => {
        const scoreBoard = await getScoreBoard();
        return ctx.json(scoreBoard);
    }).post('/points', zValidator('json', z.object({
        name: z.string(),
        points: z.number()
    })), async (ctx) => {
        const { name, points } = ctx.req.valid('json');
        const result = await insertInMongo(name, points);
        return ctx.json(result);
    });

export default points
