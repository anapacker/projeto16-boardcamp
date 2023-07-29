import { Router } from "express";
import gameRouter from "./gameRoute.js";
import rentalsRouter from "./rentalsRoute.js";
import customerRouter from "./customersRoute.js";

const router = Router()
router.use(gameRouter)
router.use(rentalsRouter)
router.use(customerRouter)

export default router