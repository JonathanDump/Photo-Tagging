const asyncHandler = require("express-async-handler");
const Character = require("../models/character");
const User = require("../models/user");
import express, { Request, Response, NextFunction } from "express";
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

  if (!character) {
    throw new Error("There is no such character");
  }
  if (x > endX || x < startX || y > endY || y < startY) {
    res.json({ correct: false });
  } else {
    res.json({ correct: true });
  }
});

exports.setUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
      name: req.body.name.trim() === "" ? "" : req.body.name,
      time: req.body.time,
      canvas: req.body.canvas,
    });
    await user.save();

    res.status(200).json(user);
    next();
  }
);

exports.getLeaders = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);

  const leaders = await User.find({ canvas: req.body.canvas });
  res.status(200).json({ leaders });
});
