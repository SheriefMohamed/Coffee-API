import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';

export const OrderRoute = Router()

const orderController = new OrderController();

OrderRoute
    .route('/')
    .post(isAuthenticated, authorizeRoles('waiter'), orderController.insertOrder)