import Joi from "joi"

export const gameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required().uri(),
    stockTotal: Joi.number().min(1).required(),
    pricePerDay: Joi.number().min(1).required()

})