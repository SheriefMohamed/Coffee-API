import { Router } from 'express';
import { AuthController } from './../controllers/authController';
import { isAuthenticated, authorizeRoles} from '../middlewares/auth';

export const AuthRoute = Router()

const authController = new AuthController();

AuthRoute
    .route('/login')
    .post(authController.Login)

AuthRoute
    .route('/logout')
    .post(authController.Logout)

AuthRoute
    .route('/check')
    .get(isAuthenticated,authorizeRoles('waiter'),authController.checkAccess)