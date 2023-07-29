import { db } from '../database.js'

export async function getCustomers(req, res) {
    try {
        res.send(customer)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomersById(req, res) {
    try {
        res.send(customer)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCustomers(req, res) {
    try {
        res.send(customer)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function putCustomers(req, res) {
    try {
        res.send(customer)
    } catch (err) {
        res.status(500).send(err.message)
    }
}