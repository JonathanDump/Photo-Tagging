import React from "react";

export interface Character {
  id: string;
  img: string;
  name: string;
  isFounded: boolean;
}

export interface CharactersContextInterface {
  characters: Character[] | [];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>> | null;
}

export interface CharacterCardProps
  extends Omit<Character, "id" | "isFounded"> {
  handleClick?: (e: React.MouseEvent, name: string) => Promise<void>;
  isFounded?: boolean;
}

export interface CanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  handleClick: (e: React.MouseEvent) => void;
  name: string;
}
