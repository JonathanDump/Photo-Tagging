const asyncHandler = require("express-async-handler");
const Character = require("../models/character");
import express, { Request, Response } from "express";
import { Character } from "../interfaces/interfaces";

// exports.setCharacters = asyncHandler(async (req: Request, res: Response) => {
//   req.body.characters.forEach(async (character: Character) => {
//     console.log(character.coords);

//     const char = new Character(character);
//     console.log(char);

//     await char.save();
//   });
//   res.json({ msg: "chars created" });
// });

exports.compare = asyncHandler(async (req: Request, res: Response) => {
  const character = await Character.findOne({ name: req.body.name });
  const [x, y] = req.body.coords;
  const [startX, startY] = character.coords[0];
  const [endX, endY] = character.coords[1];

  if (x > endX || x < startX || y > endY || y < startY) {
    res.json({ message: "wrong" });
  } else {
    res.json({ message: "correct" });
  }
});