import { Router } from "express";
import { getCategories, createCategory }from "../controllers/categoriesControllers";
import categoriesMiddlewares from "../middlewares/categoriesMiddlewares";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", createCategory, categoriesMiddlewares);

export default categoriesRouter;