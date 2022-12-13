import { Router } from 'express';
import { registerCustomer, getCustomers, getCustomerById, updateCustomer } from '../controllers/customersControllers';

const customersRouter = Router();

customersRouter.post('/customers', registerCustomer);
customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerById);
customersRouter.put('/customers/:id', updateCustomer);

export default customersRouter;