import joi from 'joi';

export async function rentalsMiddlewares(req, res, next) {

    const rentalSchema = joi.object({
        customerId: joi.number().required(),
        gameId: joi.number().required(),
        rentDate: joi.date().required(),
        daysRented: joi.number().required(),
        originalPrice: joi.number().required(),
    });

    try {
        await rentalSchema.validateAsync(req.body);
        next();
    }

    catch (error) {
        return res.sendStatus(400).json(error);
    }
}