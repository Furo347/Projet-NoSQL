import { useEffect, useState } from "react";
import { apiClient } from "../client";

export type ScoresDto = Parameters<typeof apiClient.setPoints[":name"]["$post"]>[0]["param"];
export type ScoresReturn = Awaited<ReturnType<Awaited<ReturnType<typeof apiClient.setPoints[":name"]["$post"]>>['json']>>;

export function useScoreboardData() {
  const [scores, setScores] = useState<ScoresReturn[]>([])

  useEffect(() => {
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
  }, [])

  return scores
}