import { Router } from 'express';
import { AuthController } from './controller';
import { AuthMongoDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { BcryptAdapter } from '../../config';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const database = new AuthMongoDataSourceImpl(BcryptAdapter.hash, BcryptAdapter.compare);
    const authRepository = new AuthRepositoryImpl(database);
    const controller = new AuthController(authRepository);

    // Define routes

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    return router;
  }
}
