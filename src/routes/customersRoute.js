import { Router } from "express";
import { userSchemaValidation } from "../middlewares/userSchemaValidation.js";
import { createCustomers, getCustomers, getCustomersById, putCustomers } from "../controllers/userControllers.js";


const customerRouter = Router()
customerRouter.get("/customers", getCustomers)
customerRouter.get("/customers/:id", getCustomersById)
customerRouter.post("/customers", userSchemaValidation, createCustomers)
customerRouter.put("/customers/:id", putCustomers)

export default customerRouter