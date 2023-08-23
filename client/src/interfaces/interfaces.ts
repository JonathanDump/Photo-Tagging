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
}

export interface CharacterCardProps extends Omit<Character, "id" | "isFound"> {
  handleClick?: (name: string) => Promise<void>;
  isFound?: boolean;
}

export interface CanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  handleClick: (e: React.MouseEvent) => void;
  name: string;
}

// export interface HeaderProps {
//   stopwatchRef: React.MutableRefObject<number[]>;
// }

// export interface GameOverProps {
//   stopwatchRef: React.MutableRefObject<number[]>;
// }
