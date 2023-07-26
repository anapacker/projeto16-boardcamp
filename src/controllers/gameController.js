import { db } from '../database.js'

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`)
        res.send(games)
    } catch {
        res.sendStatus(500)
    }
}