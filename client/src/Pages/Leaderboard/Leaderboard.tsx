import { useState } from "react";
import GameCard from "../../components/GameCard/GameCard";
import cl from "./Leaderboard.module.scss";
import Leader from "../../components/Leader/Leader";
import { LeaderInterface } from "../../interfaces/interfaces";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderInterface[]>([
    { name: "", time: [0] },
  ]);

  const handleClickLeaderboard = async (canvasName: string) => {
    const URL = import.meta.env.VITE_API_ENDPOINT;
    console.log(URL);

    const body = { canvas: canvasName };

    const response = await fetch(`${URL}/leaderboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Couldn't find leaders");
    }
    const result = await response.json();
    console.log("result", result.leaders);

    const leadersSorted = result.leaders.sort(
      (l1: LeaderInterface, l2: LeaderInterface) => {
        if (+l1.time[0] - +l2.time[0]) {
          if (+l1.time[1] - +l2.time[1]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return 1;
        }
      }
    );
    console.log("sorted", leadersSorted);

    setLeaders(leadersSorted);
  };

  return (
    <div className={cl.leaderboard}>
      <GameCard
        canvasName="robotCity"
        showButton={false}
        handleClickLeaderboard={handleClickLeaderboard}
      />
      <GameCard
        canvasName="universe113"
        showButton={false}
        handleClickLeaderboard={handleClickLeaderboard}
      />

      <div className={cl.table}>
        {leaders.map((leader) => {
          return <Leader key={leader._id} leader={leader} />;
        })}
      </div>
    </div>
  );
}
