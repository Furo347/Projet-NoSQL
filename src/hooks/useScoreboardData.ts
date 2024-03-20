import { useEffect, useState } from "react";
import { apiClient } from "../client";

export type Scores = Parameters<typeof apiClient.points.$post>[0]['json'];

async function getScoreFromRegis() {
  const res = await apiClient.count.$get()

  return res.json()
}
async function postScores(scores: Scores) {
  const res = await apiClient.points.$post({json: scores})

  return res.json()
}

export function useScoreboardData(name: string | null) {
  const [scores, setScores] = useState<Scores[]>([])

  useEffect(() => {
    if (!name) {
      return
    }

    getScoreFromRegis().then((response) => {
      if (!response) {
        return;
      }

      const points = response.count

      postScores({name: name, points: points}).then((postResponse) => {
        if (!postResponse) {
          return;
        }

        apiClient.scoreboard.$get()
          .then((res) => res.json())
          .then((res) => {
            const sortedData = res.sort((a, b) => b.points - a.points);
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