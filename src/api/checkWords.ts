import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
export enum Themes {
    Vetement = 'clothes',
    Metier = 'job',
    Animal = 'species',
    Nourriture = 'food'
}
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function randomLetter() {
    const ranNumber = getRandomInt(25);
    const letter = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const randomLowerCaseLetter = letter[ranNumber];
    return randomLowerCaseLetter.toUpperCase();
}
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


export async function checkWord(word: string, desiredTheme: Themes, currentLetter: string) {
    let check = false;
    if (word[0].toUpperCase() === currentLetter) {
        const theme = await getTheme(word) as Array<string>;
        console.log(theme);
        if (Array.isArray(theme))
        {
            check = theme.includes(desiredTheme);
        }
    }
    return check
}

const checkWords = new Hono()
    .post('/checkWord', zValidator('json', z.object({
        word: z.string(),
        desiredTheme: z.nativeEnum(Themes),
        currentLetter: z.string()
    })), async (ctx) => {
        const { word, desiredTheme, currentLetter } = ctx.req.valid('json');
        const result = await checkWord(word, desiredTheme as Themes, currentLetter);
        return ctx.json(result);
    });

export default checkWords
