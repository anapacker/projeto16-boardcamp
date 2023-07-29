import { Router } from "express"
import { rentalsSchemaValidation } from "../middlewares/rentalsSchemaValidation.js"
import { rentalsSchema } from "../schemas/rentalsSchema.js"
import { createRentals, deleteRentals, getRentals, getRentalsById } from "../controllers/rentalsControllers.js"


const rentalsRouter = Router()
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", rentalsSchemaValidation(rentalsSchema), createRentals)
rentalsRouter.get("/rentals/:id/return", getRentalsById)
rentalsRouter.delete("/rentals/:id", deleteRentals)


export default rentalsRouter