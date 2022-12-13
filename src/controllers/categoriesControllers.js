import pool from '../db.js';

export async function createCategory (req, res) {
    const category = req.body;

    if (!category.name || category.name === "") {
        return res.sendStatus(400);
    }

    try {
        const queryCategories = await pool.query(`SELECT * FROM categories`);
        const categories = queryCategories.rows.find(queryCategory => queryCategory.name === category.name);

        if (categories === undefined | categories === null) {
            await pool.query(`INSERT INTO categories (name) VALUES ($1)`, [category.name]);
            return res.sendStatus(201);
        } else {
            return res.sendStatus(409);
        }

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getCategories (req, res) {
    const { offset, limit } = req.query;
    let OFFSET = '';
    let LIMIT = '';

    if (offset === undefined || offset === null || offset === '') {
        OFFSET = 0;
    }

    if (limit === undefined || limit === null || limit === '') {
        LIMIT = 10;
    }

    try {
        const queryCategories = await pool.query(`SELECT * FROM categories ${OFFSET} ${LIMIT}`);
        const categories = queryCategories.rows;

        if (categories.length === 0) {
            return res.sendStatus(404);
        }

        return res.send(categories);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}