import { db } from '../database.js'

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`)
        res.send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createGames(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;

    try {
        const nameGameExists = await db.query(`SELECT * FROM games WHERE name = $1;`, [name])
        if (nameGameExists.rows.length > 0) {
            res.status(409).send('Nome de jogo já existente.')
            return
        }
        const values = [name, image, stockTotal, pricePerDay]
        const insereGame = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);   
        `, values)
        res.status(201).send(insereGame.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}


