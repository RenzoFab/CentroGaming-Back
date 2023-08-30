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

export async function getGames(
  searchTerm: string | undefined,
  limit: number | undefined
): Promise<Game[]> {
  const gamesSnapshot = await gameRef.get();
  let games = gamesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Game[];
  if (searchTerm) {
    games = games.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if(limit){
    games = games.slice(0, limit)
  }
  return games;
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
  return true;
}
