import axios from 'axios';
import {ThemesKey} from "../util/rapidapi.ts";

export type checkWordData = {word: string, desiredTheme: ThemesKey, currentLetter: string; };
export async function verifyWord(word: string, desiredTheme: ThemesKey, currentLetter: string) {
    try {
        console.log(currentLetter)
        const checkWordData = {word: word, desiredTheme: desiredTheme, currentLetter: currentLetter}
        const response = await axios.post('/api/checkWord', checkWordData);
        return response;
    } catch (error) {
        console.error('Error Checking word:', error);
        return null;
    }
}
