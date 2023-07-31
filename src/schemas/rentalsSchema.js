import Joi from "joi"

export const rentalsSchema = Joi.object({
    customerId: Joi.number().required().integer().positive(),
    gameId: Joi.number().integer().positive().required(),
    daysRented: Joi.number().integer().positive().min(1).required(),

})