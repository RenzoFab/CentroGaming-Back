import express from "express";
import cors from "cors";
// Import the functions you need from the SDKs you need

import { router as games } from "./routes/game.route";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/games", games);
