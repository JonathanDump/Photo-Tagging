import { useLocation } from "react-router-dom";
import cl from "./Game.module.scss";
import React, { useContext, useRef, useState } from "react";
import { CharactersContext } from "../../App";
import { Character } from "../../interfaces/interfaces";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

export default function Game() {
  const location = useLocation().pathname;
  const pointerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { characters, setCharacters } = useContext(CharactersContext);
  const [isVisible, setIsVisible] = useState(false);
  console.log("char", characters);

  console.log(location);

  const handleClick = (e: React.MouseEvent): void => {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();

    console.log(rect);

    const rectEndX = rect.width;
    const rectEndY = rect.height;

    let x = e.pageX;
    let y = e.pageY;

    if (x + 200 > rectEndX && y + 200 > rectEndY) {
      x = e.pageX - 135 - 40 - 40;
      y = e.pageY - (y + 150 - rectEndY);
    } else if (x + 200 > rectEndX) {
      x = e.pageX - 135 - 40 - 40;
    } else if (y + 200 > rectEndY) {
      y = e.pageY - (y + 150 - rectEndY);
    }
    console.log(x, y);
    console.log(pointerRef.current);

    pointerRef.current!.style.left = `${e.pageX.toString()}px`;
    pointerRef.current!.style.top = `${e.pageY.toString()}px`;
    pointerRef.current!.classList.toggle(cl.visible);

    listRef.current!.style.left = `${x.toString()}px`;
    listRef.current!.style.top = `${y.toString()}px`;
    listRef.current!.classList.toggle(cl.visible);

    setIsVisible(!isVisible);
    // listRef.current!.style.visibility = "visible";
  };

  return (
    <div className={cl.game}>
      {location.includes("/robot-city") ? (
        <div
          className={cl.canvas}
          ref={canvasRef}
          onClick={(e) => handleClick(e)}
        >
          <img src="/canvases/robot-city.jpg" alt="" />
        </div>
      ) : (
        <div
          className={cl.canvas}
          ref={canvasRef}
          onClick={(e) => handleClick(e)}
        >
          <img src="/canvases/universe113.jpg" alt="" />
        </div>
      )}

      <div className={cl.pointer} ref={pointerRef}></div>
      <div className={cl.list} ref={listRef}>
        {characters.map((character: Character) => {
          return (
            <CharacterCard
              key={character.id}
              img={character.img}
              name={character.name}
            />
          );
        })}
      </div>
    </div>
  );
}
