import pool from '../db';
import { customersMiddlewares } from '../middlewares/customersMiddlewares';

// Register a new customer
export async function registerCustomer(req, res){
    const customer = req.body;

    // Use the customersMiddlewares to register a new customer
    customersMiddlewares(req, res, async () => {
        try {
            const query = await pool.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [customer.name, customer.phone, customer.cpf, customer.birthday]);
            alert('Cliente cadastrado com sucesso');
            return res.sendStatus(201);
        }

        catch (error) {
            return res.sendStatus(500).json(error);
        }
    })
}

// Get all customers
export async function getCustomers(req, res){
    const cpf = req.query.cpf;

    let offset = '';
    let limit = '';

    // Check if the query has offset and limit
    if (req.query.offset !== undefined && req.query.limit !== undefined){
        offset = req.query.offset;
        limit = req.query.limit;
    }

    // Check if the query has cpf   
    if (cpf !== undefined){
        try {
            const query = await pool.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
            const customers = query.rows;

            if (customers.length === 0){
                alert('Cliente não encontrado');
                return res.sendStatus(404);
            }

            else{
                return res.status(200).json(customers);
            }
        }

        catch (error) {
            return res.sendStatus(500).json(error);
        }
    }
}

// Get a customer by id
export async function getCustomerById(req, res){
    const id = req.params.id;

    try {
        const query = await pool.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        const customers = query.rows;

        if (customers.length === 0){
            alert('Cliente não encontrado');
            return res.sendStatus(404);
        }

        else{
            return res.status(200).json(customers);
        }
    }

    catch (error) {
        return res.sendStatus(500).json(error);
    }
}

// Update a customer
export async function updateCustomer(req, res){
    const id = req.params.id;
    const customer = req.body;

    try{
        await pool.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [customer.name, customer.phone, customer.cpf, customer.birthday, id]);

        alert('Cliente atualizado com sucesso');
        return res.sendStatus(200);
    }

    catch (error) {
        return res.sendStatus(500).json(error);
    }
}