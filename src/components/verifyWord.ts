import { apiClient } from "../client.tsx";
import {ThemesValue} from "../util/rapidapi.ts";

export async function verifyWord(word: string, desiredTheme: ThemesValue, currentLetter: string) {
    const checkWordData = {word, desiredTheme, currentLetter}
    const response = await apiClient.checkWord.$post({json: checkWordData})

    return response.json()
}
