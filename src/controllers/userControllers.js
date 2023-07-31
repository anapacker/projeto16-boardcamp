import dayjs from 'dayjs'
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
        const customer = await db.query(`
        SELECT * FROM customers WHERE id = $1;`, [id])
        if (customer.rows.length === 0) {
            return res.status(404).send('Cliente não encontrado')

        }
        res.send(customer.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {
        const cpfExists = await db.query('SELECT * FROM customers WHERE cpf = $1;', [cpf])
        if (cpfExists.rows.length > 0) {
            return res.status(409).send('CPF já cadastrado.')
        }
        const birthday = dayjs().format('YYYY-MM-DD')
        const values = [name, phone, cpf, birthday]
        const insereCustomer = await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4);
            `, values)
        res.status(201).send(insereCustomer.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function putCustomers(req, res) {
    const customerId = req.params.id
    const { name, phone, cpf, birthday } = req.body

    try {
        await db.query(`
        UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
            [name, phone, cpf, birthday, customerId])

        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}