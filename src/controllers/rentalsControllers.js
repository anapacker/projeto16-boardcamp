import dayjs from 'dayjs'
import { db } from '../database.js'

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT rentals.*, customers.id AS "customerId", customers.name AS "customerName", games.id AS "gameId", games.name AS "gameName"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;
        `)
        res.send(rentals.rows)
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
        if (daysRented <= 0) {
            return res.sendStatus(400)
        }

        const rentedGames = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`, [gameId])

        const pricePerDay = game.rows[0].pricePerDay
        const rentDate = dayjs().format('YYYY-MM-DD')
        const originalPrice = pricePerDay * daysRented

        await db.query(`
            INSERT INTO games ("customerId", "gameId","rentDate","daysRented","returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, NULL, $5, NULL);
        `, [customerId, gameId, rentDate, daysRented, originalPrice])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRentalsById(req, res) {
    const { id } = req.query

    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        if (rental.rows.length === 0) {
            return res.sendStatus(404)
        }
        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRentals(req, res) {
    try {
        res.send(rentals)

    } catch (err) {
        res.status(500).send(err.message)
    }
}