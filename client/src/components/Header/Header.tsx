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
      coords: [
        [1345, 2282],
        [1345 + 60, 2282 + 80],
      ],
      isFounded: false,
    },
    {
      id: crypto.randomUUID(),
      img: "/characters/robot-city/Mike-Wasowski.png",
      name: "Mike Wasowski",
      coords: [
        [1222, 1729],
        [1222 + 80, 1729 + 65],
      ],
      isFounded: false,
    },
    {
      id: crypto.randomUUID(),
      img: "/characters/robot-city/Obelix.png",
      name: "Obelix",
      coords: [
        [596, 1254],
        [596 + 80, 1254 + 60],
      ],
      isFounded: false,
    },
  ],
  universe113: [
    {
      id: crypto.randomUUID(),
      img: "/characters/universe113/Finn-and-Jake.png",
      name: "Finn and Jake",
      coords: [
        [229, 1438],
        [229 + 60, 1438 + 80],
      ],
      isFounded: false,
    },
    {
      id: crypto.randomUUID(),
      img: "/characters/universe113/Tom-and-Jerry.png",
      name: "Tom and Jerry",
      coords: [
        [1057, 1873],
        [1057 + 60, 1873 + 80],
      ],
      isFounded: false,
    },
    {
      id: crypto.randomUUID(),
      img: "/characters/universe113/R2D2.png",
      name: "R2D2",
      coords: [
        [1412, 2193],
        [1412 + 60, 2193 + 80],
      ],
      isFounded: false,
    },
  ],
};

export default function Header() {
  const location = useLocation().pathname;
  const { characters, setCharacters } =
    useContext<CharactersContextInterface>(CharactersContext);
  // const { hours, minutes, seconds, pause } = useStopwatch({ autoStart: true });

  // console.log(JSON.stringify(charactersList));

  location.includes("/robot-city")
    ? setCharacters!(charactersList.robotCity)
    : location.includes("/universe113")
    ? setCharacters!(charactersList.universe113)
    : [];

  console.log(characters);
  console.log("charactersString", JSON.stringify(characters));

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
                isFounded={character.isFounded}
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
