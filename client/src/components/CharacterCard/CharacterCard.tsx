import cl from "./CharacterCars.module.scss";

import React from "react";
import { Character } from "../../interfaces/interfaces";

export default function CharacterCard({ img, name }: Character) {
  return (
    <div className={cl.characterCard}>
      <img src={img} alt="" />
      <div>{name}</div>
    </div>
  );
}
