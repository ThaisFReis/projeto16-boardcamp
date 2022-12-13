import { Router } from "express";
import { getRentals, registerRental, finishRental, deleteRental } from "../controllers/rentalsControllers.js";
import { rentalsMiddlewares } from "../middlewares/rentalsMiddlewares.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", rentalsMiddlewares, registerRental);
rentalsRouter.post("/rentals/:id/return", rentalsMiddlewares, finishRental);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;