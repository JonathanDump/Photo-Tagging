import { NavLink, useLocation } from "react-router-dom";
import cl from "./Header.module.scss";
import React, { useContext, useEffect } from "react";
import { CharactersContext } from "../../App";
import {
  Character,
  CharactersContextInterface,
} from "../../interfaces/interfaces";
import CharacterCard from "../CharacterCard/CharacterCard";
import { useStopwatch } from "react-timer-hook";
import { charactersList } from "../../misc/charactersList";

export default function Header() {
  const location = useLocation().pathname;
  const { characters, setCharacters } =
    useContext<CharactersContextInterface>(CharactersContext);
  const { minutes, seconds, pause } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    location.includes("/robot-city")
      ? setCharacters!(charactersList.robotCity)
      : location.includes("/universe113")
      ? setCharacters!(charactersList.universe113)
      : [];
  }, []);

  useEffect(() => {
    const arr = characters.filter((character) => !character.isFound);
    console.log("arr", arr);

    if (arr.length === 0) {
      pause();
      console.log("seconds", seconds);
    }
  }, [characters]);

  return (
    <div className={cl.header}>
      <div className={cl.logo}>Where is everyone?</div>
      {location === "/" ? (
        <NavLink to={"/leaderboard"}>Leaderboard</NavLink>
      ) : (
        <div className={cl.itemsWrapper}>
          <div className={cl.charactersContainer}>
            {characters.map((character: Character) => (
              <CharacterCard
                key={character.id}
                img={character.img}
                name={character.name}
                isFound={character.isFound}
              />
            ))}
          </div>
          <div className={cl.stopwatch}>
            {minutes}m:{seconds}s
          </div>
        </div>
      )}
    </div>
  );
}
