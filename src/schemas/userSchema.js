import Joi from "joi"

export const userSchema = Joi.object({
    name: Joi.string().min(1).required(),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
    cpf: Joi.string().pattern(/^[0-9]{11}$/).required(),
    birthday: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).isoDate().required()
})