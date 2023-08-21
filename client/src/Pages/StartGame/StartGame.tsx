import { useNavigate } from "react-router-dom";
import cl from "./StarGame.module.scss";
import React from "react";

export default function StartGame() {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent): void => {
    const target = e.target as HTMLButtonElement;
    target.id === "playRobotCity"
      ? navigate("/game/robot-city")
      : navigate("/game/universe113");
  };

  return (
    <div className={cl.startGame}>
      <div className={cl.canvasCard}>
        <div className={cl.canvasName}>Robot City</div>
        <img className={cl.image} src="/canvases/robot-city.jpg" alt="" />
        <button
          type="button"
          id="playRobotCity"
          onClick={(e) => handleClick(e)}
        >
          Play
        </button>
      </div>
      <div className={cl.canvasCard}>
        <div className={cl.canvasName}>Universe 113</div>
        <img className={cl.image} src="/canvases/universe113.jpg" alt="" />
        <button
          type="button"
          id="playUniverse113"
          onClick={(e) => handleClick(e)}
        >
          Play
        </button>
      </div>
    </div>
  );
}
