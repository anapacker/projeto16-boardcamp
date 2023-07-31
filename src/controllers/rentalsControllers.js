import dayjs from 'dayjs'
import { db } from '../database.js'

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT rentals.*, customer.id AS "customerId", customer.name AS "customerName", game.id AS "gameId", game.name AS "gameName";
        FROM rentals
        JOIN customers ON rentals.customerId = customers.id
        JOIN games ON rentals.gameId = games.id;
        `)
        res.send(rentals.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body

    try {
        const priceGame = await db.query(`SELECT games."pricePerDay" FROM games WHERE id = $1;`, [gameId])
        const rentDate = dayjs().format('YYYY-MM-DD')
        const originalPrice = priceGame * daysRented

        await db.query(`
            INSERT INTO games ("customerId", "gameId","rentDate","daysRented","returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $4,null, $5, null);
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