import { Router } from "express";
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.js";
import { gameSchema } from "../schemas/gameSchema.js";
import { getGames } from "../controllers/gameController.js";

const gameRouter = Router()
gameRouter.get("/games", getGames)
// gameRouter.post("/games", gameSchemaValidation, gameSchema)

export default gameRouter