import React, { useContext, useState } from "react";
import cl from "./GameOver.module.scss";
import { CharactersContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

export default function GameOver() {
  const { stopwatchRef, setIsGameOver, resetRef } =
    useContext(CharactersContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const canvas = useLocation().pathname.split("/")[2];

  console.log(canvas);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const URL = import.meta.env.VITE_API_ENDPOINT;

    const body = { name: inputValue, time: stopwatchRef!.current, canvas };

    const response = await fetch(`${URL}/set-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(result);
    setIsGameOver!(false);
    const autoStart = false;
    resetRef!.current!(undefined, autoStart);

    navigate("/");
  };
  return (
    <div className={cl.gameOver}>
      <div className={cl.message}>
        You found everyone in {stopwatchRef!.current[0]}m:
        {stopwatchRef!.current[1]}
      </div>
      <form className={cl.form} onSubmit={(e) => handleSubmitForm(e)}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={inputValue}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
