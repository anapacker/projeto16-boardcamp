import { userSchema } from "../schemas/userSchema.js"

export function userSchemaValidation(req, res, next) {

    const validationUser = userSchema.validate(req.body, { abortEarly: false })

    if (validationUser.error) {
        const errors = validationUser.error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    next()
}
