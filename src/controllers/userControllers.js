import { db } from '../database.js'

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        let birthdayCustomers = customers.rows.map((customer) => {
            return { ...customer, birthday: customer.birthday.toJSON().slice(0, 10) }
        })

        res.send(birthdayCustomers)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomersById(req, res) {
    const { id } = req.params
    try {
        const specificCustomer = await db.query(`
        SELECT * FROM customers WHERE id = $1;`, [id])
        if (specificCustomer.rows.length === 0) {
            return res.status(404).send('Cliente não encontrado')

        }
        let birthdayCustomer = specificCustomer.rows.map((customer) => {
            return { ...customer, birthday: customer.birthday.toJSON().slice(0, 10) }
        })
        res.send(birthdayCustomer[0])
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
        const cpfExists = await db.query('SELECT * FROM customers WHERE cpf = $1;', [cpf])
        if (cpfExists.rows.length > 0) {
            return res.status(409).send('CPF já cadastrado.')
        }
        await db.query(`
        UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
            [name, phone, cpf, birthday, customerId])

        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}