"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers = require("../controllers/controllers");
router.get("/", (req, res) => {
    res.send("Express + TypeScript Server11");
});
// router.post("/create", controllers.setCharacters);
// module.exports = router;
router.post("/compare", controllers.compare);
router.post("/set-user", controllers.setUser);
router.post("/leaderboard", controllers.getLeaders);
module.exports = router;
