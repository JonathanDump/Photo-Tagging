import { useContext, useEffect } from "react";
import { CharactersContext } from "../../App";
import { CanvasProps } from "../../interfaces/interfaces";
import cl from "./Canvas.module.scss";
import { charactersList } from "../../misc/charactersList";

export default function Canvas({
  canvasRef,
  handleClick,
  canvasName,
}: CanvasProps) {
  const { characters, setCharacters } = useContext(CharactersContext);

  useEffect(() => {
    const chars = JSON.parse(JSON.stringify(charactersList[canvasName]));
    setCharacters!(chars);
  }, []);

  return (
    <div className={cl.canvas} ref={canvasRef} onClick={(e) => handleClick(e)}>
      <img src={`/canvases/${canvasName}.jpg`} alt="" />
    </div>
  );
}
