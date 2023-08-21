export interface Character {
  img: string;
  name: string;
}

export interface CharactersContextInterface {
  characters: Character[] | null;
  setCharacters: React.Dispatch<React.SetStateAction<Character[] | null>>;
}

export interface CharacterCardProps {
  children: HTMLDivElement;
  name: string;
}
