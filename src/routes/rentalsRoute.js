import { Router } from "express"
import { rentalsSchemaValidation } from "../middlewares/rentalsSchemaValidation.js"
import { createRentals, deleteRentals, getRentals } from "../controllers/rentalsControllers.js"


const rentalsRouter = Router()
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", rentalsSchemaValidation, createRentals)
rentalsRouter.delete("/rentals/:id", deleteRentals)


export default rentalsRouter