import Joi from "joi"

export const userSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    cpf: Joi.number().positive().required(),
    birthday: Joi.number().positive().required()

})