import { Router } from 'express';
import categoriesRouter from './categoriesRouter';
import gamesRouter from './gamesRouter';
import customersRouter from './customersRouter';
import rentalsRouter from './rentalsRouter';

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;