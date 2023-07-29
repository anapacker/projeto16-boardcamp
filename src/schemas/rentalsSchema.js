import Joi from "joi"

export const rentalsSchema = Joi.object({
    customerId: Joi.string().required(),
    gameId: Joi.string().required(),
    rentDate: Joi.number().positive().required(),
    daysRented: Joi.number().positive().required(),
    returnDate: Joi.number().required(),
    originalPrice: Joi.number().required(),
    delayFee: Joi.number().required()
})