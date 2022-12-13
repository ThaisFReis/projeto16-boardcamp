import joi from 'joi';
import pool from '../db';

export async function customersMiddlewares (req, res, next){
    const customer = req.body;

    // Validate the customer
    const schema = joi.object({
        name: joi.string().required(),
        phone: joi.number().min(10).required(),
        cpf: joi.number().min(10).required(),
        birthday: joi.date().required()
    })

    // Errors
    const { error } = schema.validate(customer);

    if (error){
        alert('Erro ao cadastrar cliente');
        return res.sendStatus(400);
    }

    // Check if the customer already exists
    try {
        const queryCustomers = await pool.query(`SELECT * FROM customers`);
        const customers = queryCustomers.rows.find(queryCustomer => queryCustomer.name === customer.name);

        if (customers === undefined | customers === null){
            next();
        }

        else{
            alert('Cliente já cadastrado');
            return res.sendStatus(409);
        }
    }

    catch (error) {
        return res.sendStatus(500).json(error);
    }
}