import React from "react";
import { CanvasProps } from "../../interfaces/interfaces";
import cl from "./Canvas.module.scss";

export default function Canvas({ canvasRef, handleClick, name }: CanvasProps) {
  return (
    <div className={cl.canvas} ref={canvasRef} onClick={(e) => handleClick(e)}>
      <img src={`/canvases/${name}.jpg`} alt="" />
    </div>
  );
}
