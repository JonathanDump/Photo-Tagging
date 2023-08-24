import { LeaderProps } from "../../interfaces/interfaces";
import cl from "./Leader.module.scss";

export default function Leader({ leader }: LeaderProps) {
  return (
    <div className={cl.leader}>
      <div className={cl.leaderCol}>
        {leader.name === "" ? "Anonymous" : leader.name}
      </div>
      <div className={cl.leaderCol}>
        {leader.time[0]}m:{leader.time[1]}s
      </div>
    </div>
  );
}
