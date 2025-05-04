import { Router } from 'express';
import { AuthController } from './controller';
import { AuthMongoDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const database = new AuthMongoDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(database);
    const controller = new AuthController(authRepository);

    // Define routes

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    return router;
  }
}
