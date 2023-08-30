import express from "express";
import * as gameController from "../controllers/game.controller";
// import { body } from "express-validator";
import { validate } from "../middlewares/validate";
import { validateGame } from "../middlewares/game.middleware";
import { query } from "express-validator";

export const router = express.Router();

router.get(
  "/",
  query("q", "Query must be a string").optional().isString(),
  query("limit", "Limit must be a number").optional().isNumeric(),
  validate,
  gameController.getGames
);

router.get("/:id", gameController.getGame);

router.post(
  "/",

  [...validateGame(false), validate],
  gameController.postGame
);
