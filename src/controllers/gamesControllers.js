import pool from "../db";

// Get games
export async function getGames(req, res) {
    const name = req.query.name;
    let offset = "";
    let limit = "";

    if (req.query.offset) {
        offset = `OFFSET ${req.query.offset}`;
    }

    if (req.query.limit) {
        limit = `LIMIT ${req.query.limit}`;
    }

    if (name) {
        const games = await pool.query(`SELECT * FROM games WHERE name ILIKE $1 ${offset} ${limit}`,[`%${name}%`]);
        return res.send(games.rows);
    }
}

//Post games
export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        const game = await pool.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, image, stockTotal, categoryId, pricePerDay]);
        alert("Jogo adicionado com sucesso!");
        return res.send(game.rows[0]);
    }

    catch (error) {
        alert("Erro ao adicionar jogo!");
        return res.sendStatus(500).json(error);
    }
}