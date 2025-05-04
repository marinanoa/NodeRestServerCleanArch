import { Router } from 'express';
import { AuthRoutes } from './presentation/auth/routes';

export class AppRoutes {
  // Do it static to avoid multiple instances,
  // unless we wanted to inject dependencies w¡th a constructor
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);

    return router;
  }
}
