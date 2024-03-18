import { createClient } from 'redis';

const client = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on('error', err => console.log('Redis Client Error', err));

async function connectToRedis() {
    await client.connect();
}

connectToRedis();

export async function setResponseInRedis(value: boolean) {
    return await client.append('response', value ? 'true' : 'false');
}

export async function getResponseFromRedis(){
    const r = await  client.get('response');
    await client.del('response');
    return r;
}
