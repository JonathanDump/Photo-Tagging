import { NavLink, useLocation } from "react-router-dom";
import cl from "./Header.module.scss";
import React, { useContext } from "react";
import { CharactersContext } from "../../App";
import {
  Character,
  CharactersContextInterface,
} from "../../interfaces/interfaces";
import CharacterCard from "../CharacterCard/CharacterCard";

const charactersList = {
  robotCity: [
    {
      img: "/characters/robot-city/Giga-Squidward.png",
      name: "Giga Squidward",
    },
    {
      img: "/characters/robot-city/Mike-Wasowski.png",
      name: "Mike-Wasowski",
    },
    {
      img: "/characters/robot-city/Obelix.png",
      name: "Obelix",
    },
  ],
  universe113: [
    {
      img: "/characters/universe113/Finn-and-Jake.png",
      name: "Finn and Jake",
    },
    {
      img: "/characters/universe113/Tom-and-Jerry.png",
      name: "Tom and Jerry",
    },
    {
      img: "/characters/universe113/R2D2.png",
      name: "R2D2",
    },
  ],
};

export default function Header() {
  const location = useLocation().pathname;

  const { characters, setCharacters } = useContext(CharactersContext);

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
            {characters.map((character) => (
              <CharacterCard img={character.img} name={character.name} />
            ))}
          </div>
          <div className={cl.timer}></div>
        </div>
      )}
    </div>
  );
}
