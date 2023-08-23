import React from "react";

export interface Character {
  id: string;
  img: string;
  name: string;
  isFound: boolean;
}

export interface CharactersContextInterface {
  characters: Character[] | [];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>> | null;
}

export interface CharacterCardProps extends Omit<Character, "id" | "isFound"> {
  handleClick?: (e: React.MouseEvent, name: string) => Promise<void>;
  isFound?: boolean;
}

export interface CanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  handleClick: (e: React.MouseEvent) => void;
  name: string;
}
