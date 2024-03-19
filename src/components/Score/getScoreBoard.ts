import axios from 'axios';
export type scoreboardData = { name: string; points: number; };
async function getScoreFromRegis() {
    try {
        const response = await axios.get('/api/count');
        return response;
    } catch (error) {
        console.error('Error Checking word:', error);
        return null;
    }
}
async function postScores(scores: scoreboardData) {
    try {
        console.log(scores)
        const response = await axios.post('/api/points', scores);
        return response.data;
    } catch (error) {
        console.error('Error posting scores:', error);
        return null;
    }
}

export async function fetchScoreboardData(name: string) {
    const response = await getScoreFromRegis();
    if (response) {
        const points = response.data.count as number;
        await postScores({name: name, points: points});
        try {
            const response = await axios.get('/api/scoreboard');
            const sortedData = response.data.sort((a: scoreboardData, b: scoreboardData) => b.points - a.points);
            const top10 = sortedData.slice(0, 10);
            return top10;
        } catch (error) {
            console.error('Error fetching scoreboard data:', error);
            return null;
        }
    }
}
