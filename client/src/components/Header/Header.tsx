import { NavLink, useLocation } from "react-router-dom";
import cl from "./Header.module.scss";
import btn from "../../scss/button.module.scss";
import { useContext, useEffect } from "react";
import { CharactersContext } from "../../App";
import { Character } from "../../interfaces/interfaces";
import CharacterCard from "../CharacterCard/CharacterCard";
import { useStopwatch } from "react-timer-hook";

export default function Header() {
  const location = useLocation().pathname;
  const { characters, setIsGameOver, stopwatchRef, resetRef, startRef } =
    useContext(CharactersContext);
  const { minutes, seconds, pause, start, reset } = useStopwatch({
    autoStart: false,
  });

  resetRef!.current = reset;
  startRef!.current = start;

  useEffect(() => {
    stopwatchRef!.current = [minutes, seconds];
  }, [seconds]);

  useEffect(() => {
    if (location.includes("/robotCity") || location.includes("/universe11")) {
      start();
    } else {
      reset(undefined, false);
    }
  }, [location]);

  useEffect(() => {
    const arr = characters.filter((character) => !character.isFound);

    if (arr.length === 0) {
      setIsGameOver!(true);
      pause();

      document.body.style.overflow = "hidden";
    }
  }, [characters]);

  return (
    <div className={cl.header}>
      <NavLink to={"/"} className={cl.logo}>
        Where is everyone?
      </NavLink>
      {location === "/" || location === "/leaderboard" ? (
        <div className={btn.wrapper}>
          <NavLink className={btn.button} to={"/leaderboard"}>
            Leaderboard
          </NavLink>
        </div>
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
