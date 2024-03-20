import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

async function connectToRedis() {
    await client.connect();
}

connectToRedis();

export async function setResponseInRedis(name: string, value: boolean) {
    return client.append(`response_${name}`, value ? 'true' : 'false');
}

export async function getResponseFromRedis(name: string){
    const r = await client.get(`response_${name}`);
    await client.del(`response_${name}`);
    return r;
}
