import { Router } from 'express';
import { AuthMongoDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { BcryptAdapter } from '../../config';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthController } from './controller';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const database = new AuthMongoDataSourceImpl(BcryptAdapter.hash, BcryptAdapter.compare);
    const authRepository = new AuthRepositoryImpl(database);
    const controller = new AuthController(authRepository);

    // Define routes

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);
    router.get('/', AuthMiddleware.validateJWT, controller.getUsers);

    return router;
  }
}
