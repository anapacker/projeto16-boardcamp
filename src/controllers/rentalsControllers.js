import { db } from '../database.js'

export async function getRentals(req, res) {
    try {
        res.send(rentals)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createRentals(req, res) {
    try {
        res.send(rentals)
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