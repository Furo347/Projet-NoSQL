export enum Themes {
    Vetement = 'clothing',
    Metier = 'job',
    Animal = 'species',
    Nourriture = 'food'
}
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const ranNumber = getRandomInt(25);
const letter = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
export const CURRENT_LETTER = letter[ranNumber];
async function getTheme(word: string) {
    const url = `https://twinword-twinword-bundle-v1.p.rapidapi.com/theme/?entry=${word}`;
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
            return Error('Failed to fetch data from Twinword API');
        }
        const result = await response.json();
        return result.theme as Array<string>;
    } catch (error) {
        return error;
    }
}

export async function checkWord(word: string, desiredTheme: Themes) {
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
