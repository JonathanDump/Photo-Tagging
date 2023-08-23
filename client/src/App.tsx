import { createContext, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import cl from "./App.module.scss";
import Header from "./components/Header/Header";
import { CharactersContextInterface, Character } from "./interfaces/interfaces";
import { charactersList } from "./misc/charactersList";
import GameOver from "./components/GameOver/GameOver";

export const CharactersContext = createContext<CharactersContextInterface>({
  characters: [],
  setCharacters: null,
  isGameOver: false,
  setIsGameOver: null,
  stopwatchRef: null,
});

function App() {
  const [characters, setCharacters] = useState<Character[] | []>([
    { id: "", img: "", name: "", isFound: false },
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const stopwatchRef = useRef([0, 0]);
  console.log(stopwatchRef.current);

  // const handleSubmitForm = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const URL = import.meta.env.VITE_API_ENDPOINT;
  //   const target = e.target as HTMLFormElement;
  //   console.log(target.name);

  //   const body = { name: target.name, time: stopwatchRef.current };

  //   const response = await fetch(`${URL}/set-user`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   const result = response.json();
  //   console.log(result);
  //   setIsGameOver(false);
  //   navigate("/");
  // };
  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
        isGameOver,
        setIsGameOver,
        stopwatchRef,
      }}
    >
      <div className={cl.app}>
        <Header />
        <div className={cl.body}>
          <Outlet />
        </div>
        {/* {isGameOver && (
          <div className={cl.gameOver}>
            <div className={cl.message}>
              You found everyone in {stopwatchRef.current[0]}m:
              {stopwatchRef.current[1]}
            </div>
            <form className={cl.form} onSubmit={(e) => handleSubmitForm(e)}>
              <input type="text" name="name" placeholder="Name" />
              <button>Submit</button>
            </form>
          </div>
        )} */}

        {isGameOver && <GameOver />}
      </div>
    </CharactersContext.Provider>
  );
}

export default App;
