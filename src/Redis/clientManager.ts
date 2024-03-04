import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

async function connectToRedis() {
    await client.connect();
}

connectToRedis();

export async function setResponseInRedis(value: boolean) {
    await client.set('response', value ? 'true' : 'false'); // Corrected interpolation syntax
}
