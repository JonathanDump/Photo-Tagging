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
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>> | null;
  stopwatchRef: React.MutableRefObject<number[]> | null;
  resetRef: React.MutableRefObject<
    | ((
        offsetTimestamp?: Date | undefined,
        autoStart?: boolean | undefined
      ) => void)
    | null
  > | null;
  startRef: React.MutableRefObject<() => void> | null;
}

export interface CharacterCardProps extends Omit<Character, "id" | "isFound"> {
  handleClick?: (name: string) => Promise<void>;
  isFound?: boolean;
}

export interface CanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  handleClick: (e: React.MouseEvent) => void;
  canvasName: "robotCity" | "universe113";
}

export interface GameCardProps {
  canvasName: "robotCity" | "universe113";
}
