import Joi from "joi"

export const rentalsSchema = Joi.object({
    customerId: Joi.number().required().integer().positive(),
    gameId: Joi.number().integer().positive().required(),
    rentDate: Joi.number().positive().required(),
    daysRented: Joi.number().integer().positive().required(),
    returnDate: Joi.number().required(),
    originalPrice: Joi.number().required(),
    delayFee: Joi.number().required()
})