import { useContext } from "react";
import cl from "./GameCard.module.scss";
import { GameCardProps } from "../../interfaces/interfaces";

import { useNavigate } from "react-router-dom";
import { CharactersContext } from "../../App";

export default function GameCard({
  canvasName,
  showButton,
  handleClickLeaderboard,
}: GameCardProps) {
  const navigate = useNavigate();
  const { startRef } = useContext(CharactersContext);
  const handleClick = (): void => {
    startRef?.current();
    navigate(`/game/${canvasName}`);
  };

  return (
    <div
      className={cl.canvasCard}
      onClick={() => handleClickLeaderboard!(canvasName)}
    >
      <div className={cl.canvasName}>Robot City</div>
      <img className={cl.image} src={`/canvases/${canvasName}.jpg`} alt="" />
      {showButton && (
        <button type="button" id="playRobotCity" onClick={handleClick}>
          Play
        </button>
      )}
    </div>
  );
}
