import cl from "./StarGame.module.scss";
import GameCard from "../../components/GameCard/GameCard";

export default function StartGame() {
  return (
    <div className={cl.startGame}>
      <GameCard canvasName="robotCity" showButton={true} />
      <GameCard canvasName="universe113" showButton={true} />
    </div>
  );
}
