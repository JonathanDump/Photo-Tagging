import cl from "./CharacterCars.module.scss";

import React from "react";
import { CharacterCardProps } from "../../interfaces/interfaces";

export default function CharacterCard({
  img,
  name,
  handleClick,
  isFound,
}: CharacterCardProps) {
  const clName = !isFound
    ? cl.characterCard
    : `${cl.characterCard} ${cl.isFound}`;
  return (
    <div className={clName} onClick={(e) => handleClick!(e, name)} id={name}>
      <div className={cl.imgContainer}>
        <img src={img} alt="" />
      </div>
      <div>{name}</div>
    </div>
  );
}
