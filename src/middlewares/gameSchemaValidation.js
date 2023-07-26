import { gameSchema } from "../schemas/gameSchema.js"

export function gameSchemaValidation(req, res, next) {
    const validationGame = gameSchema.validate(req.body, { abortEarly: false })
    if (validationGame.error) {
        const errors = validationGame.error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
    next()
}