import { db } from "../firebase-config";
import { Game } from "../models/game.interface";

const gameRef = db.collection("games");

function generateGameId(name: string): string {
  const cleanedName = name
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  return cleanedName;
}

export async function getGames(): Promise<Game[]> {
  const gamesSnapshot = await gameRef.get();
  const games = gamesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return games as Game[];
}

export async function getGame(id: string): Promise<Game | undefined> {
  const gameSnapshot = await gameRef.doc(id).get();
  if (!gameSnapshot.data()) return undefined;
  const game = { id: gameSnapshot.id, ...gameSnapshot.data() };
  return game as Game;
}

export async function postGame(newGame: Game) {
  const id = generateGameId(newGame.name);
  const exist = (await gameRef.doc(id).get()).exists;
  if (exist) return false;
  await gameRef.doc(id).set(newGame);
  return true
}
