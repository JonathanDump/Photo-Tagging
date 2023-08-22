import React from "react";

export interface Character {
  id?: string;
  img: string;
  name: string;
}

export interface CharactersContextInterface {
  characters: Character[] | [];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>> | null;
}

export interface CharacterCardProps {
  children: HTMLDivElement;
  name: string;
}
