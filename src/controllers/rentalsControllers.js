import dayjs from 'dayjs'
import { db } from '../database.js'

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`
            SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName"
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id;
        `)

        let rentalsRentDate = rentals.rows.map((rental) => {
            const newRental = {
                id: rental.id,
                customerId: rental.customerId,
                gameId: rental.gameId,
                rentDate: rental.rentDate.toJSON().slice(0, 10),
                daysRented: rental.daysRented,
                returnDate: rental.returnDate === null ? null : rental.returnDate.toJSON().slice(0, 10),
                originalPrice: rental.originalPrice,
                delayFee: rental.delayFee,
                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName
                }
            }

            return newRental
        })
        res.send(rentalsRentDate)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId])
        if (customer.rows.length === 0) {
            return res.sendStatus(400)
        }
        const game = await db.query(`SELECT * FROM games WHERE id =$1;`, [gameId])
        if (game.rows.length === 0) {
            return res.sendStatus(400)
        }

        const gamesIndisponiveis = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;`, [gameId])
        const stockTotal = game.rows[0].stockTotal
        if (gamesIndisponiveis.rows.length >= stockTotal) {
            return res.sendStatus(400)
        }

        const rentDate = dayjs().format('YYYY-MM-DD')
        const pricePerDay = game.rows[0].pricePerDay
        const originalPrice = pricePerDay * daysRented

        await db.query(`
            INSERT INTO rentals ("customerId", "gameId","rentDate","daysRented","returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, NULL, $5, NULL);
        `, [customerId, gameId, rentDate, daysRented, originalPrice])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRentals(req, res) {
    const { id } = req.params

    try {
        const idExist = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        if (idExist.rows.length === 0)
            return res.sendStatus(404)
        if (idExist.rows[0].returnDate === null) {
            return res.sendStatus(400)
        }

        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])
        res.send(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}