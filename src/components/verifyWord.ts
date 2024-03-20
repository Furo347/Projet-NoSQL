import { apiClient } from "../client.tsx";
import {ThemesValue} from "../util/rapidapi.ts";

export async function verifyWord(name: string, word: string, desiredTheme: ThemesValue, currentLetter: string) {
    const checkWordData = {name, word, desiredTheme, currentLetter}
    const response = await apiClient.checkWord.$post({json: checkWordData})

    return response.json()
}
