export enum Themes {
    Vetement = 'clothing',
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
    console.log(randomLowerCaseLetter);
    return randomLowerCaseLetter.toUpperCase();
}

const ranNumber = getRandomInt(25);
const letter = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const CURRENT_LETTER = letter[ranNumber];
export async function getTheme(word: string) {
    const url = `https://twinword-twinword-bundle-v1.p.rapidapi.com/word_theme/?entry=${word}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e2f247331msh559ed4f7dffd67bp16f012jsn34ba1fc1377e',
            'X-RapidAPI-Host': 'twinword-twinword-bundle-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data from Twinword API');
        }
        const result = await response.json();
        console.log(result)
        return result.theme as Array<string>;
    } catch (error) {
        return error;
    }
}
const theme= getTheme("avion");
console.log(theme)
export async function checkWord(word: string, desiredTheme: Themes) {
    let check = false;
    if (word[0] === CURRENT_LETTER) {
        const theme = await getTheme(word) as Array<string>;
        check = theme.includes(desiredTheme);
    }
    console.log(check)
    return check
}
