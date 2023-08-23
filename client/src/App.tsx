import { createContext, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import cl from "./App.module.scss";
import Header from "./components/Header/Header";
import { CharactersContextInterface, Character } from "./interfaces/interfaces";

import GameOver from "./components/GameOver/GameOver";

export const CharactersContext = createContext<CharactersContextInterface>({
  characters: [],
  setCharacters: null,
  isGameOver: false,
  setIsGameOver: null,
  stopwatchRef: null,
  resetRef: null,
  startRef: null,
});

function App() {
  const [characters, setCharacters] = useState<Character[] | []>([
    { id: "", img: "", name: "", isFound: false },
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const stopwatchRef = useRef([0, 0]);
  const resetRef = useRef<
    | ((
        offsetTimestamp?: Date | undefined,
        autoStart?: boolean | undefined
      ) => void)
    | null
  >(null);
  const startRef = useRef(() => {});

  console.log(stopwatchRef.current);

  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
        isGameOver,
        setIsGameOver,
        stopwatchRef,
        resetRef,
        startRef,
      }}
    >
      <div className={cl.app}>
        <Header />
        <div className={cl.body}>
          <Outlet />
        </div>
        {isGameOver && <GameOver />}
      </div>
    </CharactersContext.Provider>
  );
}

export default App;
