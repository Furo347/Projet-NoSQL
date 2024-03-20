import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {setResponseInRedis} from "../util/redis.ts";
import {Themes, ThemesValue} from "../util/rapidapi.ts";
import { zodEnumFromObjValues } from "../util/zod.ts";

async function getTheme(word: string) {
    const verifiedWord = encodeURIComponent(word.toLowerCase());
    const url = `https://twinword-word-graph-dictionary.p.rapidapi.com/theme/?entry=${verifiedWord}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error(`Failed to fetch data from Twinword API. Status: ${response.status}`);
            throw new Error('Failed to fetch data from Twinword API');
        }
        const result = await response.json();
        return result.theme as Array<string>;
    } catch (error) {
        console.error('Error fetching data from Twinword API:', error);
        throw error;
    }
}


async function checkWord(word: string, desiredTheme: ThemesValue, currentLetter: string) {
    let check = false;
    if (word[0].toUpperCase() === currentLetter) {
        const theme = await getTheme(word)
        console.log(theme);
        if (Array.isArray(theme))
        {
            const desiredWords = desiredTheme.split(' ');
            for (const desiredWord of desiredWords) {
                if (theme.includes(desiredWord)) {
                    check=true;
                }
            }
        }
    }
    return check
}

const checkWords = new Hono()
    .post('/checkWord', zValidator('json', z.object({
        name: z.string(),
        word: z.string(),
        desiredTheme: zodEnumFromObjValues(Themes),
        currentLetter: z.string()
    })), async (ctx) => {
        const { name, word, desiredTheme, currentLetter } = ctx.req.valid('json');
        const result = await checkWord(word, desiredTheme, currentLetter);
        console.log(result);
        setResponseInRedis(name, result);
        return ctx.json(result);
    });

export default checkWords;
