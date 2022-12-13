import joi from 'joi';
import pool from '../db';

export async function categoriesMiddlewares (req, res, next){
    const category = req.body;
    const schema = joi.object({
        name: joi.string().required()
    });

    const { error } = schema.validate(category);

    if (error){
        return res.sendStatus(400);
    }

    try {
        const queryCategories = await pool.query(`SELECT * FROM categories`);
        const categories = queryCategories.rows.find(queryCategory => queryCategory.name === category.name);

        if (categories === undefined | categories === null) {
            next();
        } else {
            return res.sendStatus(409);
        }

    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}