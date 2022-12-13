import pool from "../db";
import dayjs from "dayjs";

// Get rentals
export async function getRentals(req, res) {
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;
    let offset = req.query.offset;
    let limit = req.query.limit;

    // Check if the query has offset and limit
    if (offset !== undefined && limit !== undefined) {
        offset = req.query.offset;
        limit = req.query.limit;
    }

    // Check if the query has customerId
    if (customerId !== undefined) {
        try {
            const query = await pool.query(`SELECT * FROM rentals WHERE "customerId" = $1`, [customerId]);

            const rentals = query.rows;

            if (rentals.length === 0) {
                alert("Aluguel não encontrado");
                return res.sendStatus(404);
            }

            else {
                return res.status(200).json(rentals);
            }
        }

        catch (error) {
            alert("Erro ao buscar aluguel");
            return res.sendStatus(500).json(error);
        }
    }

    // Check if the query has gameId
    else if (gameId !== undefined) {
        try {
            const query = await pool.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]);

            const rentals = query.rows;
        
            if (rentals.length === 0) {
                alert("Aluguel não encontrado");
                return res.sendStatus(404);
            }

            else {
                return res.status(200).json(rentals);
            }
        }

        catch (error) {
            alert("Erro ao buscar aluguel");
            return res.sendStatus(500).json(error);
        }

    }

    else {
        try {
            const query = await pool.query(`SELECT * FROM rentals LIMIT $1 OFFSET $2`, [limit, offset]);

            const rentals = query.rows;

            if (rentals.length === 0) {
                alert("Aluguel não encontrado");
                return res.sendStatus(404);
            }

            else {
                return res.status(200).json(rentals);
            }

        }

        catch (error) {
            alert("Erro ao buscar aluguel");
            return res.sendStatus(500).json(error);
        }

    }

}

// Register a new rental
export async function registerRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD");
    const returnDate = null;
    const delayFee = null;

    try {
        const query = await pool.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6)`, [customerId, gameId, rentDate, daysRented, returnDate, delayFee]);

        alert("Aluguel registrado com sucesso");

        return res.sendStatus(201);
    }

    catch (error) {
        alert("Erro ao registrar aluguel");
        return res.sendStatus(500).json(error);
    }
}

// Finish a rental
export async function finishRental(req, res) {
    const id = req.params.id;
    const returnDate = dayjs().format("YYYY-MM-DD");
    const rentDate = req.body.rentDate;
    const originalPrice = req.body.originalPrice;
    const daysRented = req.body.daysRented;    

    // Calculate the price per day
    const pricePerDay = originalPrice / daysRented;

    // Calculate the delay fee
    const delayFee = pricePerDay * (dayjs(returnDate).diff(rentDate, "day") - daysRented);

    try {
        const query = await pool.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, [returnDate, delayFee, id]);

        alert("Aluguel finalizado com sucesso");

        return res.sendStatus(200);
    }

    catch (error) {
        alert("Erro ao finalizar aluguel");
        return res.sendStatus(500).json(error);
    }

}

// Delete a rental
export async function deleteRental(req, res) {
    const id = req.params.id;

    try {
        const query = await pool.query(`DELETE FROM rentals WHERE id = $1`, [id]);

        alert("Aluguel deletado com sucesso");

        return res.sendStatus(200);
    }

    catch (error) {
        alert("Erro ao deletar aluguel");
        return res.sendStatus(500).json(error);
    }
}