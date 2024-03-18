import { setResponseInRedis } from '../Redis/clientManager.ts';
import { getResponseFromRedis } from '../Redis/clientManager.ts';

export async function countPoints() {
    let points = 0;
    for (let i = 0; i < 4; i++) {
        await setResponseInRedis(true);
    }

    const response = await getResponseFromRedis();
    if (response !== null) {
        points = (response.match(/true/g) || []).length;
    }

    return points * 10;
}
