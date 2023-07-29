import { db } from '../database.js'

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        res.send(customers.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomersById(req, res) {
    const { id } = req.params
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1; [id]`)
        if (customer.rows.length === 0) {
            res.status(404).send('Cliente não encontrado')
            return
        }
        res.send(customer.rows[0])
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