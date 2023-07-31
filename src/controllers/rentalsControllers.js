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
        const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId])
        if (game.rows.length === 0) {
            return res.status(400).send('Jogo não encontrado.')
        }

        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId])
        if (customer.rows.length === 0) {
            return res.status(400).send('Cliente não encontrado.')
        }
        const rentDate = dayjs().format('YYYY-MM-DD')
        const originalPrice = gameId[0].pricePerDay * daysRented

        await db.query(`
            INSERT INTO games ("customerId", "gameId","rentDate","daysRented","originalPrice") 
            VALUES ($1, $2, $4, $4, $5);
        `, [customerId, gameId, rentDate, daysRented, originalPrice])

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRentalsById(req, res) {
    try {
        res.send(rentals)

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