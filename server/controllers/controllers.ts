const asyncHandler = require("express-async-handler");
const Character = require("../models/character");
import express, { Request, Response } from "express";
import { Character } from "../interfaces/interfaces";
import { log } from "console";

exports.setCharacters = asyncHandler(async (req: Request, res: Response) => {
  req.body.characters.forEach(async (character: Character) => {
    console.log(character.coords);

    const char = new Character(character);
    console.log(char);

    await char.save();
  });
  res.json({ msg: "chars created" });
});
