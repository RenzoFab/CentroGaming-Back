import { Request, Response } from "express";
import * as gameService from "../services/game.service";
import { Game } from "../models/game.interface";

export async function getGames(_: Request, res: Response) {
  try {
    const games: Game[] = await gameService.getGames();
    if (!games.length) {
      return res.status(404).json({ ok: false, message: "Games not found" });
    }
    return res.status(200).json({ ok: true, data: games });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e });
  }
}

export async function getGame(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const game: Game | undefined = await gameService.getGame(id);
    if (!game) {
      return res.status(404).json({ ok: false, message: "Game not found" });
    }
    return res.status(200).json({ ok: true, data: game });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e });
  }
}

export async function postGame(req: Request, res: Response) {
  try {
    const isPosted = await gameService.postGame(req.body);
    if (!isPosted) {
      return res.status(404).json({ ok: false, message: "Game already exist" });
    }
    return res.status(200).json({ ok: true, message: "Game created" });
  } catch (e) {
    return res.status(400).json({ ok: false, message: e });
  }
}
