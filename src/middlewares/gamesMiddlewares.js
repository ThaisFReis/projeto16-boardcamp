import joi from 'joi';

export async function gamesMiddlewares(req, res, next) {

    const gameSchema = joi.object({
        name:  joi.string().required(),
        image: joi.string().required(),
        stockTotal: joi.number().required(),
        categoryId: joi.number().required(),
        pricePerDay: joi.number().required()
    });

    const { error } = gameSchema.validate(req.body);

    if (error) {
        return res.sendStatus(400).json(error);
    }

    next();
}