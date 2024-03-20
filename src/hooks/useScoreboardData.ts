import { useEffect, useState } from "react";
import { apiClient } from "../client";

export type ScoresDto = Parameters<typeof apiClient.setPoints[":name"]["$post"]>[0]["param"];
export type ScoresReturn = Awaited<ReturnType<Awaited<ReturnType<typeof apiClient.setPoints[":name"]["$post"]>>['json']>>;

async function postScores({name}: ScoresDto) {
  const res = await apiClient.setPoints[":name"].$post({param: {name}})

  return res.json()
}

export function useScoreboardData(name: string | null) {
  const [scores, setScores] = useState<ScoresReturn[]>([])

  useEffect(() => {
    if (!name) {
      return
    }

    postScores({name})
      .then(() => {
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
      .catch((error) => {
        console.error('Error updating scores:', error);
        return;
      })
  }, [name])

  return scores
}