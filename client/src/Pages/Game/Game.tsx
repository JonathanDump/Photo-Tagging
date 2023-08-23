import { useLocation } from "react-router-dom";
import cl from "./Game.module.scss";
import React, { useContext, useRef, useState } from "react";
import { CharactersContext } from "../../App";
import { Character } from "../../interfaces/interfaces";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Canvas from "../../components/Canvas/Canvas";

export default function Game() {
  const location = useLocation().pathname;
  const canvasName = location.split("/")[2];

  const pointerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const coords = useRef<number[]>([]);

  const { characters, setCharacters } = useContext(CharactersContext);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (e: React.MouseEvent): void => {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();

    console.log(rect);

    const rectEndX = rect.width;
    const rectEndY = rect.height;

    let x = e.pageX;
    let y = e.pageY;
    coords.current = [x, y];

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
  };

  const handleChoose = async (name: string): Promise<void> => {
    const URL = import.meta.env.VITE_API_ENDPOINT;
    console.log("URL", URL);

    const body = { name: name, coords: [coords.current[0], coords.current[1]] };

    console.log("body", body);

    const response = await fetch(`${URL}/compare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log("result", result);

    if (result.correct) {
      const newCharacters = characters.map((char) => {
        if (char.name === name) {
          char.isFound = true;
          return char;
        }
        return char;
      });

      setCharacters!(newCharacters);
    }
    console.log("isVisible", isVisible);

    pointerRef.current!.classList.toggle(cl.visible);
    listRef.current!.classList.toggle(cl.visible);
    setIsVisible(!isVisible);
  };

  return (
    <div className={cl.game}>
      <Canvas
        canvasRef={canvasRef}
        handleClick={handleClick}
        name={canvasName}
      />

      <div className={cl.pointer} ref={pointerRef}></div>
      <div className={cl.list} ref={listRef}>
        {characters.map((character: Character) => {
          if (!character.isFound) {
            return (
              <CharacterCard
                key={character.id}
                img={character.img}
                name={character.name}
                handleClick={handleChoose}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
