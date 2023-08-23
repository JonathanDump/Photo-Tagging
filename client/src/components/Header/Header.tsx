import { NavLink, useLocation } from "react-router-dom";
import cl from "./Header.module.scss";
import { useContext, useEffect } from "react";
import { CharactersContext } from "../../App";
import { Character } from "../../interfaces/interfaces";
import CharacterCard from "../CharacterCard/CharacterCard";
import { useStopwatch } from "react-timer-hook";

export default function Header() {
  const location = useLocation().pathname;
  const {
    characters,
    setIsGameOver,
    stopwatchRef,
    isGameOver,
    resetRef,
    startRef,
  } = useContext(CharactersContext);
  const { minutes, seconds, pause, start, reset } = useStopwatch({
    autoStart: false,
  });

  console.log("gameOver", isGameOver);
  resetRef!.current = reset;
  startRef!.current = start;

  useEffect(() => {
    stopwatchRef!.current = [minutes, seconds];
  }, [seconds]);

  useEffect(() => {
    if (location.includes("/robotCity") || location.includes("/universe11")) {
      start();
    }
  }, []);

  useEffect(() => {
    const arr = characters.filter((character) => !character.isFound);
    console.log("arr", arr);

    if (arr.length === 0) {
      setIsGameOver!(true);
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
