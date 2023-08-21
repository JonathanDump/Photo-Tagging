import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import cl from "./App.module.scss";
import Header from "./components/Header/Header";
import { CharactersContextInterface, Character } from "./interfaces/interfaces";

export const CharactersContext =
  createContext<CharactersContextInterface | null>(null);

function App() {
  const [characters, setCharacters] = useState<Character[] | null>(null);

  return (
    <CharactersContext.Provider value={{ characters, setCharacters }}>
      <div className={cl.app}>
        <Header />
        <div className={cl.body}>
          <Outlet />
        </div>
      </div>
    </CharactersContext.Provider>
  );
}

export default App;
