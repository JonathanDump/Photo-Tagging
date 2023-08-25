"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
const Character = require("../models/character");
const User = require("../models/user");
// exports.setCharacters = asyncHandler(async (req: Request, res: Response) => {
//   req.body.characters.forEach(async (character: Character) => {
//     console.log(character.coords);
//     const char = new Character(character);
//     console.log(char);
//     await char.save();
//   });
//   res.json({ msg: "chars created" });
// });
exports.compare = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const character = yield Character.findOne({ name: req.body.name });
    const [x, y] = req.body.coords;
    const [startX, startY] = character.coords[0];
    const [endX, endY] = character.coords[1];
    if (!character) {
        throw new Error("There is no such character");
    }
    if (x > endX || x < startX || y > endY || y < startY) {
        res.json({ correct: false });
    }
    else {
        res.json({ correct: true });
    }
}));
exports.setUser = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User({
        name: req.body.name.trim() === "" ? "" : req.body.name,
        time: req.body.time,
        canvas: req.body.canvas,
    });
    yield user.save();
    res.status(200).json(user);
    next();
}));
exports.getLeaders = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaders = yield User.find({ canvas: req.body.canvas });
    res.status(200).json({ leaders });
}));
