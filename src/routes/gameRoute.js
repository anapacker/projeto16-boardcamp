import { Router } from "express";
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.js";
import { createGames, getGames } from "../controllers/gameController.js";

const gameRouter = Router()
gameRouter.get("/games", getGames)
gameRouter.post("/games", gameSchemaValidation, createGames)

export default gameRouter