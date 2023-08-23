import express, { Request, Response } from "express";
const router = express.Router();
const controllers = require("../controllers/controllers");

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server11");
});

// router.post("/create", controllers.setCharacters);
// module.exports = router;

router.post("/compare", controllers.compare);

router.post("/set-user", controllers.setUser);

module.exports = router;
