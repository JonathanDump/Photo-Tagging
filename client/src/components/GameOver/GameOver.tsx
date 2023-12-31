import React, { useContext, useState } from "react";
import cl from "./GameOver.module.scss";
import { CharactersContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import btn from "../../scss/button.module.scss";

export default function GameOver() {
  const { stopwatchRef, setIsGameOver, resetRef } =
    useContext(CharactersContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const canvas = useLocation().pathname.split("/")[2];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const URL = import.meta.env.VITE_API_ENDPOINT;

    const body = { name: inputValue, time: stopwatchRef!.current, canvas };

    await fetch(`${URL}/set-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setIsGameOver!(false);

    document.body.style.overflow = "auto";
    resetRef!.current!(undefined, false);

    navigate("/");
  };
  return (
    <div className={cl.gameOverContainer}>
      <div className={cl.gameOver}>
        <div className={cl.message}>
          You found everyone in {stopwatchRef!.current[0]}m:
          {stopwatchRef!.current[1]}s
        </div>
        <form className={cl.form} onSubmit={(e) => handleSubmitForm(e)}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={inputValue}
            onChange={handleChange}
          />
          <div className={btn.wrapper}>
            <button className={btn.button}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
