"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const gameService = __importStar(require("../services/game.service"));
function getGames(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { q, limit } = req.query;
            const games = yield gameService.getGames(q, parseInt(limit));
            if (!games.length) {
                return res.status(404).json({ ok: false, message: "Games not found" });
            }
            return res.status(200).json({ ok: true, data: games });
        }
        catch (e) {
            return res.status(400).json({ ok: false, message: e });
        }
    });
}
exports.getGames = getGames;
function getGame(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const game = yield gameService.getGame(id);
            if (!game) {
                return res.status(404).json({ ok: false, message: "Game not found" });
            }
            return res.status(200).json({ ok: true, data: game });
        }
        catch (e) {
            return res.status(400).json({ ok: false, message: e });
        }
    });
}
exports.getGame = getGame;
function postGame(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isPosted = yield gameService.postGame(req.body);
            if (!isPosted) {
                return res.status(404).json({ ok: false, message: "Game already exist" });
            }
            return res.status(200).json({ ok: true, message: "Game created" });
        }
        catch (e) {
            return res.status(400).json({ ok: false, message: e });
        }
    });
}
exports.postGame = postGame;
