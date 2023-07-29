export function rentalsSchemaValidation(rentalsSchema) {

    return (req, res, next) => {
        const validationRentals = rentalsSchema.validate(req.body, { abortEarly: false })

        if (validationRentals.error) {
            const errors = validationRentals.error.details.map((detail) => detail.message)
            return res.status(422).send(errors)
        }
    }
    next()
}