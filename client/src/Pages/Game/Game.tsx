import { useLocation } from "react-router-dom";
import cl from "./Game.module.scss";
import React from "react";

export default function Game() {
  const location = useLocation().pathname;
  console.log(location);

  return (
    <div className={cl.game}>
      {location.includes("/robot-city") ? (
        <div className={cl.canvas}>
          <img src="/canvases/robot-city.jpg" alt="" />
        </div>
      ) : (
        <div className={cl.canvas}>
          <img src="/canvases/universe113.jpg" alt="" />
        </div>
      )}
    </div>
  );
}
