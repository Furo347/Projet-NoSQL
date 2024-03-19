import axios from "axios";
import { useEffect, useState } from "react";

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

export function useScoreboardData(name: string | null) {
  const [scores, setScores] = useState([])

  useEffect(() => {
    if (!name) {
      return
    }

    getScoreFromRegis().then((response) => {
      if (!response) {
        return;
      }

      const points = response.data.count as number

      postScores({name: name, points: points}).then((postResponse) => {
        if (!postResponse) {
          return;
        }

        axios.get('/api/scoreboard').then((response) => {
          const sortedData = response.data.sort((a: scoreboardData, b: scoreboardData) => b.points - a.points);
          const top10 = sortedData.slice(0, 10);
          setScores(top10);
        }).catch((error) => {
          console.error('Error fetching scoreboard data:', error);
          return;
        })
      })
    })
  }, [name])

  return scores
}