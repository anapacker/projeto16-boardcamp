import { Router } from "express";
import gameRouter from "./gameRoute.js";

const router = Router()
router.use(gameRouter)

export default router