import { NavLink, useLocation } from "react-router-dom";
import cl from "./Header.module.scss";
import React, { useContext } from "react";
import { CharactersContext } from "../../App";
import {
  Character,
  CharactersContextInterface,
} from "../../interfaces/interfaces";
import CharacterCard from "../CharacterCard/CharacterCard";
import { useStopwatch } from "react-timer-hook";

const charactersList = {
  robotCity: [
    {
      id: crypto.randomUUID(),
      img: "/characters/robot-city/Giga-Squidward.png",
      name: "Giga Squidward",
    },
    {
      id: crypto.randomUUID(),
      img: "/characters/robot-city/Mike-Wasowski.png",
      name: "Mike Wasowski",
    },
    {
      id: crypto.randomUUID(),
      img: "/characters/robot-city/Obelix.png",
      name: "Obelix",
    },
  ],
  universe113: [
    {
      id: crypto.randomUUID(),
      img: "/characters/universe113/Finn-and-Jake.png",
      name: "Finn and Jake",
    },
    {
      id: crypto.randomUUID(),
      img: "/characters/universe113/Tom-and-Jerry.png",
      name: "Tom and Jerry",
    },
    {
      id: crypto.randomUUID(),
      img: "/characters/universe113/R2D2.png",
      name: "R2D2",
    },
  ],
};

export default function Header() {
  const location = useLocation().pathname;
  const { characters, setCharacters } = useContext(CharactersContext);
  // const { hours, minutes, seconds, pause } = useStopwatch({ autoStart: true });
  console.log(location.includes("/robot-city"));

  location.includes("/robot-city")
    ? setCharacters(charactersList.robotCity)
    : setCharacters(charactersList.universe113);

  console.log(characters);

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
              />
            ))}
          </div>
          <div className={cl.stopwatch}>
            {/* {hours}:{minutes}:{seconds} */}
          </div>
        </div>
      )}
    </div>
  );
}
