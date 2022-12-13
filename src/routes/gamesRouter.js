import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesControllers.js";
import { gamesMiddlewares } from "../middlewares/gamesMiddlewares.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gamesMiddlewares, postGames);

export default gamesRouter;