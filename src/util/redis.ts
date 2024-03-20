import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

async function connectToRedis() {
    await client.connect();
}

connectToRedis();

export async function setResponseInRedis(name: string, value: boolean[]) {
    const key = `response_${name}`
    const ret = await client.setEx(key, 24*60*60, value.map((v) => v ? 'true' : 'false').join(''));

    return ret
}

export async function getResponseFromRedis(name: string){
    const r = await client.get(`response_${name}`);
    await client.del(`response_${name}`);
    return r;
}
