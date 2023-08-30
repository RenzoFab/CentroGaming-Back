import express from "express";
import * as gameController from "../controllers/game.controller";
// import { body } from "express-validator";
import { validate } from "../middlewares/validate";
import { validateGame } from "../middlewares/game.middleware";

export const router = express.Router();

router.get("/", gameController.getGames);

router.get("/:id", gameController.getGame);

router.post(
  "/",

  [...validateGame(false), validate],
  gameController.postGame
);
