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
exports.postGame = exports.getGame = exports.getGames = void 0;
const firebase_config_1 = require("../firebase-config");
const gameRef = firebase_config_1.db.collection("games");
function generateGameId(name) {
    const cleanedName = name
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
    return cleanedName;
}
function getGames(searchTerm, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const gamesSnapshot = yield gameRef.get();
        let games = gamesSnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        if (searchTerm) {
            games = games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (limit) {
            games = games.slice(0, limit);
        }
        return games;
    });
}
exports.getGames = getGames;
function getGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const gameSnapshot = yield gameRef.doc(id).get();
        if (!gameSnapshot.data())
            return undefined;
        const game = Object.assign({ id: gameSnapshot.id }, gameSnapshot.data());
        return game;
    });
}
exports.getGame = getGame;
function postGame(newGame) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = generateGameId(newGame.name);
        const exist = (yield gameRef.doc(id).get()).exists;
        if (exist)
            return false;
        yield gameRef.doc(id).set(newGame);
        return true;
    });
}
exports.postGame = postGame;
