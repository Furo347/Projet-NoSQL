import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {setResponseInRedis} from "../util/redis.ts";
import {ThemeValueList} from "../util/rapidapi.ts";

async function getTheme(word: string) {
    const verifiedWord = encodeURIComponent(word.toLowerCase());
    const url = `https://twinword-word-graph-dictionary.p.rapidapi.com/theme/?entry=${verifiedWord}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
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


async function checkLine(words: string[], currentLetter: string) {
    const ret: boolean[] = []
    for (const [i, theme] of ThemeValueList.entries()) {
        const word = words[i]

        if (!word || word[0].toUpperCase() !== currentLetter) {
            ret.push(false)
            continue
        }

        const wordTheme = await getTheme(word)

        if (Array.isArray(wordTheme)) {
            const possibleThemes = theme.split(' ')

            const isValid = possibleThemes.map((v) => wordTheme.includes(v)).includes(true)

            ret.push(isValid)
        } else {
            ret.push(false)
        }
    }

    return ret
}

const check = new Hono()
    .post('/checkGame', zValidator('json', z.object({
        game: z.object({
            letter: z.string(),
            wordList: z.string().array()
        }).array(),
        name: z.string(),
    })), async (ctx) => {
        const { game, name } = ctx.req.valid('json');
        const results = await Promise.all(game.map(({letter, wordList}) => checkLine(wordList, letter)))
        
        setResponseInRedis(name, results.flat());
        return ctx.json(game.map((v, i) => ({...v, check: results[i]})));
    });

export default check;
