import { useContext } from "react";
import cl from "./GameCard.module.scss";
import { GameCardProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { CharactersContext } from "../../App";
import btn from "../../scss/button.module.scss";

export default function GameCard({
  canvasName,
  showButton,
  isActive,
  handleClickLeaderboard,
}: GameCardProps) {
  const navigate = useNavigate();
  const { startRef } = useContext(CharactersContext);
  const handleClick = (): void => {
    startRef?.current();
    navigate(`/game/${canvasName}`);
  };

  const styles = !showButton ? { cursor: "pointer" } : {};
  console.log(styles);

  return (
    <div
      className={isActive ? `${cl.canvasCard} ${cl.active}` : cl.canvasCard}
      onClick={() => handleClickLeaderboard!(canvasName)}
      style={styles}
    >
      <img className={cl.image} src={`/canvases/${canvasName}.jpg`} alt="" />
      <div className={cl.canvasName}>
        {canvasName === "robotCity" ? "Robot City" : "Universe113"}
      </div>
      {showButton && (
        <div className={btn.wrapper}>
          <button
            className={btn.button}
            type="button"
            id="playRobotCity"
            onClick={handleClick}
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
}
