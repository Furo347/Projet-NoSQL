import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { Themes } from "../types/rapidapi";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const ranNumber = getRandomInt(25);
const letter = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const CURRENT_LETTER = letter[ranNumber];
async function getTheme(word: string) {
    const url = `https://twinword-twinword-bundle-v1.p.rapidapi.com/theme/?entry=${word}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.CLIENT_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            return Error('Failed to fetch data from Twinword API');
        }
        const result = await response.json();
        return result.theme as Array<string>;
    } catch (error) {
        return error;
    }
}

async function checkWord(word: string, desiredTheme: Themes) {
    let check = false;
    if (word[0] === CURRENT_LETTER) {
        const theme = await getTheme(word) as Array<string>;
        if (Array.isArray(theme))
        {
            check = theme.includes(desiredTheme);
        }
    }
    return check
}

const word = new Hono()
    .post('/checkWord', zValidator('json', z.object({
        word: z.string(),
        theme: z.nativeEnum(Themes)
    })), async (ctx) => {
        const { word, theme } = ctx.req.valid('json');
        const result = await checkWord(word, theme as Themes);
        return ctx.json(result);
    });

export default word
