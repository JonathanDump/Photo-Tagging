import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard/GameCard";
import cl from "./Leaderboard.module.scss";
import Leader from "../../components/Leader/Leader";
import { LeaderInterface } from "../../interfaces/interfaces";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderInterface[]>([
    { name: "", time: [0], _id: "" },
  ]);
  const [isActive, setIsActive] = useState({
    robotCity: false,
    universe113: false,
  });

  const handleClickLeaderboard = async (
    canvasName?: "robotCity" | "universe113"
  ) => {
    const clone = { ...isActive };
    Object.keys(clone).forEach((key) => {
      if (key === canvasName) {
        clone[key] = true;
      } else {
        clone[key as keyof typeof clone] = false;
      }
    });

    setIsActive(clone);
    console.log("isActive", isActive);

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
          }
        }
      }
    );
    console.log("sorted", leadersSorted);

    setLeaders(leadersSorted);
  };

  useEffect(() => {
    handleClickLeaderboard("robotCity");
  }, []);

  return (
    <div className={cl.leaderboard}>
      <GameCard
        canvasName="robotCity"
        showButton={false}
        handleClickLeaderboard={handleClickLeaderboard}
        isActive={isActive.robotCity}
      />
      <GameCard
        canvasName="universe113"
        showButton={false}
        handleClickLeaderboard={handleClickLeaderboard}
        isActive={isActive.universe113}
      />

      <div className={cl.table}>
        <div className={cl.title}>Leaderboard</div>
        {leaders.map((leader) => {
          return <Leader key={leader._id} leader={leader} />;
        })}
      </div>
    </div>
  );
}
